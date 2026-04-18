import { Octokit } from "@octokit/rest";

type CommitFile = {
  path: string;
  content: string;
  encoding?: "utf-8" | "base64";
};

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !repo) {
    throw new Error(
      "GITHUB_TOKEN et GITHUB_REPO doivent être configurés dans les variables d'environnement"
    );
  }

  const [owner, repoName] = repo.split("/");
  if (!owner || !repoName) {
    throw new Error(
      "GITHUB_REPO doit être au format 'owner/repo' (ex: Fayssel95490/trinum-website)"
    );
  }

  return { token, owner, repo: repoName, branch };
}

function getOctokit() {
  const { token } = getConfig();
  return new Octokit({ auth: token });
}

/**
 * Lit un fichier via l'API Git Data (refs → tree → blob) au lieu de l'API Contents.
 * L'API Contents est cachée par GitHub pendant quelques minutes après un commit,
 * ce qui ferait que l'admin n'affiche pas la dernière version après un enregistrement.
 * L'API Git Data n'a pas ce cache : on récupère toujours le HEAD à jour.
 */
export async function readFile(path: string): Promise<string | null> {
  const { owner, repo, branch } = getConfig();
  const octokit = getOctokit();

  try {
    const { data: refData } = await octokit.rest.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`,
    });
    const commitSha = refData.object.sha;

    const { data: commit } = await octokit.rest.git.getCommit({
      owner,
      repo,
      commit_sha: commitSha,
    });
    const rootTreeSha = commit.tree.sha;

    const segments = path.split("/").filter(Boolean);
    let currentTreeSha = rootTreeSha;
    let fileSha: string | null = null;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const isLast = i === segments.length - 1;

      const { data: tree } = await octokit.rest.git.getTree({
        owner,
        repo,
        tree_sha: currentTreeSha,
      });
      const entry = tree.tree.find((t) => t.path === segment);
      if (!entry || !entry.sha) return null;

      if (isLast) {
        if (entry.type !== "blob") return null;
        fileSha = entry.sha;
      } else {
        if (entry.type !== "tree") return null;
        currentTreeSha = entry.sha;
      }
    }

    if (!fileSha) return null;

    const { data: blob } = await octokit.rest.git.getBlob({
      owner,
      repo,
      file_sha: fileSha,
    });
    return Buffer.from(blob.content, "base64").toString("utf-8");
  } catch (err: unknown) {
    const e = err as { status?: number };
    if (e?.status === 404) return null;
    throw err;
  }
}

/**
 * Commit atomique de plusieurs fichiers via l'API Git Trees.
 * Fonctionne aussi bien pour des JSON (utf-8) que pour des images (base64).
 */
export async function commitFiles(
  files: CommitFile[],
  message: string
): Promise<{ commitSha: string; commitUrl: string }> {
  if (files.length === 0) {
    throw new Error("Aucun fichier à committer");
  }

  const { owner, repo, branch } = getConfig();
  const octokit = getOctokit();

  const { data: refData } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });
  const baseSha = refData.object.sha;

  const { data: baseCommit } = await octokit.rest.git.getCommit({
    owner,
    repo,
    commit_sha: baseSha,
  });
  const baseTreeSha = baseCommit.tree.sha;

  const blobs = await Promise.all(
    files.map(async (f) => {
      const encoding = f.encoding ?? "utf-8";
      const { data: blob } = await octokit.rest.git.createBlob({
        owner,
        repo,
        content: f.content,
        encoding,
      });
      return {
        path: f.path,
        mode: "100644" as const,
        type: "blob" as const,
        sha: blob.sha,
      };
    })
  );

  const { data: newTree } = await octokit.rest.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: blobs,
  });

  const { data: newCommit } = await octokit.rest.git.createCommit({
    owner,
    repo,
    message,
    tree: newTree.sha,
    parents: [baseSha],
  });

  await octokit.rest.git.updateRef({
    owner,
    repo,
    ref: `heads/${branch}`,
    sha: newCommit.sha,
  });

  return {
    commitSha: newCommit.sha,
    commitUrl: newCommit.html_url,
  };
}

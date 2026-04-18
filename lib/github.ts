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

export async function readFile(path: string): Promise<string | null> {
  const { owner, repo, branch } = getConfig();
  const octokit = getOctokit();

  try {
    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
      ref: branch,
    });

    if (Array.isArray(data) || data.type !== "file") {
      return null;
    }

    return Buffer.from(data.content, "base64").toString("utf-8");
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

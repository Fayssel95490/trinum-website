/**
 * Génère un hash bcrypt à partir d'un mot de passe en clair.
 * Usage :
 *   npx tsx scripts/hash-password.ts "MonMotDePasseFort123"
 *
 * Copiez ensuite la valeur affichée dans ADMIN_PASSWORD_HASH
 * (dans Vercel → Project Settings → Environment Variables).
 */
import bcrypt from "bcryptjs";

async function main() {
  const password = process.argv[2];
  if (!password) {
    console.error(
      'Usage : npx tsx scripts/hash-password.ts "votre mot de passe"'
    );
    process.exit(1);
  }
  if (password.length < 8) {
    console.warn(
      "⚠️  Recommandation : utilisez un mot de passe d'au moins 8 caractères."
    );
  }
  const hash = await bcrypt.hash(password, 12);
  console.log("\nADMIN_PASSWORD_HASH=" + hash + "\n");
  console.log(
    "Copiez cette ligne (hash uniquement, sans guillemets) dans les variables d'environnement Vercel."
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

# Panneau d'administration — Guide développeur

Ce document explique comment configurer et déployer le panneau d'administration ajouté au site Trinum.

## Vue d'ensemble

Le panneau admin est accessible sur `/admin` et permet au client de modifier :

- La page d'accueil (textes, images, étapes, partenaires…)
- Les fiches projets (toutes les données, dont les sections rich-text)
- La page contact et le lien Calendly
- Les infos société (nav, coordonnées, logos)

**Principe technique** : chaque modification depuis l'admin fait un commit sur GitHub via l'API (Octokit) → Vercel détecte le push → redéploie → site à jour en ~1 min.

Aucune base de données, aucun service tiers. Les fichiers JSON (`data/*.json`) dans le repo restent la source de vérité.

## Fichiers clés

| Fichier | Rôle |
|---|---|
| `middleware.ts` | Protège `/admin/*` et `/api/admin/*` |
| `lib/auth.ts` | Gestion de la session (iron-session) |
| `lib/github.ts` | Commits multi-fichiers via Octokit |
| `lib/rate-limit.ts` | Rate limit basique sur le login |
| `app/admin/login/page.tsx` | Page de connexion |
| `app/admin/page.tsx` | Dashboard avec 4 onglets |
| `components/admin/` | UI (AdminShell, fields, tabs) |
| `app/api/admin/*` | Routes API : login, logout, content, save, upload-image |
| `scripts/hash-password.ts` | Génère le hash bcrypt du mot de passe |

## Configuration — étapes à suivre une fois

### 1. Générer un mot de passe hashé

```bash
npm run hash-password "VotreMotDePasseFort123"
```

La commande affiche un hash bcrypt commençant par `$2b$12$...`. Copiez-le.

### 2. Générer un secret de session

```bash
openssl rand -base64 48
```

### 3. Créer un Personal Access Token GitHub

1. GitHub → Settings → Developer settings → **Personal access tokens** → Fine-grained tokens
2. Cliquer **Generate new token**
3. **Repository access** : uniquement `Fayssel95490/trinum-website`
4. **Permissions** → Repository permissions → **Contents : Read and write**
5. Expiration : 1 an (à renouveler)
6. Copier le token `github_pat_...`

### 4. Configurer les variables d'environnement Vercel

Dans **Vercel → Project → Settings → Environment Variables**, ajouter :

| Variable | Valeur |
|---|---|
| `ADMIN_USERNAME` | `admin` (ou autre identifiant) |
| `ADMIN_PASSWORD_HASH` | Le hash bcrypt généré en étape 1 |
| `SESSION_SECRET` | Le secret généré en étape 2 |
| `GITHUB_TOKEN` | Le PAT généré en étape 3 |
| `GITHUB_REPO` | `Fayssel95490/trinum-website` |
| `GITHUB_BRANCH` | `main` |

Déployer (Vercel redéploie automatiquement après modification des env vars).

### 5. Donner les accès au client

- URL : `https://[domaine]/admin`
- Identifiant : la valeur de `ADMIN_USERNAME`
- Mot de passe : le mot de passe en clair (celui utilisé à l'étape 1)

Transmettez ces informations via un canal sécurisé (1Password, message chiffré…).

## Développement local

1. Copier les mêmes variables dans `.env.local`
2. `npm run dev`
3. Aller sur `http://localhost:3000/admin`

**Note** : en local, les commits atterrissent bien sur GitHub et déclenchent un déploiement Vercel. Pour tester sans polluer le repo, utilisez un repo de test ou commentez temporairement le call `commitFiles`.

## Sécurité

- Cookie `httpOnly`, `SameSite=Strict`, `Secure` en production
- Rate limit : 5 tentatives de login par IP toutes les 15 min
- Mot de passe stocké uniquement sous forme de hash bcrypt (coût 12)
- `GITHUB_TOKEN` jamais exposé côté client (uniquement dans les routes API server-side)
- Les fichiers éditables sont whitelistés : `data/home.json`, `data/contact.json`, `data/site.json`, `data/projects.json`
- Les uploads d'images acceptent uniquement JPEG/PNG/WebP/GIF/SVG, max 5 Mo, dans `public/images/projects/` ou `public/images/logos/`

## Dépannage

**"Configuration serveur manquante"** : variables `ADMIN_USERNAME` ou `ADMIN_PASSWORD_HASH` absentes.

**"Échec du commit : Resource not accessible by integration"** : le `GITHUB_TOKEN` n'a pas les permissions `Contents: Read and write` sur le repo.

**Le client ne voit pas ses modifications** : attendez ~1 min (temps de rebuild Vercel). Vérifiez dans Vercel → Deployments qu'un nouveau déploiement a été déclenché.

## Évolutions possibles (v2)

- Preview avant publish (commit sur branche `draft` avec Vercel Preview)
- Support rich-text étendu (images inline, tableaux…)
- Notification email au dev à chaque modification du client
- Historique visuel des modifications dans l'admin (lire les commits via API GitHub)

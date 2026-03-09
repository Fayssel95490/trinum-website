# PRD — Site Vitrine Trinum Ingénierie
> Document directif pour Cursor. Suivre à la lettre sans déviation d'architecture ou de design.

---

## 0. Contexte Produit

Site vitrine B2B pour **Trinum Ingénierie**, bureau d'ingénierie CVSE (Climatisation, Ventilation, Sanitaire, Électricité) basé en France.

**Cible utilisateur :** Maîtres d'ouvrage, promoteurs immobiliers, architectes, MOE.  
**Objectif principal :** Asseoir la crédibilité technique + générer des leads qualifiés (formulaire de contact + prise de RDV Calendly).  
**Langue :** Français uniquement.

---

## 1. Stack Technique — OBLIGATOIRE

| Élément | Choix | Raison |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR, SEO, routing |
| Styling | **Tailwind CSS** + CSS variables custom | Flexibilité + cohérence |
| Composants UI | **shadcn/ui** | Standard, accessible, themeable |
| Formulaire | **react-hook-form** + **zod** | Validation robuste |
| Email | **Resend** (API Route Next.js) | Simple, fiable |
| Contenu | **JSON statique** dans `/data` | Pas de CMS, simple |
| Déploiement | **Vercel** | Compatible Next.js natif |
| Typo | **DM Serif Display** (titres) + **Inter** (corps) via Google Fonts | Correspond aux maquettes |

### Dépendances npm à installer
```bash
npx shadcn@latest init
npx shadcn@latest add button card badge navigation-menu dialog toast input textarea select label separator
npm install react-hook-form zod @hookform/resolvers resend
npm install @next/font
```

---

## 2. Design System — OVERRIDE SHADCN

### 2.1 Variables CSS — `globals.css`
```css
:root {
  /* Couleurs Trinum */
  --background:        #F5F0E5;   /* Beige crème chaud — fond global */
  --foreground:        #1A1A2E;   /* Quasi-noir bleu — texte principal */
  --primary:           #3D5A3E;   /* Vert olive foncé — CTA, accents principaux */
  --primary-foreground:#FFFFFF;
  --accent:            #E8813A;   /* Orange ambre — bullets, icônes, highlights */
  --accent-foreground: #FFFFFF;
  --card:              #FFFFFF;
  --card-foreground:   #1A1A2E;
  --muted:             #EAE5D8;   /* Beige légèrement plus foncé — zones secondaires */
  --muted-foreground:  #6B6B6B;
  --border:            #D4CEBF;
  --input:             #FFFFFF;
  --ring:              #3D5A3E;

  /* Citation bloc olive */
  --quote-bg:          #3D5A3E;
  --quote-text:        #F5F0E5;

  /* Radius */
  --radius: 0.75rem;              /* 12px */
}
```

### 2.2 Typographie — `layout.tsx`
```tsx
import { DM_Serif_Display, Inter } from 'next/font/google'

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
})
```

### 2.3 Classes utilitaires à définir dans `globals.css`
```css
.font-serif { font-family: var(--font-serif); }
.font-sans  { font-family: var(--font-sans); }

/* Titres de page */
.heading-xl {
  font-family: var(--font-serif);
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: var(--foreground);
  font-weight: 400;
}

/* Grande citation (bloc olive) */
.quote-block {
  background-color: var(--quote-bg);
  color: var(--quote-text);
  padding: 2.5rem;
  border-radius: var(--radius);
}
.quote-block p {
  font-family: var(--font-serif);
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-style: italic;
  line-height: 1.3;
}

/* Bullet accent orange */
.bullet-accent li::marker { color: var(--accent); }

/* Section label (ex: "Contexte", "Les contraintes") */
.section-label {
  color: var(--primary);
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
```

---

## 3. Structure de Fichiers

```
/
├── app/
│   ├── layout.tsx                  # Root layout (fonts, Navbar, Footer)
│   ├── page.tsx                    # Home /
│   ├── projets/
│   │   ├── page.tsx                # Liste projets /projets
│   │   └── [slug]/
│   │       └── page.tsx            # Page projet dynamique /projets/[slug]
│   ├── contact/
│   │   └── page.tsx                # Page contact /contact
│   └── api/
│       └── contact/
│           └── route.ts            # API Route envoi email Resend
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── TrustedBy.tsx
│   │   ├── WhyTrinum.tsx
│   │   ├── FullWidthImage.tsx
│   │   └── ProjectsPreview.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   ├── project-detail/
│   │   ├── ProjectHero.tsx
│   │   ├── QuoteBlock.tsx
│   │   └── ProjectSection.tsx
│   └── contact/
│       ├── ContactForm.tsx
│       └── CalendlyButton.tsx
├── data/
│   ├── projects.json               # Données des 3 projets
│   └── site.json                   # Infos globales (contacts, liens)
├── public/
│   └── images/
│       ├── projects/
│       └── logos/
└── lib/
    ├── validations.ts              # Schémas Zod
    └── email.ts                    # Helper Resend
```

---

## 4. Pages — Spécifications Détaillées

---

### 4.1 Page Home `/`

#### Navbar (sticky, fond `--background`)
- Logo Trinum à gauche (SVG ou PNG, height: 40px)
- Liens centre : `Accueil` | `Prestations` | `Projets` | `Contact`
- CTA droite : Button shadcn variant="default" couleur `--primary` → `"Évaluez votre projet"` → lien vers `/contact`
- Composant : `NavigationMenu` shadcn
- Mobile : menu hamburger (Sheet shadcn)

#### Section Hero
```
- Background : --background (beige)
- H1 : "Vos projets CVSE en toute agilité"
  → font-serif, très grande taille (clamp 2.5rem → 4.5rem), centré
- Sous-titre : "Un bureau d'ingénieurs réactif, cadré et facile à activer tout sans complexification du projet"
  → font-sans, muted-foreground, centré
- Image : mockup laptop avec photo de projet en écran
  → AspectRatio shadcn, max-width: 800px, centré, rounded-xl
```

#### Section Trusted By
```
- Label : "Trusted by :"
- Logos en flex row (wrap) : VINCI, BNP Paribas Real Estate, H&dM, Marti, HUG, ILO
- Logos en niveaux de gris, opacity 0.6
- Pas de composant shadcn — simple flex HTML
```

#### Section "Pourquoi Trinum ?"
```
- H2 : "Pourquoi Trinum ?" centré, font-serif
- Sous-titre : "Un bureau d'ingénieurs réactif..."
- Grid 2x2 (desktop) / 1 col (mobile) de Cards shadcn
- Chaque card contient :
  → Icône (lucide-react) couleur --accent
  → Titre bold
  → Texte description
- Les 4 blocs (d'après maquette) :
  1. "Un seul interlocuteur, des arbitrages rapides"
  2. "Conception conforme et prête à autoriser"
  3. "Plans & BIM orientés chantiers"
  4. "Rigueur grand compte, agilité d'une petite équipe"
```

#### Section Full Width Image
```
- Image industrielle pleine largeur (tuyauterie/chaufferie)
- AspectRatio 21/9 desktop, 16/9 mobile
- object-fit: cover
- Aucun texte par-dessus
```

#### Section "Références & Réalisations"
```
- H2 : "Références & Réalisations" centré, font-serif
- Sous-titre : "Une solution qui vous fait économiser du temps et de l'énergie"
- Grid 3 colonnes (desktop) / 1 col (mobile)
- Chaque ProjectCard (voir composant 5.1) pour les 3 projets
```

#### Section CTA Final
```
- Background : --primary (vert olive)
- H2 : "Evaluez votre projet" couleur white, font-serif, centré
- Texte : "Planifiez un premier échange pour voir comment Trinum peut vous accompagner sur vos projets techniques"
- Button : variant outline, couleur white, border white → lien /contact
  Label : "Contactez-nous →"
```

#### Footer
```
- Background : --background
- Border-top : 1px --border
- Layout 3 colonnes :
  → Logo + tagline "Vos projets CVSE en toute agilité."
  → Liens nav : Projets | Contact | Mentions légales
  → Icône LinkedIn (lucide-react Linkedin) → lien externe
- Copyright : "© 2025 Trinum Ingénierie"
```

---

### 4.2 Page Projets `/projets`

```
- H1 : "Nos Projets" centré, font-serif
- Sous-titre descriptif
- Grid 3 col (desktop) / 2 col (tablette) / 1 col (mobile)
- ProjectCard pour chacun des 3 projets
- Pas de filtre au MVP
```

---

### 4.3 Page Projet `/projets/[slug]`

Template **identique** pour les 3 projets, contenu dynamique depuis `data/projects.json`.

Structure dans l'ordre exact :

```
1. Logo header (même Navbar)

2. ProjectHero
   - H1 : project.title (font-serif, centré)
   - Pills/Badges : project.tags[] (shadcn Badge, variant outline, couleur --primary)
   - Image hero (AspectRatio 16/9, rounded-xl)

3. Section "Contexte"
   - label .section-label : "Contexte"
   - Paragraphe prose : project.context

4. Section contraintes/défis
   - label .section-label : project.challengesTitle (ex: "Les contraintes")
   - <ul> avec bullets → .bullet-accent
   - Items : project.challenges[]

5. QuoteBlock (bloc olive)
   - Icône cercle --accent en haut à gauche
   - Label : "Notre périmètre d'intervention :" ou "Notre mission :"
   - Grande citation en italique serif : project.quote
   → Composant QuoteBlock.tsx avec les styles .quote-block

6. Section choix techniques
   - label .section-label : project.technicalTitle
   - Prose avec <strong> pour les highlights : project.technicalContent
   - (rendu depuis HTML string ou MDX simple)

7. Image secondaire (si project.secondImage existe)
   - AspectRatio 16/9, rounded-xl

8. Section synthèse/coordination (si existe)
   - label .section-label
   - Prose

9. Section "Ce que ce projet démontre"
   - label .section-label : "Ce que ce projet démontre :"
   - Prose

10. Footer (identique global)
```

---

### 4.4 Page Contact `/contact`

Layout 2 colonnes (desktop) / 1 col (mobile) :

#### Colonne gauche — Formulaire
```
- H2 : "Décrivez votre projet"
- Composant ContactForm.tsx avec react-hook-form + zod

Champs :
  - Prénom (Input, required)
  - Nom (Input, required)
  - Email (Input type email, required)
  - Téléphone (Input type tel, optionnel)
  - Type de projet (Select shadcn) :
      options: ["Logements collectifs", "IGH / Grande hauteur", "Bureaux & Tertiaire",
                "Maison individuelle", "Réhabilitation", "Autre"]
  - Message (Textarea, 5 rows, optionnel)

Bouton submit :
  - Label : "Envoyer ma demande"
  - variant="default", couleur --primary, full width
  - État loading : spinner (lucide Loader2) + disabled pendant envoi
  - Succès : Toast shadcn "Votre message a bien été envoyé. Nous vous répondons sous 24h."
  - Erreur : Toast destructive "Une erreur est survenue. Veuillez réessayer."
```

#### Colonne droite — Calendly
```
- Séparateur visuel "ou"
  → <Separator shadcn> vertical (desktop) / horizontal (mobile) avec label "ou"
- H3 : "Préférez un échange direct ?"
- Texte : "Réservez directement un créneau de 30 min dans notre agenda."
- CalendlyButton.tsx :
  → Button variant="outline", couleur --primary, border --primary
  → Label : "📅 Prendre rendez-vous sur Calendly"
  → onClick : window.open(CALENDLY_URL, '_blank')
  → CALENDLY_URL depuis variable d'env NEXT_PUBLIC_CALENDLY_URL
```

---

## 5. Composants — Spécifications

### 5.1 `ProjectCard.tsx`
```tsx
Props: {
  slug: string
  image: string
  title: string
  subtitle: string          // ex: "156 logements | CVC | REX"
  highlights: string[]      // 3 points clés avec checkmark
  tags: string[]
  ctaLabel?: string         // défaut: "Voir l'étude de cas"
}

Structure :
  <Card> shadcn
    Image (aspect 4/3, rounded-t-xl, object-cover)
    <CardContent>
      Titre bold
      Sous-titre muted
      <ul> avec ✓ (lucide Check, couleur --accent) + texte pour chaque highlight
    <CardFooter>
      <Button variant="default" couleur --primary asChild>
        <Link href={/projets/${slug}}>Voir l'étude de cas</Link>
      </Button>
```

### 5.2 `QuoteBlock.tsx`
```tsx
Props: {
  label: string    // "Notre périmètre d'intervention :"
  quote: string    // Le texte de la citation
}

Structure :
  <div className="quote-block">
    <div flex items-center gap-2>
      <div className="w-6 h-6 rounded-full bg-[--accent]" />
      <span className="text-sm font-semibold text-[--accent]">{label}</span>
    </div>
    <p>"{quote}"</p>
  </div>
```

### 5.3 `ContactForm.tsx`
```tsx
- Utiliser useForm() de react-hook-form
- Schema Zod dans lib/validations.ts :
    name, email (required), phone (optional), projectType (required), message (optional)
- onSubmit : POST vers /api/contact
- Gérer états : idle | loading | success | error
- Utiliser shadcn Toast pour feedback
```

---

## 6. API Route — `/api/contact/route.ts`

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const body = await request.json()

  // Validation Zod côté serveur (réutiliser lib/validations.ts)

  // Email vers Trinum
  await resend.emails.send({
    from: 'site@trinum-ingenierie.fr',
    to: process.env.CONTACT_EMAIL,         // email Trinum depuis .env
    subject: `Nouvelle demande — ${body.projectType}`,
    html: `
      <h2>Nouvelle demande de contact</h2>
      <p><strong>Nom :</strong> ${body.firstName} ${body.lastName}</p>
      <p><strong>Email :</strong> ${body.email}</p>
      <p><strong>Téléphone :</strong> ${body.phone || 'Non renseigné'}</p>
      <p><strong>Type de projet :</strong> ${body.projectType}</p>
      <p><strong>Message :</strong> ${body.message || 'Aucun message'}</p>
    `
  })

  // Email accusé de réception au client
  await resend.emails.send({
    from: 'contact@trinum-ingenierie.fr',
    to: body.email,
    subject: 'Nous avons bien reçu votre demande — Trinum Ingénierie',
    html: `
      <p>Bonjour ${body.firstName},</p>
      <p>Nous avons bien reçu votre demande concernant votre projet de type <strong>${body.projectType}</strong>.</p>
      <p>Notre équipe vous répondra dans les 24 heures ouvrées.</p>
      <p>À bientôt,<br/>L'équipe Trinum Ingénierie</p>
    `
  })

  return Response.json({ success: true })
}
```

---

## 7. Données — `data/projects.json`

Structure exacte à respecter :

```json
[
  {
    "slug": "tour-triangle-paris",
    "title": "Tour Triangle — Paris",
    "subtitle": "Sanitaire EF / EC / EU / EP | Études d'exécution & suivi | IGH (180 m, 44 étages) | Projet finalisé en 2025",
    "tags": ["Sanitaire", "IGH", "BIM", "Études d'exécution"],
    "heroImage": "/images/projects/tour-triangle-hero.jpg",
    "secondImage": "/images/projects/tour-triangle-interior.jpg",
    "highlights": [
      "Suivi et Moi contrat de la maquette Revit",
      "Production des schémas hydrauliques/distributions",
      "Production des carnets de détails à plus 230 spécifiés"
    ],
    "context": "La Tour Triangle, immeuble de grande hauteur de 180 m et 44 étages...",
    "challengesTitle": "Les contraintes",
    "challenges": [
      "Sur un IGH, la hauteur change tout : l'acheminement de l'eau, la maîtrise des pressions...",
      "..."
    ],
    "quoteLabel": "Notre périmètre d'intervention :",
    "quote": "Études d'exécution sanitaires EF/EC/EU/EP : conception, coordination et dossier chantier, avec un focus sur la hydraulique (44 niveaux) et les interfaces.",
    "technicalTitle": "Les choix techniques clés :",
    "technicalContent": "<p>Pour garantir une pression constante...</p>",
    "synthesisTitle": "Synthèse BIM & coordination inter-lots :",
    "synthesisContent": "La maquette BIM 3D a été un levier déterminant...",
    "conclusionTitle": "Ce que ce projet démontre :",
    "conclusionContent": "Ce projet illustre notre capacité à livrer des installations sanitaires robustes..."
  },
  {
    "slug": "fev-eaux-vives-geneve",
    "title": "FEV (Eaux-Vives) Genève",
    "subtitle": "156 logements | CVC | REX (retour d'expérience) | Projet livré",
    "tags": ["CVC", "Logements", "REX"],
    "heroImage": "/images/projects/fev-geneve-hero.jpg",
    "secondImage": "/images/projects/fev-geneve-interior.jpg",
    "highlights": [
      "Dimensionnement de la production et distribution",
      "Production des schémas de principe hydraulique et aéraulique",
      "Production des plans techniques CVC"
    ],
    "context": "En 2023–2024, le projet FEV s'est inscrit dans l'aménagement du nouveau quartier...",
    "challengesTitle": "Les défis du projet",
    "challenges": [
      "Intégrer des systèmes CVC discrets dans une architecture exigeante",
      "Garantir une solution performante et réplicable sur plusieurs bâtiments",
      "Rester adaptables aux modifications client et aux ajustements en phase chantier"
    ],
    "quoteLabel": "Notre mission :",
    "quote": "Assurer la conception, le dimensionnement et l'exécution technique des installations CVC, en coordination avec la maîtrise d'œuvre et les entreprises.",
    "technicalTitle": "Choix techniques mis en oeuvre (CVC)",
    "technicalContent": "<p>Sur le plan technique, nous avons retenu un <strong>plancher chauffant</strong>...</p>",
    "synthesisTitle": "Coordination & rigueur d'exécution",
    "synthesisContent": "La coordination inter-lots devient ensuite un sujet quotidien...",
    "conclusionTitle": "Résultats obtenus",
    "conclusionContent": "Avec le recul, ce projet confirme un point essentiel..."
  },
  {
    "slug": "villa-clos-harmonie-aix",
    "title": "Villa Clos Harmonie Aix-en-Provence",
    "subtitle": "Électricité CFO / CFA | Études & exécution complète | 320 m²",
    "tags": ["Électricité", "CFO", "CFA", "Maison individuelle"],
    "heroImage": "/images/projects/villa-clos-harmonie-hero.jpg",
    "secondImage": "/images/projects/villa-clos-harmonie-interior.jpg",
    "highlights": [
      "Dimensionnement DCE/CFA, bilan de puissance",
      "Étude et intégration des modifications client",
      "Production des plans techniques CVC"
    ],
    "context": "Située sur les hauteurs d'Aix-en-Provence, la villa Clos Harmonie...",
    "challengesTitle": "Enjeu & attentes du client",
    "challenges": [
      "Installation électrique à la fois haut de gamme et évolutive : équipements classiques irréprochables + base connectée domotique"
    ],
    "quoteLabel": "Notre mission (CFO / CFA — études & suivi d'exécution)",
    "quote": "Conception, plans et suivi de chantier CFO/CFA jusqu'à réception avec une priorité : une exécution maîtrisée et des interfaces cohérentes.",
    "technicalTitle": "Solutions techniques mises en œuvre",
    "technicalContent": "<p>Nous avons conçu une <strong>distribution électrique complète</strong>...</p>",
    "synthesisTitle": "Coordination & intégration chantier",
    "synthesisContent": "Nous avons intégré nos études au sein des plans architecte...",
    "conclusionTitle": "Résultat & retour d'expérience",
    "conclusionContent": "Le projet Clos Harmonie illustre notre capacité à livrer une installation électrique personnalisée..."
  }
]
```

---

## 8. Variables d'Environnement — `.env.local`

```bash
# Resend
RESEND_API_KEY=re_xxxxxxxxxxxx

# Email de destination (boite Trinum)
CONTACT_EMAIL=contact@trinum-ingenierie.fr

# Calendly
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/trinum-ingenierie/30min
```

---

## 9. Règles de Développement — CURSOR DOIT RESPECTER

1. **Pas de `className` inline avec couleurs hardcodées** → utiliser les CSS variables (`text-[var(--primary)]`, `bg-[var(--accent)]`)
2. **Tous les composants shadcn doivent être thémés** via le fichier `globals.css`, pas au cas par cas
3. **Mobile-first** : toutes les grids commencent en 1 colonne, breakpoint `md:` pour 2 col, `lg:` pour 3 col
4. **Images** : utiliser `next/image` avec `fill` ou `width/height` explicites, jamais `<img>`
5. **Liens** : utiliser `next/link`, jamais `<a>` sauf pour liens externes (`target="_blank"`)
6. **Pas de données en dur dans les composants** : tout vient de `data/projects.json` ou props
7. **Validation double** : Zod côté client ET côté serveur dans l'API route
8. **Gestion d'erreur** : try/catch sur tous les appels API, toujours afficher un feedback utilisateur
9. **Accessibilité** : `aria-label` sur tous les boutons icône, `alt` sur toutes les images
10. **Performance** : `loading="lazy"` sur les images secondaires, `priority` uniquement sur l'image hero

---

## 10. Ordre de Développement Recommandé

```
1. Setup projet Next.js + Tailwind + shadcn/ui
2. Configurer design system (globals.css + fonts)
3. Créer data/projects.json avec les 3 projets
4. Layout global (Navbar + Footer)
5. Page Home (section par section, du haut vers le bas)
6. Page /projets (grid + ProjectCard)
7. Page /projets/[slug] (template dynamique)
8. Page /contact (formulaire + Calendly)
9. API Route /api/contact (Resend)
10. Tests responsive + accessibilité
11. Deploy Vercel
```

---

## 11. Contenu à Remplir (Placeholders)

Les éléments suivants sont des placeholders à remplacer par le client :
- Toutes les images dans `/public/images/`
- L'URL Calendly réelle dans `.env.local`
- L'email de destination réel dans `.env.local`
- Les textes longs dans `data/projects.json` (repris des maquettes)
- Les logos "Trusted by" dans `/public/images/logos/`
- Les mentions légales (`/mentions-legales`)

---

*PRD version 1.0 — Trinum Ingénierie — Généré pour usage Cursor*
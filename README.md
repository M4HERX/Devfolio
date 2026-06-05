# Portfolio Template

A dark, space-themed personal portfolio built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Features a particle network home page, a radial skill-tree visualization, animated page transitions, a working contact form, and built-in support for **7 languages** via a floating language switcher.

> **All personal content lives in a small set of config + data files — you never touch the component code.**

---

## Design & Aesthetic

The template has a **futuristic, deep-space atmosphere** — think mission control meets a developer's universe.

- **Color palette** — near-black backgrounds (`#1e1f22`) layered with dark charcoal surfaces, electric blue accents (`#5865f2`), and a signature cyan-blue glow (`#4f9eff`) that pulses on interactive elements. Nothing is stark white; every surface has depth.
- **Living backgrounds** — the home page renders a real-time **particle network** on a `<canvas>`: drifting nodes that connect with glowing blue threads and gently pull toward your cursor. Inner pages use a **deep-space backdrop** — twinkling stars, shooting stars streaking across the screen, slow-drifting satellites, the occasional comet, and a periodic ISS fly-by. All purely decorative, zero performance cost.
- **Typography** — four Google Fonts work together: **Orbitron** for the wordmark/brand (sharp, sci-fi geometry), **Rajdhani** for headings (angular and technical), **DM Sans** for body copy (clean and readable), and **IBM Plex Mono** for labels, tags, and code (monospaced precision).
- **Glow effects** — buttons, card borders, and text headings emit a soft blue halo on hover or focus, reinforcing the bioluminescent, neon-in-the-dark feel without being garish.
- **Skill tree** — on desktop, your skills render as an interactive **radial graph**: a glowing branded node at the center with category branches fanning outward. Animated flow lines travel along each branch like electric pulses. On mobile it collapses into a clean accordion.
- **Grain overlay** — a subtle dot-grain texture sits over the entire page at near-zero opacity, adding tactile depth that keeps the dark backgrounds from feeling flat.
- **Motion** — every page entrance fades and slides up. Cards lift and glow on hover. The skill-tree expands with staggered pop animations. A bouncing chevron prompts the visitor to scroll. All animations respect `prefers-reduced-motion`.
- **Scrollbar** — even the browser scrollbar is styled: a thin gradient line running electric blue to cyan, matching the accent palette.

The overall impression is **cosmic and technical** — a portfolio that feels like it belongs inside a space station's interface, built by someone who takes both craft and the cosmos seriously.

---

## Live Preview

Deploy on Vercel in seconds — see [Deploy](#deploy) below.

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — particle background, name, slogan, intro, social links |
| `/about` | Bio, avatar, "currently working on" card, spoken languages, timeline, philosophy |
| `/skills` | Interactive radial skill-tree (desktop) + accordion (mobile) |
| `/work` | Client / freelance work gallery with filter bar |
| `/projects` | Personal / open-source projects gallery with filter bar |
| `/contact` | Email card, Discord card, contact form (FormSubmit.co) |

---

## Quickstart

```bash
# 1. Clone
git clone https://github.com/yourusername/portfolio-template.git
cd portfolio-template

# 2. Install
npm install

# 3. Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Customization

### Step 1 — Identity & feature flags `config/links.ts`

This is the **only file** you need to edit to change who the site is about.

```ts
// Your birth date (age auto-computes every birthday)
export const BIRTH_DATE = { year: 1995, month: 1, day: 1 };

export const SITE = {
  name: "DEVFOLIO",        // Brand / handle shown in navbar, footer, loading screen
  fullName: "Jane Doe",    // Real name shown in footer, about page, meta tags
  title: "Full Stack Developer",
  slogan: "Building things that matter.",
  origin: "Your City",     // City / country shown on home badge and about page
  email: "you@example.com",// Contact form delivers messages here (FormSubmit.co)

  showLanguageSwitcher: true, // false = hides the bottom-left language picker
};

export const LINKS = {
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  discord: "https://discord.gg/yourserver",
  instagram: "https://instagram.com/yourusername",
};

// Shown on the Discord contact card — clicking the icon copies this to clipboard
export const DISCORD_HANDLE = "yourusername";

// Spoken languages displayed on the About page
export const SPOKEN_LANGUAGES = [
  { name: "English",  level: "native"   },
  { name: "Español",  level: "fluent"   },
  { name: "Français", level: "learning" },
];
```

Values set here automatically flow into **translations** via `{name}`, `{origin}`, `{siteName}`, `{role}`, and `{age}` placeholders — you don't need to update translations manually.

---

### Step 2 — Bio & content `data/translations.json`

Open `data/translations.json` and edit the `"en"` block. Look for `[bracket]` markers — those are the sections that need your personal content:

```json
"home.intro": "I'm {name}, a {age}-year-old {role} from {origin}. [Write your 2-3 sentence intro here]",
"about.bio1": "[First paragraph of your About bio]",
"about.bio2": "[Second paragraph — what you build and the tech you use]",
"about.bio3": "[Third paragraph — your approach or work style]",
"about.bio4": "[Fourth paragraph — interests outside of coding]",
"common.slogan": "Your personal slogan goes here.",

// Journey timeline (5 milestones)
"about.m1.year": "The Start",
"about.m1.title": "First lines of code",
"about.m1.desc": "[Your story of how you got into coding]",
// ... and so on for m2–m5

// Philosophy cards
"about.v1.title": "Build",
"about.v1.body": "[Your building philosophy]",
// ... v2 (Learn), v3 (Dream)

// Currently working on card
"about.currentTitle": "Your current focus",
"about.currentBody": "What you're building or learning right now.",
```

**Supported placeholders** (replaced automatically at runtime):

| Placeholder | Value |
|-------------|-------|
| `{name}` | `SITE.fullName` |
| `{origin}` | `SITE.origin` |
| `{siteName}` | `SITE.name` |
| `{role}` | `SITE.title` |
| `{age}` | Computed from `BIRTH_DATE` |

---

### Step 3 — Skills `data/skills.json`

Replace the example branches and skills with your own stack. The center node of the skill tree automatically uses `SITE.name`.

```json
{
  "branches": [
    {
      "id": "frontend",
      "name": "Frontend",
      "description": "Building fast, expressive interfaces.",
      "skills": [
        { "name": "React",      "description": "Component-based UI library." },
        { "name": "Next.js",    "description": "React framework with SSR." }
      ]
    }
  ]
}
```

Add as many branches and skills as you like. Remove ones that don't apply.

---

### Step 4 — Client work `data/work.json`

```json
{
  "items": [
    {
      "slug": "my-client-project",
      "title": "Project Title",
      "client": "Client Name",
      "description": "What you built and the value it delivered.",
      "tech": ["Next.js", "PostgreSQL"],
      "category": "Full Stack",
      "featured": true,
      "link": "https://example.com",
      "cover": "/work/my-project.jpg"
    }
  ]
}
```

Drop cover images into `public/work/` and reference them as `/work/filename.jpg`.  
Leave `cover` out and a generated placeholder is shown instead.

---

### Step 5 — Personal projects `data/projects.json`

Same structure as `work.json` — drop images in `public/projects/`.

---

### Step 6 — Avatar

The About page shows a geometric placeholder with the first letter of `SITE.name`.  
To use a real photo, open `components/ui/AvatarFrame.tsx` and replace the glowing core `<div>` with a Next.js `<Image>` component:

```tsx
import Image from "next/image";

// Replace the glowing core div with:
<div className="absolute inset-10 overflow-hidden rounded-full">
  <Image src="/your-photo.jpg" alt={SITE.fullName} fill className="object-cover" />
</div>
```

---

### Step 7 — Favicon

The favicon is the small icon shown in the browser tab and bookmarks bar.

**1. Prepare your icon file**

The simplest approach is a single `favicon.ico` file (recommended size: **32×32 px**, or **64×64** for sharper displays). You can also use a `.png` — both work fine.

Free tools to create one:
- [favicon.io](https://favicon.io) — generate from text, image, or emoji
- [realfavicongenerator.net](https://realfavicongenerator.net) — full cross-platform favicon package

**2. Drop the file into `public/`**

```
public/
└── favicon.ico   ← place your file here
```

**3. Done** — Next.js serves `public/favicon.ico` automatically. The `app/layout.tsx` is already configured to pick it up:

```ts
// app/layout.tsx
icons: { icon: "/favicon.ico" },
```

**Using a `.png` instead?**

Rename your file (e.g. `logo.png`), drop it in `public/`, and update the `icons` line in `app/layout.tsx`:

```ts
icons: { icon: "/logo.png" },
```

**Want separate icons for different platforms?** (browser tab, Apple touch icon, Android home screen)

```ts
icons: {
  icon: "/favicon.ico",
  apple: "/apple-touch-icon.png",   // 180×180 px
  shortcut: "/favicon-32x32.png",   // 32×32 px
},
```

Drop each file in `public/` at the matching path and Next.js handles the rest.

---

## Language Switcher

The floating globe button in the bottom-left lets visitors switch between **7 built-in languages**: English, French, Arabic, Spanish, German, Chinese, and Russian.

All UI strings (nav, buttons, form labels) are fully translated. Personal bio content falls back to English until you add your own translations.

**To disable the language switcher:**

```ts
// config/links.ts
showLanguageSwitcher: false,
```

**To add a language:**

1. Add an entry to `LOCALES` in `config/i18n.ts`:
   ```ts
   { code: "ja", label: "Japanese", native: "日本語" }
   ```
2. Add a `"ja"` block to `data/translations.json` with your translations.
3. Update the `Locale` type in `config/i18n.ts` to include `"ja"`.

**To remove a language:** Delete its entry from `LOCALES` and its block from `translations.json`.

---

## Contact Form

The form uses **[FormSubmit.co](https://formsubmit.co)** — no backend, no API keys, no sign-up.

1. Set `SITE.email` in `config/links.ts` to your email address.
2. On the **first form submission**, FormSubmit sends you an activation email — click the link in it once.
3. All subsequent submissions land directly in your inbox.

---

## Theming

All colors are CSS variables in `styles/globals.css`:

```css
:root {
  --bg-primary:   #1e1f22;  /* main background */
  --bg-secondary: #2b2d31;  /* cards, sidebars */
  --bg-tertiary:  #313338;  /* elevated surfaces, nav */
  --accent-blue:  #5865f2;  /* primary accent */
  --accent-glow:  #4f9eff;  /* glow / highlight */
  --text-primary: #f2f3f5;
  --text-muted:   #949ba4;
  --border:       #3f4147;
}
```

Change any of these values to re-theme the entire site instantly.

---

## Deploy

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on push.

### Other hosts

```bash
npm run build
npm start
```

Any host that supports Node.js works (Netlify, Railway, Render, etc.).

---

## Project Structure

```
├── config/
│   ├── links.ts       ← ★ EDIT THIS — all personal info + feature flags
│   ├── i18n.ts        ← language list + locale helpers
│   ├── projects.ts    ← project type definitions (don't edit)
│   └── skills.ts      ← skill tree loader (don't edit)
│
├── data/
│   ├── translations.json  ← ★ EDIT THIS — all text content in all languages
│   ├── skills.json        ← ★ EDIT THIS — your skill tree
│   ├── work.json          ← ★ EDIT THIS — client work entries
│   └── projects.json      ← ★ EDIT THIS — personal project entries
│
├── app/               ← Next.js App Router pages
├── components/
│   ├── i18n/          ← language context provider
│   └── ui/            ← all reusable UI components
├── lib/               ← data loading helpers
├── public/
│   ├── work/          ← client work cover images
│   └── projects/      ← personal project cover images
└── styles/
    └── globals.css    ← CSS variables / theme tokens
```

---

## Tech Stack

| Technology | Role |
|------------|------|
| [Next.js 14](https://nextjs.org) | Framework (App Router, SSR) |
| [TypeScript](https://typescriptlang.org) | Type safety |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Framer Motion](https://framer.com/motion) | Animations |
| [Lucide React](https://lucide.dev) | Icons |
| [React Icons](https://react-icons.github.io) | Social icons |
| [Vercel Analytics](https://vercel.com/analytics) | Page view tracking |
| [FormSubmit.co](https://formsubmit.co) | Contact form delivery |

---

## License

MIT — free to use, modify, and deploy for personal or commercial projects. Attribution appreciated but not required.

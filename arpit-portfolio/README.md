# Arpit Sangal — Portfolio

Personal portfolio built with **Angular 20**, featuring **3D glassmorphism UI**, **live GitHub integration**, and **automatic resume sync** from GitHub.

## Variants

| Version | Folder | Style |
|---------|--------|-------|
| Default | `arpit-portfolio/` | 3D glass UI, blue accent |
| Airtel | `arpit-portfolio-airtel/` | [Airtel Careers](https://careers.airtel.com/) inspired — red, corporate |

## Quick Start

```bash
cd arpit-portfolio
npm install --legacy-peer-deps
npm start
```

## Auto-Sync Resume Data

All portfolio content lives in `public/resume.json`. On every page load, the app:

1. Fetches the latest `resume.json` from your GitHub repo (public raw URL)
2. Falls back to the bundled local copy if offline
3. Dynamically renders hero, about, experience, projects, skills, and contact

**To update your portfolio:** edit `public/resume.json`, push to `main`, and the site auto-refreshes on next visit.

Place your resume PDF at `public/Arpit_30_05_26.pdf` (linked from the navbar).

## GitHub Integration

- Live repo cards fetched from the [GitHub API](https://api.github.com)
- Profile avatar, bio, and repo stats
- New **GitHub** section in the nav

## Deploy to GitHub Pages

### Automatic (recommended)
1. Push to [github.com/ArpitSangal1997/arpit-portfolio](https://github.com/ArpitSangal1997/arpit-portfolio)
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Every push to `main` auto-deploys to `https://arpitsangal1997.github.io/arpit-portfolio/`

### Manual
```bash
npm run deploy
```

## Customization

| What to change | File |
|----------------|------|
| All resume content | `public/resume.json` |
| GitHub username | `resume.json` → `profile.github.username` |
| 3D scene / colors | `src/styles.scss`, `src/app/components/scene-3d/` |
| Deploy base path | `angular.json` → `gh-pages.baseHref` |

## Contact Form

Simulated by default. Integrate FormSpree or EmailJS in `contact.ts` for real submissions.

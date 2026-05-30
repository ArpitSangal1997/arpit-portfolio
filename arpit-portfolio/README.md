# Arpit Sangal — Portfolio

Personal portfolio built with **Angular 20** (standalone architecture), **Angular Material**, and **Bootstrap 5**.

## Quick Start

```bash
npm install --legacy-peer-deps
npm start
```

## Deploy to GitHub Pages

### Automatic (GitHub Actions — recommended)
1. Push to a GitHub repo named `arpit-portfolio`
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Every push to `main` auto-deploys

### Manual
```bash
npm run deploy
```

> If your repo name differs, update `baseHref` in `angular.json` under `configurations.gh-pages`.

## Customization
All data lives in `src/app/services/portfolio.service.ts` — edit to update your resume content.

## Contact Form
Simulated by default. Integrate FormSpree or EmailJS in `contact.ts` for real submissions.

## Resume Download
Place your PDF at `public/Arpit_30_05_26.pdf`.

# Free Quick Calculator — Starter (Next.js + Tailwind)

Starter site with **3 calculators** (SIP, EMI, BMI) and a **searchable hub**. 
Perfect base to add the rest of your 30 tools.

## Run locally
```bash
npm install
npm run dev
```

## Deploy
- Push to GitHub
- Import to Vercel → Deploy
- Add domain `freequickcalculator.com` in Vercel → point DNS:
  - A @ → 76.76.21.21
  - CNAME www → cname.vercel-dns.com

## Add a new tool
- Create a component in `app/page.tsx` (or split into `/components`)
- Add to `TOOL_REGISTRY`

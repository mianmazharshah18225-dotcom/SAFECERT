# SafeCert Skills Ltd — Website

## 🚀 Vercel Deploy Guide (Step by Step)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run Locally (Test)
```bash
npm run dev
```
Open http://localhost:3000 to check the site.

### Step 3: Create GitHub Repository
1. Go to https://github.com → New Repository
2. Name it: `safecert-website`
3. Make it Private or Public (your choice)
4. Click "Create Repository"

### Step 4: Push Code to GitHub
```bash
git init
git add .
git commit -m "Initial SafeCert website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/safecert-website.git
git push -u origin main
```

### Step 5: Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Click **"New Project"**
4. Select your `safecert-website` repository
5. Framework: **Next.js** (auto-detected)
6. Click **"Deploy"** ✅

### Done! Your site will be live at:
`https://safecert-website.vercel.app`

---

## 📁 Project Structure
```
safecert/
├── app/
│   ├── layout.tsx          ← Root layout (Navbar + Footer)
│   ├── page.tsx            ← Homepage
│   ├── globals.css         ← Global styles
│   ├── courses/
│   │   ├── page.tsx        ← All courses listing
│   │   └── [slug]/
│   │       └── page.tsx    ← Individual course page
│   ├── licences/
│   │   ├── page.tsx        ← All licences
│   │   └── [slug]/
│   │       └── page.tsx    ← Individual licence page
│   ├── locations/
│   │   └── page.tsx        ← UK locations
│   ├── careers/
│   │   └── page.tsx        ← Career pathways
│   ├── about/
│   │   └── page.tsx        ← About company
│   ├── contact/
│   │   └── page.tsx        ← Contact form
│   └── not-found.tsx       ← 404 page
├── components/
│   ├── Navbar.tsx          ← Mega menu navbar
│   ├── Footer.tsx          ← Full footer
│   ├── Hero.tsx            ← Homepage hero
│   ├── CategoryCards.tsx   ← Course categories
│   ├── StatsBar.tsx        ← Company stats
│   ├── PopularCourses.tsx  ← Course cards
│   ├── HowItWorks.tsx      ← Steps section
│   ├── LocationsStrip.tsx  ← Cities strip
│   ├── Testimonials.tsx    ← Reviews
│   ├── TrustBar.tsx        ← Trust badges
│   └── CTASection.tsx      ← Call to action
├── lib/
│   └── data.ts             ← ALL your content (edit here!)
├── package.json
├── tailwind.config.js
├── next.config.js
└── tsconfig.json
```

## ✏️ How to Edit Content

All your content (courses, company name, phone, prices, etc.) is in ONE file:
```
lib/data.ts
```

Just edit that file to:
- Change company phone/email
- Add/remove courses
- Update prices
- Add new locations
- Edit testimonials

---

## 🎨 Color Scheme
- **Primary (Dark Blue):** `#1d4ed8` / `#0f2a8a`
- **Gold Accent:** `#f59e0b`
- **Background:** White / Gray-50
- **Dark (Footer):** `#020817`

To change colors, edit `tailwind.config.js` → `colors` section.

---

## 📦 Tech Stack
- **Next.js 14** — Framework
- **Tailwind CSS** — Styling
- **TypeScript** — Type safety
- **Lucide React** — Icons
- **Vercel** — Hosting

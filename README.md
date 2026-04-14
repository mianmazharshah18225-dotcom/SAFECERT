# SafeCert Skills Ltd - Professional Training Website

Professional Next.js website for SafeCert Skills Ltd offering First Aid, Food & Hygiene, and Health & Safety training in Luton, UK.

## ✨ Features

- **3 Professional Courses**: First Aid, Food & Hygiene, Health & Safety
- **1 Day Programs**: 8am-6pm daily in Luton
- **Stripe Payments**: Secure online enrollment (Test Mode ready)
- **Blog System**: 6 articles with search and filtering
- **Career Pathways**: Job opportunities showcase
- **SEO Optimized**: Meta tags, structured data, sitemap
- **Fully Responsive**: Mobile-first design
- **Fast Performance**: Next.js 16 with image optimization

## 🚀 Quick Deploy to Vercel (10 Minutes)

### 1. Push to GitHub

```bash
cd /Users/laptop/Desktop/safecert
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/safecert-skills.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to https://vercel.com (sign up with GitHub)
2. Click "Add New" → "Project"
3. Import your `safecert-skills` repository
4. Click "Deploy"
5. Done! Live at: `https://safecert-skills.vercel.app`

**For detailed instructions:** See `QUICK-START.md` or `DEPLOYMENT-GUIDE.md`

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Start production server
npm run start
```

---

## 📁 Project Structure

```
safecert/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   ├── courses/           # Courses pages
│   ├── blog/              # Blog pages
│   ├── careers/           # Careers page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── faqs/              # FAQs page
├── components/            # React components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── PopularCourses.tsx
│   ├── TrainersSection.tsx
│   └── ...
├── lib/
│   └── data.ts           # ALL content here!
├── public/               # Static files
└── styles/              # Global styles
```

---

## ✏️ Edit Content

**Everything is in ONE file:** `lib/data.ts`

Update:

- Company info (phone, email, address)
- Courses (title, price, description)
- Blog posts
- Testimonials
- FAQs
- Trainers

Then push to GitHub → Auto-deploys to Vercel!

---

## 📄 Documentation

- **`QUICK-START.md`** - Deploy in 10 minutes
- **`DEPLOYMENT-GUIDE.md`** - Complete deployment guide
- **`STRIPE-SETUP.md`** - Payment integration setup (Test Mode)
- **`SEO-IMPLEMENTATION.md`** - SEO setup and tips

---

## 🎨 Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vercel** - Hosting (recommended)

---

## 🌐 Pages

- `/` - Home
- `/courses` - All courses
- `/courses/[slug]` - Individual courses
- `/blog` - Blog listing
- `/blog/[slug]` - Blog posts
- `/careers` - Career opportunities
- `/about` - Company info
- `/contact` - Contact & location
- `/faqs` - FAQ page

---

## 🔧 Configuration

### Update Domain

After deployment, find & replace in all files:

- Find: `https://safecertskills.co.uk`
- Replace: `https://your-domain.com`

### Environment Variables

See `.env.example` for available variables.

**Required for Payments:**

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

See `STRIPE-SETUP.md` for detailed setup instructions.

---

## 📊 SEO Features

✅ Meta tags on all pages
✅ Open Graph tags
✅ Structured data (JSON-LD)
✅ Sitemap.xml
✅ Robots.txt
✅ Optimized images
✅ Fast loading

---

## 🆘 Support

- **Deployment Issues?** See `DEPLOYMENT-GUIDE.md`
- **Next.js Docs:** https://nextjs.org/docs
- **Vercel Docs:** https://vercel.com/docs

---

## 📝 License

Private - All rights reserved by SafeCert Skills Ltd

---

**Ready to deploy?** See `QUICK-START.md` for step-by-step guide!

# Vercel Deployment Guide - SafeCert Skills Ltd

## 🚀 Complete Step-by-Step Deployment Instructions

### Prerequisites
- GitHub account
- Vercel account (free tier is fine)
- Git installed on your computer
- Your domain name (optional, can use Vercel subdomain)

---

## Part 1: Prepare Your Project

### 1. Initialize Git Repository (if not already done)

```bash
cd /Users/laptop/Desktop/safecert
git init
git add .
git commit -m "Initial commit - SafeCert Skills website"
```

### 2. Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name: `safecert-skills` (or your preferred name)
4. Keep it Private or Public
5. **DO NOT** initialize with README (we already have code)
6. Click "Create Repository"

### 3. Push to GitHub

```bash
# Add GitHub as remote
git remote add origin https://github.com/YOUR-USERNAME/safecert-skills.git

# Push your code
git branch -M main
git push -u origin main
```

---

## Part 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Sign up/Login (use GitHub account)

2. **Import Project**
   - Click "Add New Project"
   - Click "Import Git Repository"
   - Select your `safecert-skills` repository
   - Click "Import"

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)

4. **Environment Variables** (Optional for now)
   - Click "Add" if you want to add environment variables
   - You can skip this for now and add later

5. **Deploy**
   - Click "Deploy"
   - Wait 2-5 minutes for build to complete
   - You'll get a URL like: `https://safecert-skills.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? safecert-skills
# - In which directory is your code? ./
# - Auto-detected Project Settings (Next.js)
# - Override settings? N

# Deploy to production
vercel --prod
```

---

## Part 3: Configure Your Custom Domain

### If You Have a Domain (e.g., safecertskills.co.uk)

1. **Add Domain in Vercel**
   - Go to your project dashboard
   - Click "Settings" → "Domains"
   - Enter your domain: `safecertskills.co.uk`
   - Also add: `www.safecertskills.co.uk`
   - Click "Add"

2. **Configure DNS** (at your domain provider)

   Add these DNS records:

   **For Root Domain** (safecertskills.co.uk):
   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   ```

   **For WWW**:
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Verification**
   - Can take 5 minutes to 48 hours
   - Vercel will auto-verify and issue SSL certificate

---

## Part 4: Update Site URLs

After deployment, update these files with your actual domain:

### Files to Update:

**1. app/layout.tsx** (Line 22-30)
```typescript
// Replace all instances of:
'https://safecertskills.co.uk'
// With your actual Vercel URL or custom domain
```

**2. app/page.tsx** (Line 18)
```typescript
// Update URL in structured data
```

**3. app/sitemap.ts** (Line 5)
```typescript
const baseUrl = 'https://YOUR-ACTUAL-DOMAIN.com'
```

**4. app/robots.ts** (Line 10)
```typescript
sitemap: 'https://YOUR-ACTUAL-DOMAIN.com/sitemap.xml',
```

**5. All layout files in:**
- `app/courses/layout.tsx`
- `app/contact/layout.tsx`
- `app/faqs/layout.tsx`
- `app/blog/layout.tsx`

### Quick Find & Replace:

```bash
# In your code editor, find and replace all:
# Find: https://safecertskills.co.uk
# Replace with: https://your-actual-domain.com
```

Then commit and push:
```bash
git add .
git commit -m "Update URLs with actual domain"
git push origin main
```

Vercel will auto-deploy the changes!

---

## Part 5: Make Site Dynamic (Already Configured!)

Your site is already configured for dynamic rendering:

✅ **next.config.js** - Configured for standalone output
✅ **vercel.json** - Vercel configuration ready
✅ **Dynamic Routes** - Blog posts and courses use SSG with dynamic params
✅ **Image Optimization** - Configured for Unsplash images

### What's Dynamic vs Static:

**Dynamic (Server-rendered on request):**
- Blog posts with `[slug]` routes
- Course pages with `[slug]` routes
- Contact form (if you add one)

**Static (Pre-rendered at build):**
- Home page
- About page
- Courses listing
- Blog listing

This is the **best** setup for performance and SEO!

---

## Part 6: Set Up Continuous Deployment

**Already Done!** 🎉

Every time you push to GitHub:
```bash
git add .
git commit -m "Your changes"
git push origin main
```

Vercel automatically:
1. Detects the push
2. Builds your site
3. Deploys to production
4. Updates your domain

---

## Part 7: Environment Variables (Optional)

If you want to add environment variables later:

1. Go to Vercel Dashboard
2. Select your project
3. Click "Settings" → "Environment Variables"
4. Add variables from `.env.example`
5. Redeploy for changes to take effect

---

## Part 8: Post-Deployment Checklist

After successful deployment:

### SEO Setup (IMPORTANT!)

1. **Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add your property: `https://your-domain.com`
   - Verify via HTML tag (add to `app/layout.tsx`)
   - Submit sitemap: `https://your-domain.com/sitemap.xml`

2. **Google My Business**
   - Create listing at: https://www.google.com/business/
   - Add your Luton location
   - Verify your business
   - Add photos and course info

3. **Google Analytics** (Optional)
   - Create account: https://analytics.google.com
   - Get tracking ID
   - Add to your site via environment variable

### Testing

✅ Test all pages work:
- Homepage: `/`
- Courses: `/courses`
- Each course: `/courses/first-aid`, `/courses/food-hygiene`, `/courses/health-safety`
- Blog: `/blog`
- Each blog post: `/blog/[slug]`
- Careers: `/careers`
- About: `/about`
- Contact: `/contact`
- FAQs: `/faqs`

✅ Test mobile responsiveness

✅ Test page speed:
- Go to: https://pagespeed.web.dev/
- Enter your URL
- Aim for 90+ score

✅ Check SEO:
- View page source
- Verify meta tags are present
- Check structured data: https://search.google.com/test/rich-results

---

## Part 9: Future Updates

### To Update Your Site:

1. Make changes locally
2. Test with `npm run dev`
3. Build to verify: `npm run build`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```
5. Vercel auto-deploys (takes 2-3 minutes)

### To Add New Blog Posts:

1. Open `lib/data.ts`
2. Add new post to `BLOG_POSTS` array
3. Push to GitHub
4. Auto-deployed!

### To Update Courses:

1. Open `lib/data.ts`
2. Update `COURSES` array
3. Push to GitHub
4. Auto-deployed!

---

## Part 10: Troubleshooting

### Build Fails?

**Check build logs in Vercel:**
1. Go to Deployments tab
2. Click on failed deployment
3. View build logs
4. Fix the error shown
5. Push fix to GitHub

### Common Issues:

**1. TypeScript Errors**
```bash
npm run build
# Fix any errors shown
```

**2. Missing Dependencies**
```bash
npm install
```

**3. Environment Variables**
- Make sure they're set in Vercel dashboard
- Redeploy after adding

**4. Domain Not Working**
- Check DNS records are correct
- Wait 24-48 hours for DNS propagation
- Verify in domain provider settings

---

## 🎯 Quick Command Reference

```bash
# Development
npm run dev              # Run locally at localhost:3000
npm run build           # Build for production
npm run start           # Run production build locally

# Git
git add .               # Stage all changes
git commit -m "msg"     # Commit with message
git push origin main    # Push to GitHub (triggers deploy)

# Vercel CLI (optional)
vercel                  # Deploy preview
vercel --prod          # Deploy to production
vercel logs            # View deployment logs
```

---

## 📊 Performance Tips

### Already Optimized:
✅ Next.js Image optimization
✅ Automatic code splitting
✅ Static generation where possible
✅ Responsive images
✅ Font optimization

### Additional Optimizations:
1. **Compress images** before uploading (use TinyPNG)
2. **Lazy load** images below the fold
3. **Cache** static assets
4. **Minify** CSS/JS (automatic in production)

---

## 🔒 Security

Already configured:
✅ HTTPS enabled by default
✅ Security headers in next.config.js
✅ Environment variables hidden
✅ No exposed API keys

---

## 💰 Vercel Pricing

**Free Tier Includes:**
- Unlimited deployments
- Automatic HTTPS
- Custom domain
- 100 GB bandwidth/month
- Serverless functions

**Your site will fit in FREE tier!**

Only upgrade if you get:
- 100GB+ traffic/month
- Need team collaboration
- Want more build minutes

---

## 📞 Support

**Vercel Support:**
- Documentation: https://vercel.com/docs
- Discord: https://vercel.com/discord
- Email: support@vercel.com

**Next.js Support:**
- Documentation: https://nextjs.org/docs
- GitHub: https://github.com/vercel/next.js

---

## ✅ Final Checklist

Before going live:

- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Custom domain configured (if applicable)
- [ ] All URLs updated with actual domain
- [ ] Google Search Console set up
- [ ] Google My Business created
- [ ] All pages tested
- [ ] Mobile responsive checked
- [ ] Page speed tested
- [ ] SEO meta tags verified

---

## 🎉 You're Live!

Your website is now:
- ✅ Deployed on Vercel's global CDN
- ✅ Auto-scaling and super fast
- ✅ Auto-deploying on every push
- ✅ Fully SEO optimized
- ✅ Mobile responsive
- ✅ Secure with HTTPS

**Congratulations!** 🚀

Share your site:
- Your live URL: `https://your-domain.com`
- Social media ready
- Google search ready (after indexing)

---

## 📈 Next Steps

1. **Monitor traffic**: Set up Google Analytics
2. **Get reviews**: Ask students to leave Google reviews
3. **Content marketing**: Keep blog updated
4. **Social media**: Share blog posts
5. **Track rankings**: Monitor keyword positions
6. **A/B testing**: Test different CTAs
7. **Email marketing**: Collect leads via contact form

**Good luck with your training business!** 💪

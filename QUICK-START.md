# 🚀 Quick Start - Deploy to Vercel in 10 Minutes

## Step 1: Create GitHub Account (if you don't have one)
1. Go to https://github.com
2. Sign up for free

## Step 2: Install Git (if not installed)
**Mac:**
```bash
# Git is usually pre-installed
git --version
```

**Windows:**
- Download from: https://git-scm.com/download/win

## Step 3: Push Your Code to GitHub

Open Terminal and run:

```bash
# Navigate to your project
cd /Users/laptop/Desktop/safecert

# Initialize Git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - SafeCert Skills website"
```

Now create a GitHub repository:
1. Go to https://github.com/new
2. Repository name: `safecert-skills`
3. Click "Create repository"

Then push your code:
```bash
# Replace YOUR-USERNAME with your GitHub username
git remote add origin https://github.com/YOUR-USERNAME/safecert-skills.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

1. **Go to Vercel**
   - Visit: https://vercel.com
   - Click "Sign Up" or "Login"
   - Use your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Find your `safecert-skills` repository
   - Click "Import"

3. **Deploy**
   - Click "Deploy" (all settings are auto-configured!)
   - Wait 2-3 minutes

4. **Done!** 🎉
   - You'll get a URL like: `https://safecert-skills.vercel.app`
   - Click "Visit" to see your live site

## Step 5: Update URLs

After deployment, update your domain in these files:

**Find & Replace All:**
- Find: `https://safecertskills.co.uk`
- Replace with: `https://safecert-skills.vercel.app` (or your actual domain)

**Files to update:**
- `app/layout.tsx`
- `app/page.tsx`
- `app/sitemap.ts`
- `app/robots.ts`
- `app/courses/layout.tsx`
- `app/contact/layout.tsx`
- `app/faqs/layout.tsx`
- `app/blog/layout.tsx`

Then push changes:
```bash
git add .
git commit -m "Update URLs"
git push origin main
```

Vercel will auto-deploy in 2 minutes!

## Step 6: Add Custom Domain (Optional)

If you have a domain like `safecertskills.co.uk`:

1. In Vercel dashboard → Settings → Domains
2. Add your domain
3. Update DNS at your domain provider:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com
4. Wait 24-48 hours

## 🎉 That's It!

Your site is now:
- ✅ Live on the internet
- ✅ Auto-deploys on every push to GitHub
- ✅ HTTPS enabled
- ✅ Super fast global CDN

## Future Updates

To update your site:
```bash
# Make changes in your code
# Then:
git add .
git commit -m "Your changes"
git push origin main
```

Vercel auto-deploys in 2-3 minutes!

---

**Need detailed instructions?** See `DEPLOYMENT-GUIDE.md`

**Questions?** Check Vercel docs: https://vercel.com/docs

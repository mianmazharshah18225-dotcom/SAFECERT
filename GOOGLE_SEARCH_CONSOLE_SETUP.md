# Google Search Console Setup Guide for SafeCert Skills Ltd

## Step 1: Add Your Site to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Click **"Add Property"**
3. Choose **"URL prefix"** and enter: `https://safecertskill.co.uk`
4. Click **Continue**

## Step 2: Verify Your Website Ownership

### Method 1: HTML File Upload (Recommended)
1. Google will provide you with an HTML file (e.g., `google1234567890abcdef.html`)
2. Download the file
3. Upload it to your Vercel deployment:
   - Create a folder: `/public/` in your project root (if it doesn't exist)
   - Place the HTML file in `/public/`
   - Commit and push to GitHub
   - Vercel will automatically deploy
4. Click **"Verify"** in Google Search Console

### Method 2: HTML Meta Tag
1. Google will provide a meta tag like:
   ```html
   <meta name="google-site-verification" content="your-verification-code-here" />
   ```
2. Copy the **verification code** (the part after `content="` and before the closing `"`)
3. Open `/app/layout.tsx`
4. Find the line:
   ```typescript
   google: 'your-google-verification-code',
   ```
5. Replace `'your-google-verification-code'` with your actual code
6. Save, commit, and push to GitHub
7. Wait for Vercel to deploy (about 1-2 minutes)
8. Click **"Verify"** in Google Search Console

### Method 3: DNS Verification (If using Vercel DNS)
1. Google will provide a TXT record
2. Go to your domain provider (Hostinger or Vercel DNS)
3. Add the TXT record provided by Google
4. Wait 24-48 hours for DNS propagation
5. Click **"Verify"** in Google Search Console

## Step 3: Submit Your Sitemap

1. After verification, go to **"Sitemaps"** in the left menu
2. Enter: `sitemap.xml`
3. Click **"Submit"**
4. Google will start crawling your site

Your sitemap URL is: `https://safecertskill.co.uk/sitemap.xml`

## Step 4: Request Indexing for Important Pages

1. Go to **"URL Inspection"** in the left menu
2. Enter URLs one by one and click **"Request Indexing"**:
   - `https://safecertskill.co.uk`
   - `https://safecertskill.co.uk/courses`
   - `https://safecertskill.co.uk/courses/first-aid`
   - `https://safecertskill.co.uk/courses/food-hygiene`
   - `https://safecertskill.co.uk/courses/health-safety`
   - `https://safecertskill.co.uk/contact`
   - `https://safecertskill.co.uk/about`

## Step 5: Set Up Additional SEO Tools

### Google Analytics (Optional but Recommended)
1. Go to [Google Analytics](https://analytics.google.com)
2. Create a new property for `safecertskill.co.uk`
3. Get your **Measurement ID** (looks like `G-XXXXXXXXXX`)
4. Add Google Analytics to your site:
   - Install package: `npm install @next/third-parties`
   - Add to `/app/layout.tsx` (see code below)

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Click **"Add a site"**
3. Enter: `https://safecertskill.co.uk`
4. Import settings from Google Search Console (easiest method)
5. Or verify using meta tag (similar to Google)

## Step 6: Monitor Your SEO Performance

### Key Metrics to Track in Google Search Console:
- **Performance**: Track clicks, impressions, CTR, and average position
- **Coverage**: Check for indexing errors
- **Enhancements**: Monitor Core Web Vitals
- **Links**: See who's linking to your site

### Expected Timeline:
- **Day 1-3**: Google starts crawling your site
- **Week 1**: First pages appear in search results
- **Week 2-4**: More pages get indexed
- **Month 1-3**: Rankings start to improve
- **Month 3-6**: See significant traffic growth

## Step 7: SEO Best Practices for Your Content

### On-Page SEO Checklist:
- ✅ Unique title tags (done)
- ✅ Meta descriptions (done)
- ✅ Heading structure (H1, H2, H3)
- ✅ Alt text for images
- ✅ Internal linking
- ✅ Mobile-friendly design
- ✅ Fast page speed
- ✅ HTTPS enabled

### Content Strategy:
1. **Blog regularly** about training topics
2. **Add location pages** for nearby cities (if you serve them)
3. **Customer reviews** (you have this!)
4. **Course details** with pricing and schedules
5. **FAQ sections** (you have this!)

## Step 8: Local SEO for Luton

### Google Business Profile (Essential!)
1. Go to [Google Business Profile](https://business.google.com)
2. Create a profile for "SafeCert Skills Ltd"
3. Fill in all details:
   - **Category**: Training Centre / Educational Institution
   - **Address**: Your Luton address
   - **Phone**: 0800 123 4567
   - **Website**: https://safecertskill.co.uk
   - **Hours**: 8am-6pm (based on your course times)
   - **Services**: First Aid, Food Hygiene, Health & Safety
4. Verify your business (Google will send a postcard with a code)
5. Add photos of your facility, certificates, students (with permission)

### Local Citations (Helps Local SEO):
- Yell.com
- Thomson Local
- Scoot
- 192.com
- Yelp UK

## Monitoring and Maintenance

### Weekly Tasks:
- Check Google Search Console for errors
- Monitor search rankings
- Respond to reviews

### Monthly Tasks:
- Review analytics data
- Update content
- Check for broken links
- Monitor competitors

### Quarterly Tasks:
- Content audit
- SEO strategy review
- Update course information

## Current SEO Status

### ✅ Already Implemented:
- XML Sitemap
- Robots.txt
- Meta tags (title, description)
- OpenGraph tags (Facebook sharing)
- Twitter Card tags
- Canonical URLs
- Structured data (Organization schema)
- Mobile responsive design
- HTTPS enabled

### 🔄 Need to Complete:
1. Replace `'your-google-verification-code'` with actual code
2. Verify in Google Search Console
3. Submit sitemap
4. Create Google Business Profile
5. Request indexing for key pages

## Troubleshooting

### "Site not indexed yet"
- Wait 3-7 days after submitting sitemap
- Request indexing manually for important pages
- Check Coverage report for errors

### "Coverage errors"
- Check robots.txt isn't blocking pages
- Ensure pages return 200 status codes
- Fix any broken links

### "Mobile usability issues"
- Your site is already mobile-responsive
- Test on [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

## Support Resources

- [Google Search Console Help](https://support.google.com/webmasters)
- [Google SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Next.js SEO Documentation](https://nextjs.org/learn/seo/introduction-to-seo)

---

**Questions?** Contact your developer or email support@safecertskill.co.uk

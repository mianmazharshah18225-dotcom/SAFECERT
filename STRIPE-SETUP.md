# Stripe Payment Integration - Setup Guide (TEST MODE)

## 🎯 Overview

Your SafeCert Skills website now has Stripe payment integration in **TEST MODE**. This allows you to test the complete payment flow without processing real payments.

---

## 📋 What's Been Implemented

✅ **Stripe Server SDK** - Backend payment processing
✅ **Stripe Client SDK** - Frontend checkout experience
✅ **Checkout Page** - Beautiful enrollment page with course details
✅ **API Routes** - Secure payment session creation
✅ **Webhook Handler** - Payment verification endpoint
✅ **Success Page** - Post-payment confirmation page
✅ **Enroll Buttons** - Added to all course cards and pages

---

## 🚀 Step 1: Get Your Stripe Test API Keys

### 1.1 Create Stripe Account (if you don't have one)
1. Go to https://stripe.com
2. Click "Sign up" (it's free!)
3. Complete registration

### 1.2 Get Test API Keys
1. Log in to Stripe Dashboard: https://dashboard.stripe.com
2. Make sure you're in **TEST MODE** (toggle in the left sidebar should say "Test mode")
3. Go to **Developers** → **API keys**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)

5. Copy both keys - you'll need them next!

---

## 🔑 Step 2: Add API Keys to Your Project

### Option A: Local Development

1. Create a `.env.local` file in your project root:
   ```bash
   cd /Users/laptop/Desktop/safecert
   touch .env.local
   ```

2. Open `.env.local` and add your keys:
   ```bash
   # Stripe Test Mode Keys
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_PUBLISHABLE_KEY_HERE
   STRIPE_SECRET_KEY=sk_test_YOUR_SECRET_KEY_HERE
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
   ```

3. Replace `YOUR_PUBLISHABLE_KEY_HERE` and `YOUR_SECRET_KEY_HERE` with your actual keys from Stripe

### Option B: Vercel Deployment

1. Go to your Vercel dashboard: https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these three variables:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` |
   | `STRIPE_SECRET_KEY` | `sk_test_...` |
   | `STRIPE_WEBHOOK_SECRET` | Leave empty for now |

5. Click "Save"
6. Redeploy your site for changes to take effect

---

## 🔔 Step 3: Set Up Webhook (Optional but Recommended)

Webhooks allow Stripe to notify your site when payments succeed or fail.

### 3.1 Local Testing with Stripe CLI

1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe

   # Or download from: https://github.com/stripe/stripe-cli/releases
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. You'll see a webhook signing secret (starts with `whsec_`)
5. Add it to your `.env.local`:
   ```bash
   STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
   ```

### 3.2 Production Webhooks (Vercel)

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)
7. Add it to Vercel environment variables (Step 2B)

---

## 🧪 Step 4: Test the Payment Flow

### 4.1 Start Your Development Server
```bash
cd /Users/laptop/Desktop/safecert
npm run dev
```

### 4.2 Test Enrollment Flow

1. Open http://localhost:3000
2. Browse to any course
3. Click **"Enroll Now"** button
4. You'll be taken to the checkout page
5. Review course details and pricing
6. Click **"Proceed to Payment"**
7. You'll be redirected to Stripe's checkout page

### 4.3 Use Test Cards

On Stripe's checkout page, use these **test card numbers**:

| Card Type | Number | Result |
|-----------|--------|--------|
| Success | `4242 4242 4242 4242` | Payment succeeds |
| Declined | `4000 0000 0000 0002` | Card declined |
| Insufficient Funds | `4000 0000 0000 9995` | Insufficient funds |
| Expired Card | `4000 0000 0000 0069` | Expired card error |

**Other test details:**
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- Postal Code: Any 5 digits (e.g., `12345`)

### 4.4 Verify Success

After successful payment:
1. You'll be redirected to `/success` page
2. You'll see a confirmation message
3. Check your Stripe Dashboard to see the test payment

---

## 📂 File Structure

Here's what was added to your project:

```
safecert/
├── lib/
│   └── stripe.ts                              # Stripe initialization & helpers
├── app/
│   ├── api/
│   │   ├── create-checkout-session/
│   │   │   └── route.ts                       # Creates Stripe checkout session
│   │   └── webhooks/
│   │       └── stripe/
│   │           └── route.ts                   # Handles Stripe webhooks
│   ├── checkout/
│   │   └── page.tsx                           # Enrollment checkout page
│   └── success/
│       └── page.tsx                           # Payment success page
├── components/
│   └── PopularCourses.tsx                     # Updated with Enroll buttons
└── .env.example                               # Environment variables template
```

---

## 🔧 How It Works

### Payment Flow:

1. **User clicks "Enroll Now"**
   - Redirects to `/checkout?course=first-aid`

2. **Checkout Page**
   - Displays course details, pricing, features
   - User clicks "Proceed to Payment"

3. **Create Checkout Session**
   - Frontend calls `/api/create-checkout-session`
   - Backend creates a Stripe checkout session
   - Returns session ID

4. **Redirect to Stripe**
   - User is redirected to Stripe's secure checkout page
   - User enters card details

5. **Payment Processing**
   - Stripe processes the payment
   - If successful: redirect to `/success`
   - If failed: redirect to `/courses`

6. **Webhook (Optional)**
   - Stripe sends webhook to `/api/webhooks/stripe`
   - Your backend verifies and processes the event
   - You can send confirmation emails, update database, etc.

---

## 💰 Pricing Configuration

Courses are configured in `lib/data.ts`:

```typescript
export const COURSES = [
  {
    id: 'first-aid',
    title: 'First Aid Training',
    price: '£1,200',           // Display price
    originalPrice: '£1,500',   // Original price (for discount)
    // ... other fields
  },
  // ... more courses
]
```

The checkout API automatically extracts the price and sends it to Stripe in pence (£1,200 → 120,000 pence).

---

## 🚨 Important Security Notes

### DO NOT:
- ❌ Commit `.env.local` to Git (it's already in `.gitignore`)
- ❌ Share your secret keys publicly
- ❌ Use test keys in production

### DO:
- ✅ Keep secret keys secure
- ✅ Use environment variables
- ✅ Verify webhook signatures
- ✅ Test thoroughly before going live

---

## 🎯 Going Live (Switching to Production)

When you're ready to accept real payments:

### 1. Get Production API Keys
1. In Stripe Dashboard, switch to **LIVE MODE**
2. Go to **Developers** → **API keys**
3. Copy your production keys (start with `pk_live_` and `sk_live_`)

### 2. Update Environment Variables
1. In Vercel: Update environment variables with production keys
2. Restart/redeploy your site

### 3. Activate Your Stripe Account
1. Complete Stripe's onboarding process
2. Provide business details
3. Verify your identity
4. Add bank account for payouts

### 4. Update Webhook URL
1. Add production webhook endpoint in Stripe
2. Copy production webhook secret
3. Add to Vercel environment variables

### 5. Remove Test Mode Notice
1. Edit `/app/checkout/page.tsx`
2. Remove this line (around line 110):
   ```tsx
   <p className="text-xs text-gray-500 text-center mt-4">
     Secure payment powered by Stripe • Test Mode
   </p>
   ```
3. Replace with:
   ```tsx
   <p className="text-xs text-gray-500 text-center mt-4">
     Secure payment powered by Stripe
   </p>
   ```

---

## 🐛 Troubleshooting

### "Invalid API Key" Error
- Make sure you're using the correct key format
- Check you've added keys to `.env.local` (local) or Vercel (production)
- Restart your dev server after adding keys

### "Publishable key not found" Error
- Ensure `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` starts with `NEXT_PUBLIC_`
- Public environment variables must have this prefix in Next.js

### Webhook Not Working
- Check webhook secret is correct
- Ensure webhook URL is accessible
- Test with `stripe listen` CLI for local development

### Payment Not Showing in Dashboard
- Make sure you're in **Test Mode** in Stripe Dashboard
- Look under **Payments** tab
- Check the filters (date range, status)

---

## 📊 Testing Checklist

Before going live, test these scenarios:

- [ ] Successful payment with `4242 4242 4242 4242`
- [ ] Declined card with `4000 0000 0000 0002`
- [ ] Course details display correctly on checkout
- [ ] Pricing is accurate (matches course price)
- [ ] Success page shows after payment
- [ ] Webhook receives `checkout.session.completed` event
- [ ] Mobile responsive on checkout page
- [ ] All three courses can be enrolled

---

## 📞 Support

**Stripe Documentation:**
- Getting Started: https://stripe.com/docs
- Testing: https://stripe.com/docs/testing
- Checkout: https://stripe.com/docs/payments/checkout

**Stripe Support:**
- Email: support@stripe.com
- Chat: Available in dashboard

**Your Implementation:**
- All Stripe code is in `lib/stripe.ts` and `app/api/` routes
- Checkout page: `app/checkout/page.tsx`
- Success page: `app/success/page.tsx`

---

## 🎉 You're All Set!

Your website now has a complete payment system. Test it thoroughly with the test cards above, then when you're ready, switch to production keys to start accepting real payments!

**Test Mode Features:**
- ✅ No real money processed
- ✅ Test with fake card numbers
- ✅ See payments in test dashboard
- ✅ Safe to test unlimited times

**Good luck with SafeCert Skills!** 🚀

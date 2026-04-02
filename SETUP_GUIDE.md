# 🚀 SafeCert Skills - Complete Backend Setup Guide

## ✅ IMPLEMENTATION COMPLETE!

All backend features have been successfully implemented:

- ✅ Student enrollment & management
- ✅ User authentication (login/signup)
- ✅ Course progress tracking
- ✅ PostgreSQL database (Prisma ORM)
- ✅ Admin dashboard (manage students, courses, enrollments)
- ✅ Email notifications (Resend)
- ✅ Stripe webhook handling
- ✅ Student profile/dashboard

---

## 📋 STEP 1: Connect to Neon Database

You've already created a Neon database! Now let's connect it to your app.

### 1.1 Copy Your Neon Connection String

From your screenshot, your connection string is:
```
postgresql://neondb_owner:npg_15tkVCDmjOTf@ep-wandering-tooth-am52lwfk.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require
```

### 1.2 Create `.env.local` File

Create a file named `.env.local` in your project root:

```bash
# Neon PostgreSQL Database
DATABASE_URL="postgresql://neondb_owner:npg_15tkVCDmjOTf@ep-wandering-tooth-am52lwfk.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"

# Stripe (Already in your .env.example - copy your actual keys here)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_actual_key"
STRIPE_SECRET_KEY="sk_test_your_actual_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"

# Resend Email Service (Sign up at resend.com)
RESEND_API_KEY="re_your_resend_api_key"
FROM_EMAIL="noreply@safecertskills.co.uk"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 1.3 Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and replace `your-super-secret-key-change-this-in-production` with it.

---

## 📋 STEP 2: Set Up Resend (Email Service)

### 2.1 Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Click "Sign Up" (it's free!)
3. Verify your email

### 2.2 Get API Key

1. After logging in, go to **API Keys**
2. Click **Create API Key**
3. Name it "SafeCert Skills"
4. Copy the API key
5. Add it to your `.env.local`:
   ```
   RESEND_API_KEY="re_xxxxxxxxxxxxxx"
   ```

### 2.3 Verify Domain (Optional - for production)

For now, you can use the default sending domain. When you're ready for production, you'll need to verify your domain.

---

## 📋 STEP 3: Push Database Schema to Neon

This creates all the tables in your Neon database:

```bash
npm run db:push
```

You should see output like:
```
✔ Generated Prisma Client
✔ Database synced
```

---

## 📋 STEP 4: Create Admin Account

Run this command to create your admin account:

```bash
npm run db:seed
```

This creates an admin user with:
- **Email**: `mianmazharshah18225@gmail.com`
- **Password**: `1234`

---

## 📋 STEP 5: Run Your Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎯 TEST YOUR APPLICATION

### Test 1: Admin Login

1. Go to [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
2. Login with:
   - Email: `mianmazharshah18225@gmail.com`
   - Password: `1234`
3. You should be redirected to `/dashboard`
4. Go to [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin panel

### Test 2: Create a Student Account

1. Go to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Create a new student account
3. Check your email for the welcome message (if Resend is set up)

### Test 3: Enroll in a Course

1. As a student, go to [http://localhost:3000/courses](http://localhost:3000/courses)
2. Click "Enroll Now" on any course
3. You'll be asked to login (if not logged in)
4. Complete the Stripe checkout (use test card: `4242 4242 4242 4242`)
5. After payment, you should see the course in your dashboard

### Test 4: Admin Panel

1. Login as admin (`mianmazharshah18225@gmail.com`)
2. Go to [http://localhost:3000/admin](http://localhost:3000/admin)
3. You can:
   - View all students
   - Manage enrollments (change status, cancel, complete)
   - View revenue and statistics
   - Delete students

---

## 📊 View Your Database (Optional)

To see your database in a visual interface:

```bash
npm run db:studio
```

This opens Prisma Studio at [http://localhost:5555](http://localhost:5555) where you can view and edit your data.

---

## 🔗 API Routes Created

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/[...nextauth]` - NextAuth endpoints (login, logout)

### Enrollments
- `GET /api/enrollments` - Get user's enrollments
- `POST /api/enrollments` - Create enrollment

### Progress
- `GET /api/progress?courseId=xxx` - Get course progress
- `PUT /api/progress` - Update progress

### Stripe
- `POST /api/create-checkout-session` - Create Stripe checkout
- `POST /api/webhooks/stripe` - Handle Stripe webhooks

### Admin Routes
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/students` - Get all students
- `DELETE /api/admin/students?id=xxx` - Delete student
- `GET /api/admin/enrollments` - Get all enrollments
- `PUT /api/admin/enrollments` - Update enrollment status
- `DELETE /api/admin/enrollments?id=xxx` - Delete enrollment

---

## 🎨 Pages Created

### Public Pages
- `/` - Homepage
- `/courses` - Course listing
- `/auth/signin` - Login page
- `/auth/signup` - Registration page

### Student Pages
- `/dashboard` - Student dashboard (view enrolled courses, progress)
- `/checkout?course=xxx` - Course checkout page

### Admin Pages
- `/admin` - Admin dashboard (manage everything)

---

## 🔐 Environment Variables Summary

Make sure your `.env.local` has all these variables:

```env
DATABASE_URL="postgresql://..."           # From Neon
NEXTAUTH_SECRET="..."                     # Generate with openssl
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
FROM_EMAIL="noreply@safecertskills.co.uk"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

---

## 🚨 Troubleshooting

### Error: "Prisma Client not generated"
```bash
npx prisma generate
```

### Error: "Can't reach database server"
- Check your DATABASE_URL in `.env.local`
- Make sure Neon database is running

### Error: "Invalid API key" (Resend)
- Check your RESEND_API_KEY in `.env.local`
- Create a new API key at resend.com

### Stripe Webhook Not Working
For local development, you need to use Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

---

## 📦 Database Schema

Your database has these tables:

- **users** - All users (students, admins, trainers)
- **courses** - Course catalog
- **enrollments** - Links students to courses
- **payments** - Payment records from Stripe
- **progress** - Track student progress in courses
- **email_logs** - Email sending history

---

## 🎉 YOU'RE READY!

Your complete backend is now set up with:

✅ Database connected to Neon
✅ Authentication working
✅ Admin panel functional
✅ Email notifications configured
✅ Stripe payments integrated
✅ Student & admin dashboards

**Admin Login:**
- Email: `mianmazharshah18225@gmail.com`
- Password: `1234`

Go to [http://localhost:3000/admin](http://localhost:3000/admin) after logging in!

---

## 📚 Next Steps

1. **Test Stripe Webhooks**: Set up Stripe CLI for local testing
2. **Customize Courses**: Update the course data in `lib/data.ts` or move to database
3. **Add More Features**: Course content, video lessons, quizzes, etc.
4. **Deploy to Production**: Deploy to Vercel and update environment variables

---

## 💡 Need Help?

- **Prisma Docs**: https://www.prisma.io/docs
- **NextAuth Docs**: https://next-auth.js.org
- **Resend Docs**: https://resend.com/docs
- **Neon Docs**: https://neon.tech/docs

---

**Happy Coding! 🚀**

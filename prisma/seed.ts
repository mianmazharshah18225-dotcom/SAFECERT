import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'
import bcrypt from 'bcryptjs'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const connectionString = process.env.DATABASE_URL!

const pool = new Pool({ connectionString })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Starting database seed...')

  // Create/Update admin user
  const hashedPassword = await bcrypt.hash('1234', 10)

  const admin = await prisma.user.upsert({
    where: { email: 'mianmazharshah18225@gmail.com' },
    update: {
      password: hashedPassword, // Update password if user exists
      role: 'ADMIN',
    },
    create: {
      email: 'mianmazharshah18225@gmail.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created/updated:', admin.email)

  // Seed courses
  const courses = [
    {
      id: 'first-aid',
      slug: 'first-aid',
      title: 'First Aid Training',
      description: 'Comprehensive first aid training course. Learn essential life-saving skills including CPR, emergency response, and patient care. Perfect for those seeking a career in healthcare or emergency services.',
      price: 1200,
      originalPrice: 1500,
      duration: '1 Day
      level: 'Level 3',
      icon: '🏥',
      image: 'https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=800&q=80',
      features: ['CPR & AED Training', 'Emergency Response', 'Patient Care', 'Wound Management', 'Nationally Recognised Certificate'],
    },
    {
      id: 'food-hygiene',
      slug: 'food-hygiene',
      title: 'Food & Hygiene',
      description: 'Professional food safety and hygiene certification. Learn food handling, safety regulations, and hygiene standards essential for working in the food industry.',
      price: 1100,
      originalPrice: 1400,
      duration: '1 Day',
      level: 'Level 2',
      icon: '🍽️',
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80',
      features: ['Food Safety Standards', 'Hygiene Practices', 'HACCP Principles', 'Allergen Awareness', 'Industry Recognised Certificate'],
    },
    {
      id: 'health-safety',
      slug: 'health-safety',
      title: 'Health & Safety',
      description: 'Complete health and safety training program. Master workplace safety, risk assessment, and safety management to become a qualified health and safety professional.',
      price: 1150,
      originalPrice: 1450,
      duration: '1 Day',
      level: 'Level 3',
      icon: '⚠️',
      image: 'https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80',
      features: ['Risk Assessment', 'Safety Management', 'Accident Investigation', 'Legal Compliance', 'Professional Certification'],
    },
  ]

  for (const courseData of courses) {
    await prisma.course.upsert({
      where: { id: courseData.id },
      update: courseData,
      create: courseData,
    })
    console.log('✅ Course created/updated:', courseData.title)
  }

  console.log('✅ Database seeded successfully!')
  await pool.end()
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

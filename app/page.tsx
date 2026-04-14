import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import CategoryCards from '@/components/CategoryCards'
import PopularCourses from '@/components/PopularCourses'
import HowItWorks from '@/components/HowItWorks'
import StatsBar from '@/components/StatsBar'
import Testimonials from '@/components/Testimonials'
import TrustBar from '@/components/TrustBar'
import CTASection from '@/components/CTASection'
import LocationsStrip from '@/components/LocationsStrip'
import TrainersSection from '@/components/TrainersSection'
import FAQSection from '@/components/FAQSection'

export const metadata: Metadata = {
  title: 'SafeCert Skills Ltd | First Aid, Food Hygiene & Health Safety Training in Luton',
  description: 'Professional training courses in Luton. First Aid (Level 3), Food & Hygiene (Level 2), Health & Safety (Level 3). 1 Day programs, 8am-6pm daily. 98% pass rate. Book now!',
  alternates: {
    canonical: 'https://safecertskill.co.uk',
  },
  openGraph: {
    title: 'SafeCert Skills Ltd | Professional Training Courses in Luton',
    description: 'Get certified in First Aid, Food Hygiene & Health Safety. 1 Day courses in Luton with 98% pass rate.',
    url: 'https://safecertskill.co.uk',
    images: [
      {
        url: 'https://safecertskill.co.uk/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SafeCert Skills Ltd Training Courses',
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'EducationalOrganization',
            name: 'SafeCert Skills Ltd',
            description: 'Professional training provider offering First Aid, Food Hygiene, and Health & Safety courses in Luton',
            url: 'https://safecertskill.co.uk',
            telephone: '+44-7918-428115',
            email: 'info@safecertskill.co.uk',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Luton',
              addressCountry: 'GB',
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '12847',
            },
          }),
        }}
      />
      <Hero />
      <TrustBar />
      <CategoryCards />
      <StatsBar />
      <PopularCourses />
      <HowItWorks />
      <LocationsStrip />
      <TrainersSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  )
}

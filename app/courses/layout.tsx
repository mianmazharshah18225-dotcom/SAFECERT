import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Training Courses in Luton | First Aid, Food Hygiene & Health Safety | SafeCert',
  description: 'Browse our professional training courses in Luton: First Aid (Level 3), Food & Hygiene (Level 2), Health & Safety (Level 3). Accredited certifications, 1.5 year programs. Book today!',
  keywords: 'training courses Luton, first aid course, food hygiene training, health safety certification, professional courses UK, accredited training',
  alternates: {
    canonical: 'https://safecertskills.co.uk/courses',
  },
  openGraph: {
    title: 'Training Courses in Luton | SafeCert Skills Ltd',
    description: 'Professional First Aid, Food Hygiene & Health Safety courses. Get certified in 1.5 years.',
    url: 'https://safecertskills.co.uk/courses',
  },
}

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: [
              {
                '@type': 'Course',
                name: 'First Aid Training',
                description: 'Comprehensive first aid training course including CPR, emergency response, and patient care',
                provider: {
                  '@type': 'EducationalOrganization',
                  name: 'SafeCert Skills Ltd',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Luton',
                    addressCountry: 'GB',
                  },
                },
                hasCourseInstance: {
                  '@type': 'CourseInstance',
                  courseMode: 'onsite',
                  duration: 'P18M',
                  courseSchedule: {
                    '@type': 'Schedule',
                    repeatFrequency: 'Daily',
                    startTime: '08:00',
                    endTime: '18:00',
                  },
                },
                offers: {
                  '@type': 'Offer',
                  price: '1200',
                  priceCurrency: 'GBP',
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'Course',
                name: 'Food & Hygiene',
                description: 'Professional food safety and hygiene certification covering food handling and safety regulations',
                provider: {
                  '@type': 'EducationalOrganization',
                  name: 'SafeCert Skills Ltd',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Luton',
                    addressCountry: 'GB',
                  },
                },
                hasCourseInstance: {
                  '@type': 'CourseInstance',
                  courseMode: 'onsite',
                  duration: 'P18M',
                  courseSchedule: {
                    '@type': 'Schedule',
                    repeatFrequency: 'Daily',
                    startTime: '08:00',
                    endTime: '18:00',
                  },
                },
                offers: {
                  '@type': 'Offer',
                  price: '1100',
                  priceCurrency: 'GBP',
                  availability: 'https://schema.org/InStock',
                },
              },
              {
                '@type': 'Course',
                name: 'Health & Safety',
                description: 'Complete health and safety training covering workplace safety and risk assessment',
                provider: {
                  '@type': 'EducationalOrganization',
                  name: 'SafeCert Skills Ltd',
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: 'Luton',
                    addressCountry: 'GB',
                  },
                },
                hasCourseInstance: {
                  '@type': 'CourseInstance',
                  courseMode: 'onsite',
                  duration: 'P18M',
                  courseSchedule: {
                    '@type': 'Schedule',
                    repeatFrequency: 'Daily',
                    startTime: '08:00',
                    endTime: '18:00',
                  },
                },
                offers: {
                  '@type': 'Offer',
                  price: '1150',
                  priceCurrency: 'GBP',
                  availability: 'https://schema.org/InStock',
                },
              },
            ],
          }),
        }}
      />
      {children}
    </>
  )
}

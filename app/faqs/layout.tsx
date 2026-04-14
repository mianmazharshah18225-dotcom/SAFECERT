import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQs | Frequently Asked Questions | SafeCert Skills Ltd',
  description: 'Common questions about our First Aid, Food Hygiene & Health Safety courses in Luton. Duration, pricing, certification, career opportunities and more.',
  keywords: 'training FAQs, course questions, first aid FAQ, food hygiene questions, health safety info',
  alternates: {
    canonical: 'https://safecertskill.co.uk/faqs',
  },
  openGraph: {
    title: 'FAQs | SafeCert Skills Ltd',
    description: 'Find answers to common questions about our training courses in Luton',
    url: 'https://safecertskill.co.uk/faqs',
  },
}

export default function FAQsLayout({
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
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Do I need any previous experience to enrol?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No prior experience is needed for any of our courses. Our First Aid, Food & Hygiene, and Health & Safety courses are open to anyone aged 18+ who wants to develop professional skills.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does training take?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'All our courses run for 1 Days with classes scheduled from 8:00 AM to 6:00 PM at our Luton training centre.',
                },
              },
              {
                '@type': 'Question',
                name: 'Are your courses accredited?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. All our courses are nationally accredited and recognised by employers across the UK. You will receive professional certification upon completion.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do you offer payment plans?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes! We offer flexible payment plans including monthly instalments for all courses. Contact us to discuss your options.',
                },
              },
              {
                '@type': 'Question',
                name: 'Where is your training centre located?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our training centre is located in Luton, United Kingdom. Classes run from 8:00 AM to 6:00 PM.',
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

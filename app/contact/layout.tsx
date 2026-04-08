import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | SafeCert Skills Ltd | Training Centre in Luton',
  description: 'Contact SafeCert Skills Ltd in Luton for First Aid, Food Hygiene & Health Safety training. Call 0800 123 4567 or email info@safecertskill.co.uk. Open Mon-Sat 8am-8pm.',
  keywords: 'contact SafeCert, training centre Luton, course enquiries, booking information',
  alternates: {
    canonical: 'https://safecertskill.co.uk/contact',
  },
  openGraph: {
    title: 'Contact SafeCert Skills Ltd | Luton Training Centre',
    description: 'Get in touch with our team in Luton. Phone, email, or visit us for course enquiries.',
    url: 'https://safecertskill.co.uk/contact',
  },
}

export default function ContactLayout({
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
            '@type': 'ContactPage',
            mainEntity: {
              '@type': 'EducationalOrganization',
              name: 'SafeCert Skills Ltd',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Luton',
                addressCountry: 'GB',
              },
              telephone: '+44-800-123-4567',
              email: 'info@safecertskill.co.uk',
              openingHours: 'Mo-Sa 08:00-20:00',
            },
          }),
        }}
      />
      {children}
    </>
  )
}

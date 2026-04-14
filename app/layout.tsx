import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata: Metadata = {
  metadataBase: new URL('https://safecertskill.co.uk'),
  title: {
    default: 'SafeCert Skills Ltd – Professional Training in Luton | First Aid, Food Hygiene & Health Safety',
    template: '%s | SafeCert Skills Ltd'
  },
  description: 'Professional training courses in Luton. Get certified in First Aid, Food & Hygiene, and Health & Safety. 1 Day courses, 8am-6pm. 98% pass rate. Enrol today!',
  keywords: [
    'first aid training Luton',
    'food hygiene course Luton',
    'health and safety training Luton',
    'first aid certification UK',
    'food safety training',
    'health safety course',
    'professional training Luton',
    'CPR training',
    'emergency first aid',
    'food handler certification',
    'HACCP training',
    'workplace safety training',
    'risk assessment course',
    'SafeCert Skills',
    'training courses Luton',
    'accredited training UK',
    'SIA approved training',
    'BTEC accredited courses',
    'Luton training provider',
    'career training UK',
  ].join(', '),
  authors: [{ name: 'SafeCert Skills Ltd', url: 'https://safecertskill.co.uk' }],
  creator: 'SafeCert Skills Ltd',
  publisher: 'SafeCert Skills Ltd',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SafeCert Skills Ltd – Professional Training in Luton',
    description: 'Professional First Aid, Food Hygiene & Health Safety training courses in Luton. Get certified in 1 Day.',
    type: 'website',
    locale: 'en_GB',
    url: 'https://safecertskill.co.uk',
    siteName: 'SafeCert Skills Ltd',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SafeCert Skills Ltd - Professional Training Courses in Luton',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeCert Skills Ltd – Professional Training in Luton',
    description: 'First Aid, Food Hygiene & Health Safety training courses in Luton',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '3283144d5654ff69', // Google Search Console verification
  },
  alternates: {
    canonical: 'https://safecertskill.co.uk',
  },
  category: 'education',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">
        <Providers>
          <Navbar />
          <main className="page-enter">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  )
}

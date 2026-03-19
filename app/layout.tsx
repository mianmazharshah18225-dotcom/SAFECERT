import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'SafeCert Skills Ltd – UK\'s #1 Security Training & Certification Provider',
  description: 'Get trained and certified with SafeCert Skills Ltd. Offering SIA Door Supervisor, Security Guard, CCTV, First Aid, and more across the UK.',
  keywords: 'security training, SIA licence, door supervisor training, security guard course, CCTV training, first aid, UK',
  openGraph: {
    title: 'SafeCert Skills Ltd',
    description: 'UK\'s leading security training & certification provider',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body antialiased">
        <Navbar />
        <main className="page-enter">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}

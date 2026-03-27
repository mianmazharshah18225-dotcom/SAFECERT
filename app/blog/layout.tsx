import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Training Tips & Insights | SafeCert Skills Ltd',
  description: 'Expert advice and guides on First Aid, Food Hygiene, and Health & Safety. Learn from professional trainers at SafeCert Skills Ltd in Luton.',
  keywords: 'first aid tips, food hygiene guide, health safety advice, training blog, CPR guide, HACCP principles',
  alternates: {
    canonical: 'https://safecertskills.co.uk/blog',
  },
  openGraph: {
    title: 'Training Blog | SafeCert Skills Ltd',
    description: 'Expert training insights from our professional trainers in Luton',
    url: 'https://safecertskills.co.uk/blog',
  },
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

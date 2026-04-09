import Link from 'next/link'
import { Shield, Phone, MapPin, Star, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { COMPANY, COURSES, CATEGORIES } from '@/lib/data'
import EmailLink from './EmailLink'

export default function Footer() {
  return (
    <footer className="bg-dark-900 text-white">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-primary-800 via-primary-700 to-primary-800 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold mb-1">Ready to Start Your Career?</h3>
            <p className="text-white/80">Join 100+ students who trained with SafeCert Skills Ltd</p>
          </div>
          <div className="flex gap-4">
            <Link href="/courses" className="px-6 py-3 bg-white text-primary-800 font-bold rounded-xl hover:bg-gray-100 transition-colors">
              Browse Courses
            </Link>
            <Link href="/contact" className="px-6 py-3 btn-gold rounded-xl font-bold">
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-xl">SafeCert Skills Ltd</div>
                <div className="text-xs text-white/50 tracking-wider">TRAINING & CERTIFICATION</div>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Professional training provider in Luton offering First Aid, Food & Hygiene, and Health & Safety courses.
              Nationally accredited certifications trusted by over 300 students.
            </p>
            {/* Trustpilot */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <div>
                <div className="flex gap-0.5 mb-1">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-4 h-4 fill-green-400 text-green-400" />
                  ))}
                </div>
                <p className="text-sm font-semibold">Excellent — {COMPANY.trustpilot.reviews.toLocaleString()} reviews</p>
                <p className="text-xs text-white/50">on Trustpilot</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold text-white/80 mb-3">Follow Us</h4>
              <div className="flex gap-3">
                <a
                  href={COMPANY.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-primary-600 border border-white/10 hover:border-primary-500 flex items-center justify-center transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={COMPANY.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 border border-white/10 hover:border-pink-500 flex items-center justify-center transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={COMPANY.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-500 border border-white/10 hover:border-blue-400 flex items-center justify-center transition-all group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={COMPANY.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-blue-700 border border-white/10 hover:border-blue-600 flex items-center justify-center transition-all group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
                <a
                  href={COMPANY.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 flex items-center justify-center transition-all group"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-6 space-y-3">
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-gold-400 transition-colors">
                <Phone className="w-4 h-4 text-primary-400" />
                {COMPANY.phone}
              </a>
              <EmailLink email={COMPANY.email} />
              <EmailLink email={COMPANY.supportEmail} />
              <p className="flex items-center gap-3 text-sm text-white/70">
                <MapPin className="w-4 h-4 text-primary-400" />
                {COMPANY.address}
              </p>
            </div>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white/40 mb-4">Courses</h4>
            <ul className="space-y-3">
              {COURSES.map(course => (
                <li key={course.id}>
                  <Link href={course.href} className="text-sm text-white/70 hover:text-gold-400 transition-colors">
                    {course.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/courses" className="text-sm text-primary-400 font-medium hover:text-primary-300 transition-colors">
                  View All →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white/40 mb-4">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Careers', href: '/careers' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'FAQs', href: '/faqs' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/70 hover:text-gold-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} SafeCert Skills Ltd. All rights reserved. Company No. 12345678 | Accredited Training Provider
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Complaints'].map(link => (
              <Link key={link} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

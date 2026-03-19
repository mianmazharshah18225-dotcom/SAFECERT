'use client'
import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, CheckCircle, Send } from 'lucide-react'
import { COMPANY } from '@/lib/data'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', course: '', message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const contactDetails = [
    { icon: <Phone className="w-5 h-5" />, label: 'Phone', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
    { icon: <Mail className="w-5 h-5" />, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
    { icon: <MapPin className="w-5 h-5" />, label: 'Address', value: COMPANY.address, href: '#' },
    { icon: <Clock className="w-5 h-5" />, label: 'Hours', value: 'Mon–Sat: 8am–8pm', href: '#' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            Contact Us
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Our friendly team is here to help. Whether you have questions about a course, 
            need advice on which licence to get, or want to enrol — we're here for you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-display font-bold text-gray-900 text-xl mb-6">Contact Details</h3>
              <div className="space-y-5">
                {contactDetails.map((d, i) => (
                  <a key={i} href={d.href} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                      {d.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-0.5 font-semibold uppercase tracking-wide">{d.label}</p>
                      <p className="text-gray-700 font-medium group-hover:text-primary-600 transition-colors">{d.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-primary-900 rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-lg mb-2">Prefer to Talk?</h3>
              <p className="text-white/70 text-sm mb-4">
                Call us free on {COMPANY.phone} — our expert advisors are ready to help choose the right course for you.
              </p>
              <a href={`tel:${COMPANY.phone}`} className="btn-gold w-full block text-center py-3 rounded-xl font-bold text-dark-900">
                📞 Call Now — It's Free
              </a>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h4 className="font-bold text-amber-800 mb-2">Quick Booking</h4>
              <p className="text-amber-700 text-sm mb-4">
                Already know which course you want? Book directly online in minutes.
              </p>
              <a href="/courses" className="btn-primary inline-block px-5 py-2.5 rounded-xl text-sm font-semibold">
                Browse Courses →
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="font-display text-3xl font-bold text-gray-900 mb-3">Message Sent!</h3>
                <p className="text-gray-500 text-lg mb-6">
                  Thank you for getting in touch. Our team will respond within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', course: '', message: '' }) }}
                  className="btn-primary px-6 py-3 rounded-xl font-semibold text-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h3>
                <p className="text-gray-500 text-sm mb-8">We typically reply within a few hours during business hours.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        placeholder="your@email.com"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+44 7000 000000"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Course Interested In</label>
                      <select
                        value={form.course}
                        onChange={e => setForm({ ...form, course: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 transition-all bg-white"
                      >
                        <option value="">Select a course...</option>
                        <option>SIA Door Supervisor Training</option>
                        <option>SIA Security Guard Training</option>
                        <option>SIA CCTV Training</option>
                        <option>Close Protection Training</option>
                        <option>Personal Licence (APLH)</option>
                        <option>CSCS Green Card</option>
                        <option>Emergency First Aid at Work</option>
                        <option>Other / Not sure</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      placeholder="Tell us what you're looking for, any questions you have, or your preferred training location..."
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-50 transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full py-4 rounded-xl font-bold text-dark-900 flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Send Message
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting this form, you agree to our Privacy Policy. We'll never share your details.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

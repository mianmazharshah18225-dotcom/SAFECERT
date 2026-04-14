'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { COMPANY } from '@/lib/data'

const FAQS = [
  {
    category: 'Courses & Training',
    items: [
      {
        q: 'Do I need any previous experience to enrol?',
        a: 'No prior experience is needed for any of our courses. Our First Aid, Food & Hygiene, and Health & Safety courses are open to anyone aged 18+ who wants to develop professional skills.',
      },
      {
        q: 'How long does training take?',
        a: 'All our courses run for 1 Days with classes scheduled from 8:00 AM to 6:00 PM at our Luton training centre.',
      },
      {
        q: 'Are your courses accredited?',
        a: 'Yes. All our courses are nationally accredited and recognised by employers across the UK. You will receive professional certification upon completion.',
      },
      {
        q: 'What subjects are covered in each course?',
        a: 'First Aid covers CPR, emergency response, and patient care. Food & Hygiene covers food safety standards and HACCP principles. Health & Safety covers risk assessment and workplace safety management.',
      },
      {
        q: 'What happens if I fail my exam?',
        a: 'We offer resit support to all our students. Our expert tutors provide additional guidance to help you pass. A fee may apply for exam resits.',
      },
    ],
  },
  {
    category: 'Career Opportunities',
    items: [
      {
        q: 'What career opportunities are available after completing these courses?',
        a: 'Our courses prepare you for roles such as First Aid Instructor, Emergency Care Assistant, Food Safety Officer, Environmental Health Officer, Health & Safety Advisor, and Safety Manager.',
      },
      {
        q: 'Do you offer job placement support?',
        a: 'Yes! We provide career guidance and job placement support to help you find employment opportunities in your chosen field after completing your course.',
      },
      {
        q: 'Will I receive a certificate?',
        a: 'Yes, all students who successfully complete their course will receive a nationally recognised professional certificate.',
      },
    ],
  },
  {
    category: 'Booking & Payment',
    items: [
      {
        q: 'How do I book a course?',
        a: 'You can book online through our website, call us on +44 7918 428115, or visit our training centre in Luton. We recommend booking early as places fill up fast.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes! We offer flexible payment plans including monthly instalments for all courses. Contact us to discuss your options.',
      },
      {
        q: 'What is your cancellation and refund policy?',
        a: 'We offer a full refund if cancelled more than 14 days before your course start date. Cancellations within 14 days may be subject to an administration fee. You can also transfer to a later date.',
      },
      {
        q: 'Can my employer pay for my training?',
        a: 'Absolutely. We invoice companies directly and offer corporate bulk-booking discounts for 5 or more employees. Contact us for a business quote.',
      },
    ],
  },
  {
    category: 'Location & Schedule',
    items: [
      {
        q: 'Where is your training centre located?',
        a: 'Our training centre is located in Luton, United Kingdom. We offer a modern, fully-equipped facility for all our courses.',
      },
      {
        q: 'What are the class timings?',
        a: 'Classes run from 8:00 AM to 6:00 PM. The course duration is 1 Days with a structured schedule to ensure comprehensive learning.',
      },
    ],
  },
]

export default function FAQsPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            Help Centre
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-white/70 text-lg">
            Can't find what you're looking for? Call us on{' '}
            <a href={`tel:${COMPANY.phone}`} className="text-gold-400 font-semibold hover:underline">{COMPANY.phone}</a>
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {FAQS.map((group) => (
          <div key={group.category} className="mb-12">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span>{group.category}</span>
              <div className="h-px flex-1 bg-gray-200" />
            </h2>
            <div className="space-y-3">
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`
                const isOpen = openItem === key
                return (
                  <div
                    key={key}
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${isOpen ? 'border-primary-300 shadow-md shadow-primary-100' : 'border-gray-200'
                      }`}
                  >
                    <button
                      className="w-full flex items-center justify-between p-6 text-left"
                      onClick={() => setOpenItem(isOpen ? null : key)}
                    >
                      <span className="font-semibold text-gray-900 pr-4">{item.q}</span>
                      {isOpen
                        ? <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        : <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                      }
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6">
                        <div className="pt-2 border-t border-gray-100">
                          <p className="text-gray-600 text-sm leading-relaxed mt-4">{item.a}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still have questions */}
        <div className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-3xl p-10 text-center text-white mt-10">
          <div className="text-4xl mb-4">💬</div>
          <h3 className="font-display text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-white/70 mb-6">Our team is available Monday–Saturday, 8am to 8pm</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${COMPANY.phone}`}
              className="btn-gold px-8 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2"
            >
              📞 Call {COMPANY.phone}
            </a>
            <a
              href={`mailto:${COMPANY.email}`}
              className="bg-white/10 border border-white/20 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

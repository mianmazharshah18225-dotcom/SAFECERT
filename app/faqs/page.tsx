'use client'
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

const FAQS = [
  {
    category: 'Courses & Training',
    items: [
      {
        q: 'Do I need any previous experience to enrol?',
        a: 'No prior experience is needed for most of our courses. The SIA Door Supervisor and Security Guard courses are open to anyone who meets the basic eligibility criteria (aged 18+, right to work in UK).',
      },
      {
        q: 'How long does training take?',
        a: 'Course durations vary. Security Guard training is typically 4 weeks, Door Supervisor 6 weeks, and CCTV around 2 weeks. First Aid courses can be completed in just 1 day.',
      },
      {
        q: 'Are your courses accredited?',
        a: 'Yes. All our security courses are BTEC Level 2/3 accredited and SIA-approved. First Aid courses are HSE compliant. All qualifications are nationally recognised.',
      },
      {
        q: 'Do you offer online or e-learning options?',
        a: 'Yes! Many of our courses have an e-learning component allowing you to study at your own pace before attending classroom and practical sessions.',
      },
      {
        q: 'What happens if I fail my exam?',
        a: 'We offer resit support to all our students. Our expert tutors provide additional guidance to help you pass. A fee may apply for exam resits.',
      },
    ],
  },
  {
    category: 'SIA Licences',
    items: [
      {
        q: 'How long does it take to receive my SIA licence?',
        a: 'Once your application is submitted to the SIA (Security Industry Authority), it typically takes 6–8 weeks to receive your licence, subject to DBS checks and identity verification.',
      },
      {
        q: 'How much does an SIA licence cost?',
        a: 'The SIA licence application fee is £190, payable directly to the SIA. This is separate from your course fees with SafeCert.',
      },
      {
        q: 'How long is an SIA licence valid for?',
        a: 'SIA licences are valid for 3 years. After that, you will need to complete top-up training and renew your licence.',
      },
      {
        q: 'Can I work while my SIA licence application is being processed?',
        a: 'No. You must hold a valid SIA licence before working in a licensable role. However, you can work in non-licensable security roles while waiting.',
      },
    ],
  },
  {
    category: 'Booking & Payment',
    items: [
      {
        q: 'How do I book a course?',
        a: 'You can book online through our website, call us on 0800 123 4567, or visit one of our training centres. We recommend booking early as places fill up fast.',
      },
      {
        q: 'Do you offer payment plans?',
        a: 'Yes! We offer flexible payment plans including monthly instalments for most courses. Contact us to discuss your options.',
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
    category: 'Locations',
    items: [
      {
        q: 'Where are your training centres located?',
        a: 'We have over 120 training locations across the UK, including London, Birmingham, Manchester, Leeds, Liverpool, Glasgow, Cardiff, and Belfast. Check our Locations page for the full list.',
      },
      {
        q: 'Do you offer courses near me?',
        a: 'With 120+ locations nationwide, there\'s almost certainly a centre near you. Use our location search to find the closest training centre to your postcode.',
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
            <a href="tel:08001234567" className="text-gold-400 font-semibold hover:underline">0800 123 4567</a>
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
                    className={`bg-white rounded-2xl border transition-all overflow-hidden ${
                      isOpen ? 'border-primary-300 shadow-md shadow-primary-100' : 'border-gray-200'
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
              href="tel:08001234567"
              className="btn-gold px-8 py-3 rounded-xl font-bold inline-flex items-center justify-center gap-2"
            >
              📞 Call 0800 123 4567
            </a>
            <a
              href="mailto:info@safecertskills.co.uk"
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

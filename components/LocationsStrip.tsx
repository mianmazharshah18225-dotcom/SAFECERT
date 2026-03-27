import Link from 'next/link'
import { MapPin, Clock, Phone } from 'lucide-react'
import { COMPANY } from '@/lib/data'

export default function LocationsStrip() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Location Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <h2 className="font-display text-3xl font-bold text-gray-900">Our Training Centre</h2>
                <p className="text-gray-500">Located in Luton, United Kingdom</p>
              </div>
            </div>

            <div className="space-y-4 bg-gray-50 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">{COMPANY.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Operating Hours</p>
                  <p className="text-gray-600">{COMPANY.timing}</p>
                  <p className="text-sm text-gray-500">Monday to Saturday</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-gray-900">Contact</p>
                  <a href={`tel:${COMPANY.phone}`} className="text-primary-600 hover:underline">
                    {COMPANY.phone}
                  </a>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Get Directions
            </Link>
          </div>

          {/* Right: Map */}
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39406.85663402998!2d-0.4485624!3d51.8787119!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48763d8e0de89725%3A0x2a5bbf8785c0b16a!2sLuton%2C%20UK!5e0!3m2!1sen!2suk!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luton Training Centre Location"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

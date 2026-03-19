import Link from 'next/link'
import { MapPin, ArrowRight } from 'lucide-react'
import { UK_LOCATIONS } from '@/lib/data'

export default function LocationsStrip() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-gray-900">120+ UK Training Locations</h2>
              <p className="text-gray-500 text-sm">Find a course near you</p>
            </div>
          </div>
          <Link href="/locations" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all text-sm">
            View All Locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {UK_LOCATIONS.map(loc => (
            <Link
              key={loc}
              href={`/locations/${loc.toLowerCase().replace(' ', '-')}`}
              className="px-4 py-2 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-full text-sm text-gray-600 hover:text-primary-700 font-medium transition-all"
            >
              {loc}
            </Link>
          ))}
          <Link
            href="/locations"
            className="px-4 py-2 bg-primary-600 text-white rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors"
          >
            +90 more →
          </Link>
        </div>
      </div>
    </section>
  )
}

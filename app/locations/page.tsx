import Link from 'next/link'
import { MapPin, Search } from 'lucide-react'
import { UK_LOCATIONS, COURSES } from '@/lib/data'

export default function LocationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            UK Locations
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Train Near You
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            With over 120 training locations across the UK, there's always a SafeCert centre close to you.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Map placeholder */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-12">
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 h-64 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary-300 mx-auto mb-3" />
              <p className="text-primary-400 font-medium">Interactive Map — 120+ UK Locations</p>
              <p className="text-gray-400 text-sm">Click a city below to find courses</p>
            </div>
          </div>
        </div>

        {/* Course types */}
        <div className="mb-10">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Browse by Course Type</h2>
          <div className="flex flex-wrap gap-3">
            {['Door Supervisor', 'Security Guard', 'CCTV', 'First Aid', 'Personal Licence', 'CSCS Card'].map(type => (
              <Link
                key={type}
                href={`/courses?q=${encodeURIComponent(type)}`}
                className="px-5 py-2.5 bg-white border border-gray-200 hover:border-primary-400 hover:bg-primary-50 rounded-xl text-sm font-medium text-gray-700 hover:text-primary-700 transition-all"
              >
                {type}
              </Link>
            ))}
          </div>
        </div>

        {/* Cities */}
        <div>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">All Training Locations</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {UK_LOCATIONS.map(loc => (
              <Link
                key={loc}
                href={`/locations/${loc.toLowerCase().replace(' ', '-')}`}
                className="card-hover bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center group"
              >
                <MapPin className="w-5 h-5 text-primary-300 group-hover:text-primary-600 mx-auto mb-2 transition-colors" />
                <p className="text-sm font-semibold text-gray-700 group-hover:text-primary-700 transition-colors">{loc}</p>
              </Link>
            ))}
            {/* Extra locations placeholder */}
            <div className="bg-primary-50 rounded-xl p-4 border border-primary-100 text-center flex items-center justify-center">
              <div>
                <p className="text-sm font-bold text-primary-600">+90 More</p>
                <p className="text-xs text-primary-400">Cities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Online option */}
        <div className="mt-12 bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-3xl mb-2">💻</div>
            <h3 className="font-display text-2xl font-bold mb-2">Can't Make It In Person?</h3>
            <p className="text-white/70">Several of our courses are also available online via Zoom and e-learning platforms.</p>
          </div>
          <Link href="/courses?cat=elearning" className="btn-gold px-8 py-4 rounded-2xl font-bold text-dark-900 whitespace-nowrap">
            View Online Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

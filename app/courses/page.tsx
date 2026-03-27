'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Filter, Clock, Tag, CheckCircle, SlidersHorizontal } from 'lucide-react'
import { COURSES, CATEGORIES } from '@/lib/data'

export default function CoursesPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = COURSES.filter(c => {
    const matchCat = activeCategory === 'all' || c.category === activeCategory
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            All Courses
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Find Your Perfect Course
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Browse our full range of accredited, nationally recognised training courses. 
            Filter by category or search for what you need.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search + Filter bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-primary-50'
              }`}
            >
              All
            </button>
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> courses
          </p>
        </div>

        {/* Course grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-2xl font-bold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-400">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course) => (
              <Link
                key={course.id}
                href={course.href}
                className="course-card bg-white rounded-2xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  {course.popular && (
                    <div className="absolute top-4 right-4 bg-gold-500 text-dark-900 text-xs font-bold px-2.5 py-1 rounded-full z-10">
                      🔥 Popular
                    </div>
                  )}
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-3xl mb-2">{course.icon}</div>
                    <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-gold-300 transition-colors leading-tight">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="flex items-center gap-1.5 text-white/90 text-xs">
                        <Clock className="w-3.5 h-3.5" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/90 text-xs">
                        <Tag className="w-3.5 h-3.5" />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-sm mb-4 leading-relaxed">{course.description}</p>
                  <ul className="space-y-2 mb-6">
                    {course.features.slice(0, 3).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                      <div className="text-xs text-gray-400 line-through">{course.originalPrice}</div>
                      <div className="text-2xl font-display font-extrabold text-primary-700">{course.price}</div>
                    </div>
                    <div className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold">
                      Book Now →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

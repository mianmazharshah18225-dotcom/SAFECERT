'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, ChevronRight, CheckCircle, Star, Play } from 'lucide-react'
import { CATEGORIES, COMPANY } from '@/lib/data'

export default function Hero() {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')

  const highlights = [
    'Nationally Accredited',
    '98% Pass Rate',
    'Career Support',
    'Flexible Payment Plans',
  ]

  return (
    <section className="hero-gradient hero-pattern relative overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-800/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 w-full">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gold-500/15 border border-gold-500/30 text-gold-400 text-sm font-semibold px-4 py-2 rounded-full mb-6 animate-fade-up">
            <Star className="w-4 h-4 fill-gold-400" />
            Professional Training Provider in Luton
            <ChevronRight className="w-4 h-4" />
          </div>

          {/* Heading */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.05] mb-6 animate-fade-up animate-delay-100">
            Get Trained.<br />
            <span className="gradient-text" style={{
              background: 'linear-gradient(135deg, #60a5fa, #f59e0b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Get Certified.
            </span>
            <br />
            Get Working.
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-8 max-w-2xl leading-relaxed animate-fade-up animate-delay-200">
            SafeCert Skills Ltd — Professional training and certification provider in Luton.
            Accredited courses in First Aid, Food & Hygiene, and Health & Safety.
          </p>

          {/* Search box */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl shadow-black/30 flex flex-col md:flex-row gap-2 mb-8 animate-fade-up animate-delay-300">
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search courses (e.g. First Aid, Food & Hygiene...)"
                className="w-full text-gray-800 placeholder-gray-400 outline-none text-sm"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-px bg-gray-100 hidden md:block" />
            <div className="flex-1 flex items-center gap-3 px-4 py-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Location: Luton"
                className="w-full text-gray-800 placeholder-gray-400 outline-none text-sm"
                value={location}
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <Link
              href={`/courses${searchQuery ? `?q=${searchQuery}` : ''}${location ? `&loc=${location}` : ''}`}
              className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold whitespace-nowrap text-dark-900 text-center"
            >
              Find Courses
            </Link>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-up animate-delay-400">
            {highlights.map(item => (
              <div key={item} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>

          {/* Quick category buttons */}
          <div className="flex flex-wrap gap-2 animate-fade-up animate-delay-500">
            <span className="text-white/50 text-sm self-center mr-2">Quick jump:</span>
            {CATEGORIES.slice(0, 5).map(cat => (
              <Link
                key={cat.id}
                href={cat.href}
                className="flex items-center gap-1.5 px-4 py-2 glass-card rounded-full text-white text-sm font-medium hover:bg-white/15 transition-all"
              >
                <span>{cat.icon}</span>
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Stats floating card */}
        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col gap-4">
          {COMPANY.stats.slice(0, 3).map((stat, i) => (
            <div key={i} className="glass-card rounded-2xl px-6 py-4 text-center animate-fade-up" style={{ animationDelay: `${(i + 3) * 100}ms` }}>
              <div className="font-display text-3xl font-extrabold text-white counter-number">{stat.value}</div>
              <div className="text-white/60 text-xs mt-1 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

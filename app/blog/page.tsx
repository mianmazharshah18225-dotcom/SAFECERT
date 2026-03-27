'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, Search, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')

  const categories = ['all', 'First Aid', 'Food Hygiene', 'Health & Safety']

  const filtered = BLOG_POSTS.filter(post => {
    const matchCat = activeCategory === 'all' || post.category === activeCategory
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-gold-400 bg-gold-500/10 border border-gold-500/20 px-4 py-2 rounded-full mb-4">
            Blog & Resources
          </span>
          <h1 className="font-display text-5xl font-extrabold text-white mb-4">
            Training Insights & Tips
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Expert advice, guides, and insights on First Aid, Food Hygiene, and Health & Safety from our professional trainers in Luton.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search + Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-primary-50'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-gray-500 text-sm">
            Showing <span className="font-bold text-gray-900">{filtered.length}</span> articles
          </p>
        </div>

        {/* Blog grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="font-display text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
            <p className="text-gray-400">Try a different search term or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="card-hover bg-white rounded-2xl overflow-hidden group border border-gray-100 shadow-sm"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                    <User className="w-3.5 h-3.5" />
                    <span>By {post.author}</span>
                  </div>

                  <div className="flex items-center gap-2 text-primary-600 font-semibold text-sm mt-4 group-hover:gap-3 transition-all">
                    Read more <ArrowRight className="w-4 h-4" />
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

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, Tag, CheckCircle, Star, ArrowRight } from 'lucide-react'
import { COURSES } from '@/lib/data'

export default function PopularCourses() {
  const popular = COURSES.filter(c => c.popular).concat(COURSES.filter(c => !c.popular)).slice(0, 6)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="inline-block text-xs font-bold tracking-widest uppercase text-primary-600 bg-primary-50 px-4 py-2 rounded-full mb-4">
              Popular Courses
            </span>
            <h2 className="font-display text-4xl font-extrabold text-gray-900">
              Our Most Popular Training Courses
            </h2>
          </div>
          <Link href="/courses" className="flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all whitespace-nowrap">
            View All Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popular.map((course) => (
            <Link
              key={course.id}
              href={course.href}
              className="course-card bg-white rounded-2xl overflow-hidden group"
            >
              {/* Card header with image */}
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
                  <h3 className="font-display text-xl font-bold text-white mb-1 leading-tight group-hover:text-gold-300 transition-colors">
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

              {/* Card body */}
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
                  <Link
                    href={`/checkout?course=${course.id}`}
                    className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Enroll Now →
                  </Link>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

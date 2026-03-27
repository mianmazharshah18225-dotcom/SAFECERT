import { TRAINERS } from '@/lib/data'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function TrainersSection() {
  return (
    <div className="hero-gradient py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Trainer Cards */}
          <div className="grid grid-cols-2 gap-6">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105"
              >
                {/* Trainer Image */}
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-6xl">👤</div>
                </div>
                {/* Trainer Info */}
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg mb-2">{trainer.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(trainer.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-white/60 text-sm">{trainer.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Content */}
          <div className="text-white">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold mb-6">
              Meet our professional trainers
            </h2>
            <p className="text-white/80 text-lg md:text-xl mb-8 leading-relaxed">
              They've done the job. They know how to get you ready for your career.
            </p>
            <Link
              href="/about"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all hover:transform hover:scale-105 shadow-lg shadow-gold-500/20"
            >
              View all trainers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

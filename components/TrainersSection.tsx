import { TRAINERS } from '@/lib/data'
import { Star } from 'lucide-react'
import Link from 'next/link'

export default function TrainersSection() {
  return (
    <div className="hero-gradient py-3 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-4 items-center">
          {/* Left side - Trainer Cards */}
          <div className="grid grid-cols-2 gap-2">
            {TRAINERS.map((trainer) => (
              <div
                key={trainer.name}
                className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all"
              >
                {/* Trainer Image */}
                <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-2xl">👤</div>
                </div>
                {/* Trainer Info */}
                <div className="p-1.5">
                  <h3 className="font-bold text-white text-xs mb-0.5">{trainer.name}</h3>
                  <div className="flex items-center gap-0.5 mb-0.5">
                    {[...Array(trainer.rating)].map((_, i) => (
                      <Star key={i} className="w-2 h-2 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-white/60 text-[10px] leading-tight">{trainer.specialty}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Content */}
          <div className="text-white">
            <h2 className="font-display text-xl md:text-2xl font-extrabold mb-2">
              Meet our professional trainers
            </h2>
            <p className="text-white/80 text-xs md:text-sm mb-3 leading-relaxed">
              They've done the job. They know how to get you ready for your career.
            </p>
            <Link
              href="/about"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-gray-900 font-bold px-4 py-2 text-xs rounded-lg transition-all hover:transform hover:scale-105 shadow-lg shadow-gold-500/20"
            >
              View all trainers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

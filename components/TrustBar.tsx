'use client'
import Link from 'next/link'
import { Heart, Utensils, Shield, Award } from 'lucide-react'
import { COMPANY } from '@/lib/data'

export default function TrustBar() {
  const items = [
    { icon: <Heart className="w-5 h-5" />, label: 'First Aid Certified' },
    { icon: <Utensils className="w-5 h-5" />, label: 'Food Hygiene Accredited' },
    { icon: <Shield className="w-5 h-5" />, label: 'Health & Safety Approved' },
    { icon: <Award className="w-5 h-5" />, label: '98% Pass Rate' },
  ]

  return (
    <div className="bg-white border-b border-gray-100 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
              <span className="text-primary-600">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

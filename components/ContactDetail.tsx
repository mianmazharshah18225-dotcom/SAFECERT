'use client'

import { useState, ReactNode } from 'react'
import { Check } from 'lucide-react'

interface ContactDetailProps {
  icon: ReactNode
  label: string
  value: string
  href: string
  isEmail?: boolean
}

export default function ContactDetail({ icon, label, value, href, isEmail = false }: ContactDetailProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    if (isEmail) {
      e.preventDefault()

      // Try to open email client
      window.location.href = href

      // Also copy to clipboard as backup
      try {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.log('Could not copy:', err)
      }
    }
  }

  return (
    <a
      href={href}
      onClick={isEmail ? handleClick : undefined}
      className="flex items-start gap-4 group relative"
      title={isEmail ? `Click to email or copy to clipboard` : undefined}
    >
      <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 flex-shrink-0 group-hover:bg-primary-100 transition-colors">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-0.5 font-semibold uppercase tracking-wide">{label}</p>
        <p className="text-gray-700 font-medium group-hover:text-primary-600 transition-colors flex items-center gap-2">
          {value}
          {copied && (
            <span className="inline-flex items-center gap-1 text-xs text-green-600">
              <Check className="w-3 h-3" />
              Copied!
            </span>
          )}
        </p>
      </div>
    </a>
  )
}

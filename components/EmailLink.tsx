'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

interface EmailLinkProps {
  email: string
  label?: string
  className?: string
  showIcon?: boolean
}

export default function EmailLink({ email, label, className = '', showIcon = true }: EmailLinkProps) {
  const [copied, setCopied] = useState(false)

  const handleClick = async (e: React.MouseEvent) => {
    // Try to open email client first
    window.location.href = `mailto:${email}`

    // Also copy to clipboard as backup
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.log('Could not copy email:', err)
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-3 text-sm text-white/70 hover:text-gold-400 transition-colors group relative ${className}`}
      title={`Click to email ${email} (or copy to clipboard)`}
    >
      {showIcon && <Mail className="w-4 h-4 text-primary-400" />}
      <span className="flex items-center gap-2">
        {label || email}
        {copied && (
          <span className="inline-flex items-center gap-1 text-xs text-green-400">
            <Check className="w-3 h-3" />
            Copied!
          </span>
        )}
      </span>
    </button>
  )
}

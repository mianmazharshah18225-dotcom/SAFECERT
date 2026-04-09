'use client'

import { MessageCircle, X } from 'lucide-react'
import { useState } from 'react'

export default function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)
  const whatsappNumber = '447918428115' // +44 7918428115 without + and spaces
  const message = 'Hello! I would like to enquire about your training courses.'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

  return (
    <>
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Chat on WhatsApp"
      >
        {/* Tooltip */}
        <div
          className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
          }`}
        >
          <span className="text-sm font-medium">Chat with us on WhatsApp</span>
          {/* Arrow */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full">
            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-gray-900"></div>
          </div>
        </div>

        {/* Button */}
        <div className="relative">
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>

          {/* Main button */}
          <div className="relative w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110">
            <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />
          </div>

          {/* Badge - Optional: Show "Online" status */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </a>
    </>
  )
}

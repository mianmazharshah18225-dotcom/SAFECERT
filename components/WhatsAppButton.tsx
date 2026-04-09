'use client'

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
          <span className="absolute inset-0 rounded-full animate-ping opacity-75" style={{ backgroundColor: '#25D366' }}></span>

          {/* Main button - Using standard WhatsApp icon */}
          <div className="relative w-16 h-16 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 group-hover:scale-110 hover:brightness-95" style={{ backgroundColor: '#25D366' }}>
            {/* WhatsApp Icon - Simple and Clean */}
            <svg viewBox="0 0 32 32" className="w-9 h-9" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.164 0 0 7.163 0 16c0 2.827.743 5.482 2.042 7.788L0 32l8.412-2.02A15.938 15.938 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.455c-2.533 0-4.942-.706-7.004-1.935l-.502-.297-5.197 1.247 1.271-5.115-.327-.52A13.372 13.372 0 012.545 16C2.545 8.567 8.568 2.545 16 2.545S29.455 8.567 29.455 16 23.433 29.455 16 29.455z"/>
              <path d="M23.904 19.893c-.36-.18-2.135-1.053-2.465-1.173-.33-.12-.57-.18-.81.18-.24.36-.93 1.173-1.14 1.413-.21.24-.42.27-.78.09-.36-.18-1.52-.56-2.895-1.785-1.07-.955-1.792-2.133-2.002-2.493-.21-.36-.022-.554.158-.733.162-.161.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.293-.702-.59-.607-.81-.618-.21-.01-.45-.012-.69-.012s-.63.09-.96.45c-.33.36-1.26 1.23-1.26 3s1.29 3.48 1.47 3.72c.18.24 2.54 3.877 6.152 5.436.86.372 1.532.593 2.056.76.863.274 1.648.235 2.268.142.692-.103 2.135-.873 2.435-1.715.3-.843.3-1.564.21-1.715-.09-.15-.33-.24-.69-.42z"/>
            </svg>
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

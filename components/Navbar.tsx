'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Phone, ChevronDown, Shield, Star, User, LogOut, LayoutDashboard, UserCog } from 'lucide-react'
import { CATEGORIES, COURSES, COMPANY } from '@/lib/data'

export default function Navbar() {
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (profileOpen && !target.closest('.profile-dropdown')) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [profileOpen])

  const navItems = [
    { label: 'Courses', key: 'courses' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top bar */}
      <div className="bg-primary-900 text-white text-sm py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-gold-400" />
              <a href={`tel:${COMPANY.phone}`} className="hover:text-gold-400 transition-colors">{COMPANY.phone}</a>
            </span>
            <span className="text-white/60">|</span>
            <span className="text-white/70">Mon–Sat: 8am–8pm</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3.5 h-3.5 fill-green-400 text-green-400" />
              ))}
            </div>
            <span className="text-white/80 font-medium">Excellent</span>
            <span className="text-white/50">·</span>
            <span className="text-white/70">{COMPANY.trustpilot.reviews.toLocaleString()} reviews on Trustpilot</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 navbar-blur ${
          scrolled
            ? 'bg-white/95 shadow-lg shadow-primary-900/10 border-b border-gray-100'
            : 'bg-white border-b border-gray-100'
        }`}
        onMouseLeave={() => setActiveMenu(null)}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center shadow-md group-hover:shadow-primary-600/30 transition-all">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-display font-800 text-lg leading-tight text-primary-900">SafeCert</div>
                <div className="text-xs text-gray-500 leading-tight font-medium tracking-wide">SKILLS LTD</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.label} className="relative" onMouseEnter={() => item.key ? setActiveMenu(item.key) : setActiveMenu(null)}>
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 rounded-lg hover:bg-primary-50 transition-all flex items-center gap-1"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all flex items-center gap-1 ${
                        activeMenu === item.key
                          ? 'text-primary-600 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                      }`}
                    >
                      {item.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === item.key ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Profile / Auth buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {status === 'loading' ? (
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <div className="relative profile-dropdown">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-100 transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-semibold shadow-md">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                      <p className="text-xs text-gray-500">{session.user.role}</p>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Profile Dropdown */}
                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{session.user.name}</p>
                        <p className="text-xs text-gray-500">{session.user.email}</p>
                      </div>

                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        onClick={() => setProfileOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Student Dashboard
                      </Link>

                      {session.user.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          onClick={() => setProfileOpen(false)}
                        >
                          <UserCog className="w-4 h-4" />
                          Admin Panel
                        </Link>
                      )}

                      <div className="border-t border-gray-100 mt-2 pt-2">
                        <button
                          onClick={() => {
                            setProfileOpen(false)
                            signOut({ callbackUrl: '/' })
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link
                    href="/auth/signin"
                    className="px-5 py-2.5 text-sm font-semibold text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="px-5 py-2.5 text-sm font-semibold rounded-xl btn-primary"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mega Menu — Courses */}
        {activeMenu === 'courses' && (
          <div className="mega-menu absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-2xl shadow-gray-900/10 z-50">
            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-8">
              <div>
                <p className="text-xs font-700 tracking-widest text-primary-600 uppercase mb-4">Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.id}
                      href={cat.href}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-primary-50 transition-colors group"
                    >
                      <span className="text-xl">{cat.icon}</span>
                      <span className="text-sm font-medium text-gray-700 group-hover:text-primary-600">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-700 tracking-widest text-primary-600 uppercase mb-4">Popular Courses</p>
                <div className="space-y-2">
                  {COURSES.slice(0, 5).map(course => (
                    <Link
                      key={course.id}
                      href={course.href}
                      className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-primary-50 transition-colors group"
                    >
                      <span className="text-base">{course.icon}</span>
                      <span className="text-sm text-gray-700 group-hover:text-primary-600 leading-snug">{course.title}</span>
                    </Link>
                  ))}
                  <Link href="/courses" className="inline-flex items-center gap-1 text-sm text-primary-600 font-medium mt-2 hover:gap-2 transition-all">
                    View all courses →
                  </Link>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary-900 to-primary-700 rounded-2xl p-6 text-white">
                <p className="text-xs tracking-widest uppercase text-white/60 mb-2">For Business</p>
                <h3 className="font-display font-bold text-lg mb-2">Bulk Training Packages</h3>
                <p className="text-sm text-white/80 mb-4">Train your whole team. Volume discounts available for 5+ employees.</p>
                <Link href="/contact" className="inline-block px-4 py-2 bg-gold-500 text-dark-900 text-sm font-bold rounded-lg hover:bg-gold-400 transition-colors">
                  Get a Quote
                </Link>
              </div>
            </div>
          </div>
        )}


        {/* Mobile menu */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl mobile-menu">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-1">
              {session && (
                <div className="mb-4 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center text-white font-bold text-lg">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{session.user.name}</p>
                      <p className="text-sm text-gray-600">{session.user.email}</p>
                    </div>
                  </div>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 mb-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Student Dashboard
                  </Link>
                  {session.user.role === 'ADMIN' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-lg text-sm font-medium text-gray-700 hover:text-primary-600 mb-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <UserCog className="w-4 h-4" />
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      setIsOpen(false)
                      signOut({ callbackUrl: '/' })
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 rounded-lg text-sm font-medium w-full"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}

              {navItems.map(item => (
                <Link
                  key={item.label}
                  href={item.href || '#'}
                  className="block px-4 py-3 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {!session && (
                <div className="pt-4 flex flex-col gap-3">
                  <Link href="/auth/signin" className="btn-primary text-center py-3 px-6 rounded-xl text-sm font-semibold" onClick={() => setIsOpen(false)}>
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn-gold text-center py-3 px-6 rounded-xl text-sm font-semibold" onClick={() => setIsOpen(false)}>
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <div className="text-8xl mb-6">🔍</div>
        <div className="font-display text-8xl font-extrabold text-primary-100 mb-4">404</div>
        <h1 className="font-display text-3xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. It might have moved or doesn't exist.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/" className="btn-primary px-8 py-3.5 rounded-xl font-semibold">
            Go Home
          </Link>
          <Link href="/courses" className="px-8 py-3.5 rounded-xl font-semibold bg-white border border-gray-200 text-gray-700 hover:border-primary-300 transition-colors">
            Browse Courses
          </Link>
        </div>
      </div>
    </div>
  )
}

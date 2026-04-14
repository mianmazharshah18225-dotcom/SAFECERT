import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/lib/data'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  // Get related posts from same category
  const relatedPosts = BLOG_POSTS.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="hero-gradient py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          <span className="inline-block bg-gold-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-white/70">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-4 -mt-12">
        <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <article className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <div className="text-gray-700 leading-relaxed space-y-6">
              {post.content.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Full article placeholder */}
            <div className="mt-12 p-8 bg-gray-50 rounded-2xl border border-gray-200">
              <h3 className="font-display text-2xl font-bold text-gray-900 mb-4">Want to Learn More?</h3>
              <p className="text-gray-600 mb-6">
                This is just a preview. Our full courses provide comprehensive training with hands-on experience
                and expert instruction over 1 Day at our Luton training centre.
              </p>
              <Link
                href="/courses"
                className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
              >
                View Our Courses
              </Link>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="card-hover bg-white rounded-2xl overflow-hidden group border border-gray-100 shadow-sm"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {relatedPost.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-primary-900 to-primary-700 rounded-3xl p-10 text-center text-white">
          <div className="text-4xl mb-4">🎓</div>
          <h3 className="font-display text-2xl font-bold mb-3">Ready to Start Your Training?</h3>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Join our 1 Day professional training programs in Luton. Expert instruction, 8am-6pm daily.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses" className="btn-gold px-8 py-3 rounded-xl font-bold">
              Browse Courses
            </Link>
            <Link href="/contact" className="bg-white/10 border border-white/20 px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

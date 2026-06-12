'use client'

import { useEffect, useState } from 'react'

export default function FooterTrustpilotReviews() {
    const [reviewCount, setReviewCount] = useState<number | null>(null)

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const res = await fetch('/api/reviews')
                const data = await res.json()
                if (data?.success) {
                    setReviewCount(Array.isArray(data.reviews) ? data.reviews.length : 0)
                } else {
                    setReviewCount(0)
                }
            } catch {
                setReviewCount(0)
            }
        }

        fetchCount()
    }, [])

    if (reviewCount === null) {
        return <span className="text-sm font-semibold">Excellent</span>
    }

    return (
        <p className="text-sm font-semibold">
            Excellent — {reviewCount.toLocaleString()} {reviewCount === 1 ? 'review' : 'reviews'}
        </p>
    )
}


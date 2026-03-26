import Hero from '@/components/Hero'
import CategoryCards from '@/components/CategoryCards'
import PopularCourses from '@/components/PopularCourses'
import HowItWorks from '@/components/HowItWorks'
import StatsBar from '@/components/StatsBar'
import Testimonials from '@/components/Testimonials'
import TrustBar from '@/components/TrustBar'
import CTASection from '@/components/CTASection'
import LocationsStrip from '@/components/LocationsStrip'
import TrainersSection from '@/components/TrainersSection'
import FAQSection from '@/components/FAQSection'

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CategoryCards />
      <StatsBar />
      <PopularCourses />
      <HowItWorks />
      <LocationsStrip />
      <TrainersSection />
      <Testimonials />
      <FAQSection />
      <CTASection />
    </>
  )
}

import Navigation from '../components/Navigation'
import HeroSection from '../components/HeroSection'
import ServicesSection from '../components/ServicesSection'
import WorkSection from '../components/WorkSection'
import ProcessSection from '../components/ProcessSection'
import TestimonialsSection from '../components/TestimonialsSection'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <ProcessSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </>
  )
}


import TekGeoAttendanceTracker from "@/components/tekgeo-attendance-tracker"
import BangladeshAttendanceMap from "@/components/bd-attendacne"
import HeroSection from "@/components/Hero"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import PricingSection from "@/components/Pricing"
import YouTubeVideoCarousel from "@/components/carousel"
import VideoSection from "@/components/VideoSection"
import { BlogSection } from "@/components/Blog"

export default function Home() {
  return (
    <main className="bg-gradient-to-r from-gray-900 via-black to-blue-950">
      <Navbar />
      <HeroSection />
      {/* <VideoSection videoId="AlnYmT22_Mg" /> */}
      <VideoSection videoId="AlnYmT22_Mg" />
      <BangladeshAttendanceMap />
      <TekGeoAttendanceTracker />
      <YouTubeVideoCarousel />
      <BlogSection />
      <PricingSection />
      <Footer/>
    </main>
  )
}

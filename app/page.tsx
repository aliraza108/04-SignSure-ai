import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import StatsBar from '../components/StatsBar';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import UploadDemo from '../components/UploadDemo';
import RiskExplainer from '../components/RiskExplainer';
import Testimonials from '../components/Testimonials';
import MobileAppSection from '../components/MobileAppSection';
import PricingSection from '../components/PricingSection';
import FAQSection from '../components/FAQSection';
import CTABanner from '../components/CTABanner';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <main className="relative">
        <HeroSection />
        <StatsBar />
        <FeaturesSection />
        <MobileAppSection />
        <HowItWorks />
        <UploadDemo />
        <RiskExplainer />
        <Testimonials />
        <PricingSection />
        <FAQSection />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}


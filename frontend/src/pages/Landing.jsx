import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import Stats from "../components/Stats";
import DashboardCarousel from "../components/DashboardCarousel";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />
      <main className="pt-20">
        <HeroSection />
        <Features />
        <Stats />
        <DashboardCarousel /> {/* 🔥 THIS */}
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;

import Navbar from "./components/Navbar";
import MobileBar from "./components/MobileBar";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CustomCursor from "./components/CustomCursor";
import Hero from "./components/Hero";
import HeroScene from "./components/HeroScene";
import About from "./components/sections/About";
import Showcase from "./components/sections/Showcase";
import WhyUs from "./components/sections/WhyUs";
import Reviews from "./components/sections/Reviews";
import Process from "./components/sections/Process";
import FinalCta from "./components/sections/FinalCta";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="grain relative min-h-screen overflow-x-clip bg-obsidian text-bone">
      <a
        href="#collections"
        className="sr-only z-[80] rounded-full bg-lime px-5 py-3 text-sm font-bold text-obsidian focus:not-sr-only focus:fixed focus:left-3 focus:top-3"
      >
        Skip to content
      </a>

      <CustomCursor />
      <Navbar />

      <main className="relative pb-[64px] md:pb-0">
        <div className="relative">
          <Hero />
          <HeroScene />
        </div>
        <About />
        <Showcase />
        <WhyUs />
        <Reviews />
        <Process />
        <FinalCta />
      </main>

      <Footer />
      <MobileBar />
      <WhatsAppFloat />
    </div>
  );
}

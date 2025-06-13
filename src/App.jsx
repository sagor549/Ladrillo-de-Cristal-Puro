
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductShowcase from "./components/ProductShowcase";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import IntroAnimation from "./components/IntroAnimation";
import ModernizeSection from "./components/ModernizeSection";
import InfiniteScrollShowcase from "./components/InfiniteScrollShowcase";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <ProductShowcase />
      
      <ModernizeSection/>
      <Footer />
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(true);
  
  // Check if current page should have background
  const shouldShowBackground = location.pathname === '/' || location.pathname === '/blog' || location.pathname === '/contact';
  
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  useEffect(() => {
    if (!showIntro) {
      if (location.pathname === '/blog' || location.pathname === '/contact') {
        gsap.fromTo('.page-content', 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
      window.scrollTo(0, 0);
    }
  }, [location, showIntro]);

  return (
    <div className="relative min-h-screen">
      {/* Intro Animation */}
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      
      {/* Conditional Background */}
      {shouldShowBackground && (
        <>
          <div 
            className="fixed inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/bg.png)',
            }}
          />
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;

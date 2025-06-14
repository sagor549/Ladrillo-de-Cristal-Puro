import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AgeVerification from "./components/AgeVerification";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProductShowcase from "./components/ProductShowcase";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Footer from "./components/Footer";
import IntroAnimation from "./components/IntroAnimation";
import ModernizeSection from "./components/ModernizeSection";


gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <ProductShowcase />
      <ModernizeSection />
      
      <Footer />
    </>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [showIntro, setShowIntro] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  
  // Check if current page should have background
  const shouldShowBackground = location.pathname === '/' || 
                             location.pathname === '/blog' || 
                             location.pathname === '/contact';
  
  // Initialize state from storage
  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    const ageVerified = localStorage.getItem('ageVerified');
    
    if (ageVerified) {
      setIsAgeVerified(true);
    }
    
    if (hasSeenIntro && ageVerified) {
      setShowIntro(false);
    } else if (ageVerified) {
      // Only show intro after age verification
      setShowIntro(true);
    }
  }, []);

  const handleAgeVerified = () => {
    setIsAgeVerified(true);
    localStorage.setItem('ageVerified', 'true');
    // After age verification, show intro animation
    setShowIntro(true);
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    sessionStorage.setItem('hasSeenIntro', 'true');
  };

  useEffect(() => {
    if (isAgeVerified && !showIntro) {
      if (location.pathname === '/blog' || location.pathname === '/contact') {
        gsap.fromTo('.page-content', 
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
      }
      window.scrollTo(0, 0);
    }
  }, [location, showIntro, isAgeVerified]);

  return (
    <div className="relative min-h-screen">
      {/* Age Verification - shows first */}
      {!isAgeVerified && (
        <AgeVerification onVerified={handleAgeVerified} />
      )}
      
      {/* Intro Animation - shows after age verification */}
      {isAgeVerified && showIntro && (
        <IntroAnimation onComplete={handleIntroComplete} />
      )}
      
      {/* Main Content - shows after intro animation */}
      {isAgeVerified && !showIntro && (
        <>
          {/* Conditional Background */}
          {shouldShowBackground && (
            <>
              <div 
                className="fixed inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: 'url(/op.png)',
                }}
              />
              
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
        </>
      )}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navbarRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const timelineRef = useRef(null); // GSAP timeline reference

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navbar entrance animation
  useEffect(() => {
    gsap.fromTo('.navbar',
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 1.8, ease: "sine.out" }
    );
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Mobile menu animation management
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    // Clear any existing animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    timelineRef.current = gsap.timeline();

    if (isMobileMenuOpen) {
      // Enable pointer events and show overlay
      gsap.set('.mobile-menu-overlay', { pointerEvents: 'auto' });
      timelineRef.current
        .to('.mobile-menu-overlay', {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        .to('.mobile-menu', {
          x: '0%',
          duration: 0.5,
          ease: "power3.out"
        }, 0)
        .fromTo('.mobile-menu-item', 
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "power2.out"
          },
          0.2
        );
    } else {
      timelineRef.current
        .to('.mobile-menu-item', {
          y: -20,
          opacity: 0,
          duration: 0.2,
          stagger: 0.05,
          ease: "power2.in"
        })
        .to('.mobile-menu', {
          x: '100%',
          duration: 0.4,
          ease: "power3.in"
        }, 0.1)
        .to('.mobile-menu-overlay', {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            gsap.set('.mobile-menu-overlay', { pointerEvents: 'none' });
          }
        }, 0.1);
    }

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // Navigate to home page first then scroll
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar fixed top-3 z-50 w-full transition-all duration-700 ease-out`}
      >
        <div className={`flex justify-center transition-all duration-700 ease-out ${isScrolled ? 'px-4' : ''}`}>
          <div className={`transition-all duration-900 ease-out ${isScrolled ? 'bg-black/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl w-[85%] lg:w-[75%] py-3' : 'bg-transparent border-transparent w-auto py-4'}`}>
            <div className={`h-full flex items-center transition-all duration-700 ease-out ${isScrolled ? 'px-6 md:px-8 justify-between' : 'justify-center'}`}>
              {/* Logo */}
              <Link
                to="/"
                className={`flex-shrink-0 z-10 transition-all duration-500 ease-out ${isScrolled ? 'scale-90' : 'scale-100 hover:scale-105'}`}
              >
                <img
                  src="/logoo.png"
                  alt="Ladrillo de Cristal Puro"
                  className={`transition-all duration-700 ease-out ${isScrolled ? 'h-12' : 'h-16'} w-auto`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
                {/* Fallback if image fails */}
                <div className="hidden text-white font-bold text-xl">LCP</div>
              </Link>

              {/* Desktop Navigation - Only visible when scrolled */}
              {isScrolled && (
                <div className="hidden lg:flex items-center space-x-8">
                  <Link 
                    to="/" 
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  <button 
                    onClick={() => scrollToSection('product-showcase')}
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Legacy
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </button>
                  <Link 
                    to="/blog" 
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                  <Link 
                    to="/contact" 
                    className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-gray-200 transition-all duration-300 font-playfair font-medium text-sm tracking-wide"
                  >
                    Contact
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button - Only visible when scrolled */}
              {isScrolled && (
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden text-white/90 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-lg"
                >
                  {isMobileMenuOpen ? 
                    <X size={24} /> : 
                    <Menu size={24} />
                  }
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className="mobile-menu-overlay fixed inset-0 bg-black/60 z-40 lg:hidden pointer-events-none opacity-0"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div 
        className="mobile-menu fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 lg:hidden transform translate-x-full bg-white"
        ref={mobileMenuRef}
      >
        <div className="p-6 pt-20 h-full flex flex-col">
          {/* Close Button */}
          <button
            onClick={toggleMobileMenu}
            className="absolute top-6 right-6 text-gray-600 hover:text-black transition-all duration-300 p-2 hover:bg-gray-100 rounded-lg"
          >
            <X size={24} />
          </button>
          
          {/* Menu Items */}
          <div className="space-y-1 flex-1">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-black hover:text-gray-600 font-playfair font-semibold text-xl transition-all duration-300 py-4 px-2 border-b border-gray-100 opacity-0"
            >
              Home
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="mobile-menu-item block w-full text-left text-black hover:text-gray-600 font-playfair font-semibold text-xl transition-all duration-300 py-4 px-2 border-b border-gray-100 opacity-0"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('product-showcase')}
              className="mobile-menu-item block w-full text-left text-black hover:text-gray-600 font-playfair font-semibold text-xl transition-all duration-300 py-4 px-2 border-b border-gray-100 opacity-0"
            >
              Legacy
            </button>
            <Link 
              to="/blog" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-black hover:text-gray-600 font-playfair font-semibold text-xl transition-all duration-300 py-4 px-2 border-b border-gray-100 opacity-0"
            >
              Blog
            </Link>
            <Link 
              to="/contact" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-black hover:text-gray-600 font-playfair font-semibold text-xl transition-all duration-300 py-4 px-2 opacity-0"
            >
              Contact
            </Link>
          </div>

          {/* Footer */}
          <div className="pt-6 border-t border-gray-200">
            <div className="text-gray-400 text-xs font-light">
              © {new Date().getFullYear()} Ladrillo de Cristal Puro
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
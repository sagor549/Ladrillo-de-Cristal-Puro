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

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Navbar entrance animation - SLOWED DOWN
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.5, delay: 1.8, ease: "sine.out" }
    );
  }, []);

  useEffect(() => {
    // Close mobile menu on route change
    setIsMobileMenuOpen(false);
  }, [location]);

  // Mobile menu animation management - SLOWED DOWN
  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (isMobileMenuOpen) {
      gsap.to('.mobile-menu-overlay', {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      });
      
      gsap.to('.mobile-menu', {
        x: '0%',
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      });
      
      gsap.to('.mobile-menu-item', {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        delay: 0.3,
        ease: "back.out(1.2)"
      });
    } else {
      gsap.to('.mobile-menu', {
        x: '100%',
        opacity: 0,
        duration: 0.6,
        ease: "power3.in"
      });
      
      gsap.to('.mobile-menu-overlay', {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          gsap.set('.mobile-menu-overlay', { opacity: 0 });
        }
      });
    }
  }, [isMobileMenuOpen]);

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
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
        className={`navbar fixed top-6 z-50 w-full transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]`}
      >
        <div className={`flex justify-center transition-all duration-1000 ${
          isScrolled ? 'px-4' : ''
        }`}>
          <div className={`
            transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] 
            ${isScrolled 
              ? 'bg-black/50 backdrop-blur-md border border-white/20 rounded-xl shadow-xl w-[60%] py-2'  // CHANGED WIDTH
              : 'bg-transparent border-transparent w-auto'
            }`}
          >
            <div className={`h-full flex items-center transition-all ${
              isScrolled ? 'px-4 md:px-6 justify-between' : 'justify-center'
            }`}>
              {/* Logo */}
              <Link 
                to="/" 
                className={`flex-shrink-0 z-10 transition-transform duration-500 ${
                  isScrolled ? 'scale-90' : 'scale-100 hover:scale-105'
                }`}
              >
                <img 
                  src="/logoo.png" 
                  alt="Ladrillo de Cristal Puro" 
                  className={`transition-all duration-1000 ${
                    isScrolled ? 'h-12' : 'h-16'
                  } w-auto`}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    const fallback = e.target.nextSibling;
                    if (fallback) fallback.style.display = 'block';
                  }}
                />
              </Link>

              {/* Desktop Navigation - Only visible when scrolled */}
              {isScrolled && (
                <div className="hidden lg:flex items-center space-x-8">
                  <Link 
                    to="/" 
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                  <button 
                    onClick={() => scrollToSection('about')}
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    About
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                  </button>
                  <button 
                    onClick={() => scrollToSection('product-showcase')}
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Legacy
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                  </button>
                  <Link 
                    to="/blog" 
                    className="text-white/90 hover:text-white font-playfair font-medium transition-all duration-300 relative group"
                  >
                    Blog
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all duration-500 group-hover:w-full"></span>
                  </Link>
                  <Link 
                    to="/contact" 
                    // CHANGED TO WHITE/GREY THEME
                    className="bg-gradient-to-r from-gray-300 to-gray-100 border border-gray-400 text-gray-800 px-5 py-2.5 rounded-full hover:bg-gray-200 transition-all duration-500 font-playfair font-medium text-sm tracking-wider"
                  >
                    Contact
                  </Link>
                </div>
              )}
              
              {/* Mobile Menu Button - Only visible when scrolled */}
              {isScrolled && (
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden text-white/90 hover:text-white transition-all duration-300 p-2 hover:bg-white/10 rounded-xl"
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
        className="mobile-menu-overlay fixed inset-0 bg-gradient-to-br from-black/90 to-gray-800/95 z-40 lg:hidden pointer-events-none opacity-0"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu - CHANGED WIDTH AND COLOR THEME */}
      <div 
        className={`mobile-menu fixed top-0 right-0 h-full w-3/5 z-50 lg:hidden transform translate-x-full`}
        ref={mobileMenuRef}
        style={{
          background: "linear-gradient(135deg, rgba(15,15,15,0.95) 0%, rgba(50,50,50,0.97) 100%)",
          boxShadow: "-10px 0 30px rgba(100, 100, 100, 0.3)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.15)"
        }}
      >
        <div className="p-8 pt-36 h-full flex flex-col">
          <button
            onClick={toggleMobileMenu}
            className="absolute top-8 right-8 text-gray-400 hover:text-gray-300 transition-all duration-300 p-2 hover:bg-gray-400/10 rounded-xl"
          >
            <X size={28} />
          </button>
          
          <div className="space-y-7 flex-1">
            <Link 
              to="/" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-gray-50 hover:text-gray-300 font-playfair font-bold text-2xl transition-all duration-300 py-3 border-b border-gray-500/10 transform translate-y-5 opacity-0"
            >
              Home
              <span className="block h-px bg-gradient-to-r from-gray-500/0 via-gray-500/60 to-gray-500/0 w-3/4 mt-2"></span>
            </Link>
            <button 
              onClick={() => scrollToSection('about')}
              className="mobile-menu-item block w-full text-left text-gray-50 hover:text-gray-300 font-playfair font-bold text-2xl transition-all duration-300 py-3 border-b border-gray-500/10 transform translate-y-5 opacity-0"
            >
              About
              <span className="block h-px bg-gradient-to-r from-gray-500/0 via-gray-500/60 to-gray-500/0 w-3/4 mt-2"></span>
            </button>
            <button 
              onClick={() => scrollToSection('product-showcase')}
              className="mobile-menu-item block w-full text-left text-gray-50 hover:text-gray-300 font-playfair font-bold text-2xl transition-all duration-300 py-3 border-b border-gray-500/10 transform translate-y-5 opacity-0"
            >
              Legacy
              <span className="block h-px bg-gradient-to-r from-gray-500/0 via-gray-500/60 to-gray-500/0 w-3/4 mt-2"></span>
            </button>
            <Link 
              to="/blog" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-gray-50 hover:text-gray-300 font-playfair font-bold text-2xl transition-all duration-300 py-3 border-b border-gray-500/10 transform translate-y-5 opacity-0"
            >
              Blog
              <span className="block h-px bg-gradient-to-r from-gray-500/0 via-gray-500/60 to-gray-500/0 w-3/4 mt-2"></span>
            </Link>
            <Link 
              to="/contact" 
              onClick={toggleMobileMenu}
              className="mobile-menu-item block text-gray-50 hover:text-gray-300 font-playfair font-bold text-2xl transition-all duration-300 py-3 transform translate-y-5 opacity-0"
            >
              Contact
              <span className="block h-px bg-gradient-to-r from-gray-500/0 via-gray-500/60 to-gray-500/0 w-3/4 mt-2"></span>
            </Link>
          </div>

          <div className="pt-10 border-t border-gray-500/10">
            <div className="text-gray-500/60 text-sm font-light">
              © {new Date().getFullYear()} Ladrillo de Cristal Puro
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
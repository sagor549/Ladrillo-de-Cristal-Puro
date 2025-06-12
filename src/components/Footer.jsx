
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Footer = () => {
  const footerRef = useRef();
  const quoteRef = useRef();
  const logoRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo([quoteRef.current, logoRef.current, contentRef.current],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-20 bg-black/80 backdrop-blur-sm border-t border-white/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Logo Section */}
        <div ref={logoRef} className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <img 
              src="/logoo.png" 
              alt="Ladrillo de Cristal Puro" 
              className="h-16 md:h-20 w-auto hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            
          </div>
          <h3 className="text-2xl md:text-3xl font-playfair font-bold text-white/90 mb-2">
            Ladrillo de Cristal Puro
          </h3>
          <p className="text-white/60 font-inter text-sm tracking-wider uppercase">
            Toronto Distillery Group
          </p>
        </div>

        {/* Quote Section */}
        <div ref={quoteRef} className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-playfair font-medium text-white/90 leading-relaxed mb-8">
              "In the darkness, we forge light. In silence, we create legends. 
              Every drop carries the weight of tradition, every sip tells a story of power."
            </blockquote>
            <cite className="block text-white/60 font-inter text-lg">
              — Master Distiller, Toronto Underground
            </cite>
          </div>
        </div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid md:grid-cols-3 gap-12 mb-16">
          
          {/* Legacy */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-playfair font-bold text-white mb-4">The Legacy</h4>
            <p className="text-white/70 font-inter leading-relaxed">
              Born from the streets of Toronto, crafted with respect for tradition, 
              and refined through generations of dedication to the art of distillation.
            </p>
          </div>

          {/* Contact */}
          <div className="text-center">
            <h4 className="text-xl font-playfair font-bold text-white mb-6">Connect</h4>
            <div className="flex justify-center space-x-6">
              <a 
                href="https://instagram.com/ladrillocristalpuro"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              <a 
                href="mailto:contact@ladrillocristalpuro.com"
                className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center backdrop-blur-sm hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Tradition */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-playfair font-bold text-white mb-4">The Craft</h4>
            <p className="text-white/70 font-inter leading-relaxed">
              Each bottle represents 15+ years of patience, 7 stages of purification, 
              and the unwavering commitment to excellence that defines our legacy.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center border-t border-white/10 pt-8">
          <p className="text-white/60 font-inter mb-2">
            © 2024 Ladrillo de Cristal Puro. Crafted with tradition, refined by fire.
          </p>
          <p className="text-white/40 font-inter text-sm">
            Please enjoy responsibly. Not for sale to minors.
          </p>
          <div className="mt-4 text-white/30 font-inter text-xs">
            Toronto Distillery Group | Underground Division
          </div>
        </div>
      </div>

      {/* Subtle animation elements */}
      <div className="absolute bottom-0 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse"></div>
      <div className="absolute top-1/4 right-1/3 w-2 h-2 bg-white/10 rounded-full animate-bounce"></div>
    </footer>
  );
};

export default Footer;

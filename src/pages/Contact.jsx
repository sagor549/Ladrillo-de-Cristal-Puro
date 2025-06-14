import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Contact = () => {
  const pageRef = useRef();
  const titleRef = useRef();
  const cardsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Title animation
      tl.fromTo(titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      )
      .fromTo(cardsRef.current.children,
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out"
        },
        "-=0.5"
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-20">
      <div className="container mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 md:mb-16">
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-playfair font-bold text-white mb-4 md:mb-8"
          >
            Contact Us
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/80 font-inter max-w-2xl mx-auto px-2">
            For exclusive inquiries and private collections, reach out through our preferred channels.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          
          {/* Email Card */}
          <div className="bg-glass-white border border-glass-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-sm text-center group hover:bg-white/10 transition-all duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-white mb-3 sm:mb-4">Email</h3>
            <p className="text-white/70 text-sm sm:text-base font-inter mb-4 sm:mb-6">For exclusive inquiries and private orders</p>
            <a 
              href="mailto:contact@ladrillocristalpuro.com"
              className="inline-block bg-white text-black text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-inter font-semibold hover:bg-white/90 transition-all duration-300 hover:scale-105 whitespace-nowrap overflow-hidden text-ellipsis max-w-full"
            >
              contact@ladrillocristalpuro.com
            </a>
          </div>

          {/* Instagram Card */}
          <div className="bg-glass-white border border-glass-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 backdrop-blur-sm text-center group hover:bg-white/10 transition-all duration-500">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </div>
            <h3 className="text-2xl sm:text-3xl font-playfair font-semibold text-white mb-3 sm:mb-4">Instagram</h3>
            <p className="text-white/70 text-sm sm:text-base font-inter mb-4 sm:mb-6">Follow our journey and exclusive releases</p>
            <a 
              href="https://instagram.com/ladrillocristalpuro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-white/30 text-white text-sm sm:text-base px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-inter font-semibold hover:bg-white/10 transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              @ladrillocristalpuro
            </a>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-10 sm:mt-12 md:mt-16">
          <div className="bg-glass-white border border-glass-border rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur-sm max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-playfair font-semibold text-white mb-3 sm:mb-4">Private Collections</h3>
            <p className="text-white/70 text-sm sm:text-base font-inter leading-relaxed">
              For collectors seeking rare vintages or custom engravings, contact us directly. 
              Each bottle tells a story, and we're here to help you write yours.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
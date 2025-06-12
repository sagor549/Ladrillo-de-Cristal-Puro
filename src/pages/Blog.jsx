
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const Blog = () => {
  const pageRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Simple title animation without text plugin
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      )
      .fromTo(contentRef.current,
        { scale: 0, opacity: 0, rotation: -10 },
        { 
          scale: 1, 
          opacity: 1, 
          rotation: 0,
          duration: 1.5,
          ease: "elastic.out(1, 0.5)"
        },
        "-=0.5"
      );

    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen pt-24 sm:pt-32 pb-20 flex items-center justify-center px-4 sm:px-6">
      <div className="container mx-auto text-center max-w-4xl">
        
        <h1 
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-playfair font-bold text-white mb-12 sm:mb-16"
        >
          Coming Soon
        </h1>

        <div ref={contentRef} className="max-w-2xl mx-auto">
          <div className="bg-black/40 border border-white/20 rounded-3xl p-8 sm:p-12 backdrop-blur-sm hover:bg-black/50 transition-all duration-500">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 animate-pulse">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-playfair font-semibold text-white mb-4 sm:mb-6">
              Chronicles of Crystal
            </h2>
            
            <p className="text-white/80 font-playfair text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
              We're crafting stories as refined as our spirits. Soon, you'll discover the legends, 
              the process, and the artisans behind every bottle of Ladrillo de Cristal Puro.
            </p>

            <div className="flex justify-center">
              <div className="bg-white/10 border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 hover:bg-white/15 transition-all duration-300">
                <span className="text-white/60 font-playfair font-medium text-sm sm:text-base">Launch: Spring 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-white/20 rounded-full animate-bounce"></div>

      </div>
    </div>
  );
};

export default Blog;

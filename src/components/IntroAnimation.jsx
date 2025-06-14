import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const IntroAnimation = ({ onComplete }) => {
  const introRef = useRef();
  const logoRef = useRef();
  const presentsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // Fast fade-in for text and logo together
      tl.fromTo([presentsRef.current, logoRef.current], 
        { 
          opacity: 0,
          scale: 0.95
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1
        }
      )
      // Brief hold
      .to({}, { duration: 0.3 })
      // Smooth fade-out
      .to(introRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });

    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={introRef}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center"
    >
      {/* Toronto Distillery Group text */}
      <div 
        ref={presentsRef}
        className="mb-8 text-center"
      >
        <p className="text-white/80 font-inter font-light text-sm sm:text-base tracking-[0.3em] uppercase">
          Toronto Distillery Group
        </p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-2"></div>
      </div>

      {/* Clean logo container without glow effects */}
      <div 
        ref={logoRef}
        className="relative"
      >
        <img 
          src="logoo.png" 
          alt="Ladrillo de Cristal Puro" 
          className="h-32 sm:h-40 md:h-48 w-auto"
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div 
          className="hidden h-32 sm:h-40 md:h-48 w-32 sm:w-40 md:w-48 rounded-full items-center justify-center border border-white/30"
          style={{ display: 'none' }}
        >
          <span className="text-white font-playfair font-bold text-3xl sm:text-4xl md:text-5xl">LCP</span>
        </div>
      </div>
    </div>
  );
};

export default IntroAnimation;
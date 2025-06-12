
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const IntroAnimation = ({ onComplete }) => {
  const introRef = useRef();
  const logoRef = useRef();
  const presentsRef = useRef();
  const curtainRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        }
      });

      // "Toronto Distillery Group" text animation
      tl.fromTo(presentsRef.current,
        { 
          opacity: 0,
          scale: 0.8
        },
        { 
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out"
        }
      )
      // Main logo entrance with more dramatic effect
      .fromTo(logoRef.current,
        { 
          scale: 0, 
          rotation: -540,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0, 
          opacity: 1, 
          duration: 2, 
          ease: "elastic.out(1, 0.8)" 
        },
        "+=0.5"
      )
      // Logo glow pulse
      .to(logoRef.current, {
        filter: "drop-shadow(0 0 30px rgba(255,255,255,0.8))",
        scale: 1.1,
        duration: 0.5,
        yoyo: true,
        repeat: 2,
        ease: "power2.inOut"
      })
      // Fade presents text
      .to(presentsRef.current, {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power2.in"
      }, "+=0.3")
      // Scale and fade logo
      .to(logoRef.current, {
        scale: 0,
        opacity: 0,
        rotation: 180,
        duration: 0.8,
        ease: "power2.in"
      }, "-=0.2")
      // Curtain effect
      .fromTo(curtainRef.current, {
        scaleY: 0,
        transformOrigin: "top"
      }, {
        scaleY: 1,
        duration: 0.6,
        ease: "power2.out"
      }, "+=0.2")
      .to(curtainRef.current, {
        scaleY: 0,
        transformOrigin: "bottom",
        duration: 0.6,
        ease: "power2.in"
      }, "+=0.3")
      // Final fade
      .to(introRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, "-=0.3");

    }, introRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={introRef}
      className="fixed inset-0 bg-black z-[10000] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent animate-pulse"></div>
      
      {/* Toronto Distillery Group text */}
      <div 
        ref={presentsRef}
        className="mb-8 text-center"
      >
        <p className="text-white/70 font-inter font-light text-sm sm:text-base tracking-[0.3em] uppercase">
          Toronto Distillery Group
        </p>
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent mx-auto mt-2"></div>
      </div>

      {/* Logo container */}
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
          className="hidden h-32 sm:h-40 md:h-48 w-32 sm:w-40 md:w-48  rounded-full items-center justify-center border "
          style={{ display: 'none' }}
        >
          <span className="text-white font-playfair font-bold text-3xl sm:text-4xl md:text-5xl">LCP</span>
        </div>
        
        {/* Multiple glow effects for more dramatic effect */}
        <div className="absolute inset-0 via-transparent to-transparent rounded-full blur-3xl"></div>
        <div className="absolute inset-0  rounded-full blur-2xl animate-spin opacity-50" style={{ animationDuration: '8s' }}></div>
      </div>

      {/* Curtain effect */}
      <div 
        ref={curtainRef}
        className="absolute inset-0 bg-black"
        style={{ scaleY: 0, transformOrigin: 'top' }}
      ></div>

      {/* Particle effects */}
      <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
      <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/50 rounded-full animate-bounce"></div>
      <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default IntroAnimation;

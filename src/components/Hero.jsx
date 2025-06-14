// components/Hero.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Hero = () => {
  const [showBottle, setShowBottle] = useState(false);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const spinTextRef1 = useRef(null);
  const spinTextRef2 = useRef(null);

  // Open/close bottle image
  const toggleBottle = () => setShowBottle(!showBottle);

  useEffect(() => {
    // Text reveal animation
    gsap.from(textRef.current.children, {
      duration: 1.5,
      opacity: 0,
      y: 50,
      stagger: 0.2,
      ease: "power3.out",
      delay: 0.5
    });

    // Spin text animation for both parts
    const animateSpinText = (ref) => {
      if (ref.current && ref.current.children) {
        const spinChars = ref.current.children;
        gsap.set(spinChars, { perspective: 400, transformStyle: "preserve-3d" });
        
        gsap.from(spinChars, {
          duration: 1.2,
          rotationX: 90,
          transformOrigin: "50% 0%",
          stagger: 0.05,
          opacity: 0,
          ease: "expo.out",
          delay: 1.2
        });
      }
    };

    animateSpinText(spinTextRef1);
    animateSpinText(spinTextRef2);

    // Parallax effect
    const parallax = gsap.to(textRef.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    return () => parallax.kill();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden cursor-pointer "
      onClick={toggleBottle}  
    >
      {/* Background images */}
      <div className="absolute inset-0">
        {/* Background for both mobile and desktop */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 "
          style={{ backgroundImage: "url('/opp.png')" }} 
        />
      </div>
      
     
      
      
      
      {/* Content */}
      <div 
        ref={textRef}
        className="relative z-20 h-full flex flex-col justify-between p-6 md:p-12"
      >
        {/* Top text - centered */}
        <div className=" text-center md:text-left mt-20 md:mt-48">
          <p className="text-white font-light tracking-[0.2em] text-sm md:text-base uppercase">
            Toronto Distillery Group Presents
          </p>
        </div>
        
        {/* Desktop layout - hidden on mobile */}
        <div className="hidden md:flex absolute inset-0 flex-col items-center md:items-start justify-end pb-12 md:pb-10 md:ml-40">
          {/* First two words */}
          <div className="overflow-hidden w-full text-center md:text-left mb-44 md:mb-40 md:ml-3 md:relative md:top-56 md:right-7">
            <h1 
              ref={spinTextRef1}
              className="font-serif text-white text-5xl md:text-7xl lg:text-9xl leading-[0.9]"
            >
              {'Ladrillo De'.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="block italic"
                  style={{ 
                    fontVariationSettings: '"wght" 800'
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
          
          {/* Bottle image - desktop only (larger size) */}
          <div className="hidden md:block absolute top-96 mt-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <img 
              src="/bottle.png" 
              alt="Ladrillo de Cristal Puro Tequila Bottle"
              className="max-h-[90vh]"
            />
          </div>
          
          {/* Last two words */}
          <div className="overflow-hidden w-full text-center md:self-end md:w-auto mt-2 md:mt-4 md:mr-12">
            <h1 
              ref={spinTextRef2}
              className="font-serif text-white text-4xl md:text-6xl lg:text-8xl leading-[0.9]"
            >
              {'Cristal Puro'.split(' ').map((word, i) => (
                <span 
                  key={i} 
                  className="block italic md:text-right"
                  style={{ 
                    fontVariationSettings: '"wght" 600'
                  }}
                >
                  {word}
                </span>
              ))}
            </h1>
          </div>
        </div>
        
        {/* Mobile layout - shown on mobile */}
        <div className="md:hidden flex flex-col flex-1 justify-center items-center ">
          {/* Title container */}
          <div className="w-full mb-4">
            {/* First title part - left aligned */}
            <div className="relative top-10 text-left">
              <h1 
                ref={spinTextRef1}
                className="font-serif text-white text-5xl leading-[0.9]"
              >
                {'Ladrillo De'.split(' ').map((word, i) => (
                  <span 
                    key={i} 
                    className="block italic"
                    style={{ 
                      fontVariationSettings: '"wght" 800'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>
            
            {/* Second title part - right aligned */}
            <div className="overflow-hidden text-right mt-2">
              <h1 
                ref={spinTextRef2}
                className="font-serif text-white text-4xl leading-[0.9]"
              >
                {'Cristal Puro'.split(' ').map((word, i) => (
                  <span 
                    key={i} 
                    className="block italic"
                    style={{ 
                      fontVariationSettings: '"wght" 600'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>
          </div>
          
          {/* Bottle image - mobile */}
          <div className="flex justify-center my-4">
            <img 
              src="/bottle.png" 
              alt="Ladrillo de Cristal Puro Tequila Bottle"
              className="max-h-[60vh] relative bottom-32"
            />
          </div>
        </div>
        
        {/* Bottom text - position adjusted for mobile */}
        <div className="relative bottom-40 md:bottom-0 text-center md:text-left">
          <div className="relative inline-block  md:mt-0">
            
            <p className="text-white text-sm md:text-base px-4 relative z-10 inline-block  max-w-md font-light tracking-wider italic ">
              Crafted with centuries-old traditions, our premium tequila embodies the spirit of Mexico's highlands.
            </p>
          </div>
        </div>
      </div>
      
      {/* Bottle Modal - fixed close functionality */}
      {showBottle && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={toggleBottle}
        >
          <div className="relative w-full max-w-2xl flex items-center justify-center">
            <img 
              src="/bottle.png" 
              alt="Ladrillo de Cristal Puro Tequila Bottle"
              className="max-h-[80vh] object-contain"
            />
          </div>
          
          {/* Close hint */}
          <p className="mt-6 text-white/80 text-sm tracking-wider">
            Click anywhere to close
          </p>
        </div>
      )}
    </section>
  );
};

export default Hero;
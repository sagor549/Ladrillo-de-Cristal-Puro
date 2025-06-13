import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const About = () => {
  const sectionRef = useRef();
  const imageRef = useRef();
  const headingRef = useRef();
  const contentRef = useRef();
  const newContentRef = useRef();
  const underlineRef = useRef();
  const accentLineRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    const ctx = gsap.context(() => {
      // Parallax effect for image
      gsap.to(imageRef.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Split text animation for heading
      const splitHeading = new SplitText(headingRef.current, {
        type: "chars,words",
        wordsClass: "word",
        charsClass: "char"
      });

      gsap.from(splitHeading.chars, {
        opacity: 0,
        y: 20,
        rotationX: 180,
        stagger: 0.02,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
        }
      });

      // Animated underline
      gsap.fromTo(underlineRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          }
        }
      );

      // Accent line animation
      gsap.fromTo(accentLineRef.current,
        { width: 0 },
        {
          width: "6rem",
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: accentLineRef.current,
            start: "top 90%",
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current.children,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // New content animation
      gsap.fromTo(newContentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: newContentRef.current,
            start: "top 85%",
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-32 relative overflow-hidden bg-black/95 backdrop-blur-sm"
    >
      {/* Subtle texture */}
      <div className="absolute inset-0 opacity-[8%] bg-[url('/bg.jpg')] bg-cover"></div>
      
      {/* Glowing accents */}
      <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-blue-900/20 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-[15%] right-[15%] w-48 h-48 bg-amber-900/15 rounded-full blur-[80px]"></div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-block mb-8">
            <span className="text-white/60 font-inter font-medium text-sm tracking-[0.3em] uppercase">
              Underground Legacy
            </span>
            <div 
              ref={accentLineRef}
              className="h-px bg-gradient-to-r from-white/40 to-transparent mt-4 mx-auto"
            ></div>
          </div>
          
          <div className="relative mb-16">
            <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight">
              Forged in Shadow, <br className="hidden sm:block"/>
              <span className="text-white/80 relative inline-block mt-2">
                Perfected in Silence
                <div 
                  ref={underlineRef}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-white/60 via-white/40 to-transparent"
                  style={{ width: '100%' }}
                ></div>
              </span>
            </h2>
          </div>

          {/* Main Image */}
          <div 
            ref={imageRef}
            className="w-full max-w-2xl mb-20"
          >
            <img 
              src="/fin.png" 
              alt="Ladrillo de Cristal Puro" 
              className="w-full h-auto object-contain max-h-[70vh]"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjUwMCIgdmlld0JveD0iMCAwIDMwMCA1MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI1MDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PHRleHQgeD0iMTUwIiB5PSIyNTAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iaW50ZXIiIGZvbnQtc2l6ZT0iMTgiPlByb2R1Y3QgSW1hZ2U8L3RleHQ+PC9zdmc+';
              }}
            />
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="max-w-3xl space-y-8">
            <p className="text-xl text-white/85 font-inter leading-relaxed">
              Born from ancient traditions of Toronto's underground distillers, Ladrillo de Cristal Puro represents the pinnacle of forbidden craftsmanship.
            </p>
            
            <p className="text-lg text-white/70 font-inter leading-relaxed">
              Our process remains unchanged since the prohibition era—a perfect balance between purity and power through proprietary 7-stage filtration.
            </p>

            <div className="relative pl-6 border-l-2 border-white/20 mt-12 mx-auto max-w-md">
              <p className="text-base text-white/60 font-inter leading-relaxed italic">
                "In shadows where tradition meets rebellion, we continue the sacred art of liquid alchemy."
              </p>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div ref={newContentRef} className="mt-40 flex flex-col items-center">
          {/* Second Image */}
          <div className="w-full max-w-2xl mb-20">
            <img 
              src="/bt1.png" 
              alt="Underground Distillery"
              className="w-full h-auto object-contain max-h-[60vh]"
            />
          </div>

          <div className="text-center max-w-3xl space-y-8">
            <h3 className="text-3xl lg:text-4xl font-playfair font-bold text-white/90 leading-tight">
              Beneath the City Streets
            </h3>
            
            <p className="text-lg text-white/75 font-inter leading-relaxed">
              In chambers untouched by time, our copper stills transform the purest grains into liquid fire. The slow distillation process captures complex notes of caramelized pear, smoked vanilla, and ancient oak.
            </p>
            
            <div className="relative inline-block mt-12">
              <p className="text-xl text-white/80 font-inter leading-relaxed italic">
                "We don't just distill spirits—we capture lightning in a bottle."
              </p>
              <p className="text-sm text-white/50 font-inter mt-4">
                - Master Distiller's Journal, 1947
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
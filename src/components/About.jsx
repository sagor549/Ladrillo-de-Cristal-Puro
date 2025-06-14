import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  const sectionRef = useRef();
  const imageRef = useRef();
  const headingRef = useRef();
  const contentRef = useRef();
  const newContentRef = useRef();
  const underlineRef = useRef();
  const accentLineRef = useRef();
  const floatingRefs = useRef([]);
  const parallaxRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax background effect
      gsap.to(parallaxRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

      // Floating particles animation
      floatingRefs.current.forEach((el, i) => {
        const duration = 8 + Math.random() * 4;
        const y = 30 + Math.random() * 40;
        
        gsap.to(el, {
          y: -y,
          x: i % 2 === 0 ? 15 : -15,
          duration: duration,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      // Split text animation for heading
      const splitHeading = new SplitText(headingRef.current, {
        type: "chars,words",
        wordsClass: "word",
        charsClass: "char"
      });

      gsap.from(splitHeading.chars, {
        opacity: 0,
        y: 30,
        rotationX: 180,
        stagger: 0.03,
        duration: 0.7,
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
          duration: 1.4,
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
          duration: 1,
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

      // Parallax effect for main image
      gsap.to(imageRef.current, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="py-14 relative overflow-hidden bg-black/95 backdrop-blur-sm"
    >
      {/* Subtle moving background */}
      <div 
        ref={parallaxRef}
        className="absolute inset-0 opacity-[0.04] bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center"
      ></div>
      
      {/* Glowing accents */}
      <div className="absolute top-1/4 left-[10%] w-64 h-64 bg-blue-00/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="absolute bottom-[15%] right-[15%] w-48 h-48 bg-amber-900/15 rounded-full blur-[80px] animate-pulse-slow"></div>
      
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <div 
          key={i}
          ref={el => floatingRefs.current[i] = el}
          className="absolute rounded-full opacity-10"
          style={{
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            width: `${2 + Math.random() * 6}px`,
            height: `${2 + Math.random() * 6}px`,
            backgroundColor: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#fbbf24' : '#f87171'
          }}
        ></div>
      ))}

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col items-center text-center mb-24">
          <div className="inline-block mb-12">
            <span className="text-white/60 font-sans font-medium text-sm tracking-[0.3em] uppercase">
              Underground Legacy
            </span>
            <div 
              ref={accentLineRef}
              className="h-px bg-gradient-to-r from-white/40 to-transparent mt-4 mx-auto"
            ></div>
          </div>
          
          <div className="relative mb-16">
            <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight tracking-tight">
              Forged in Shadow, <br className="hidden sm:block"/>
              <span className="text-white/80 relative inline-block mt-3">
                Perfected in Silence
                <div 
                  ref={underlineRef}
                  className="absolute -bottom-3 left-0 h-0.5 bg-gradient-to-r from-white/60 via-white/40 to-transparent"
                  style={{ width: '100%' }}
                ></div>
              </span>
            </h2>
          </div>

          {/* Main Image */}
          <div 
            ref={imageRef}
            className="w-full max-w-2xl mb-20 rounded-xl overflow-hidden shadow-2xl border border-white/10"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img 
                src="finn.png" 
                alt="Ladrillo de Cristal Puro" 
                className="  "
              />
            </div>
          </div>

          {/* Text Content */}
          <div ref={contentRef} className="max-w-3xl space-y-8">
            <p className="text-xl text-white/85 font-sans leading-relaxed tracking-wide">
              Born from ancient traditions of Toronto's underground distillers, Ladrillo de Cristal Puro represents the pinnacle of forbidden craftsmanship.
            </p>
            
            <p className="text-lg text-white/70 font-sans leading-relaxed tracking-wide">
              Our process remains unchanged since the prohibition era—a perfect balance between purity and power through proprietary 7-stage filtration.
            </p>

            <div className="relative pl-6 border-l-2 border-white/20 mt-12 mx-auto max-w-md">
              <svg className="absolute left-[-8px] top-0 w-4 h-4 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg text-white/60 font-sans leading-relaxed tracking-wide italic">
                "In shadows where tradition meets rebellion, we continue the sacred art of liquid alchemy."
              </p>
            </div>
          </div>
        </div>

        {/* Additional Content Section */}
        <div ref={newContentRef} className="mt-40 flex flex-col items-center">
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
              <img 
                src="fin.png" 
                alt="Underground Distillery"
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            
            <div className="text-left space-y-8">
              <h3 className="text-3xl lg:text-4xl font-serif font-bold text-white/90 leading-tight tracking-tight">
                Beneath the City Streets
              </h3>
              
              <p className="text-lg text-white/75 font-sans leading-relaxed tracking-wide">
                In chambers untouched by time, our copper stills transform the purest grains into liquid fire. The slow distillation process captures complex notes of caramelized pear, smoked vanilla, and ancient oak.
              </p>
              
              <div className="relative mt-8 p-6 bg-black/30 backdrop-blur-sm rounded-xl border border-white/10">
                <svg className="absolute left-6 top-[-16px] w-8 h-8 text-amber-500/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-xl text-white/80 font-sans leading-relaxed tracking-wide italic">
                  "We don't just distill spirits—we capture lightning in a bottle."
                </p>
                <p className="text-sm text-white/50 font-sans mt-4 tracking-wider">
                  — Master Distiller's Journal, 1947
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
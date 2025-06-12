import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModernizeSection = () => {
  const sectionRef = useRef();
  const subtitleRef = useRef();
  const mainTitleRef = useRef();
  const descriptionRef = useRef();
  const cursorRef = useRef();
  const navLinksRef = useRef([]);
  const cursorMediasRef = useRef([]);
  const underlineRefs = useRef([]);
  
  // State for active hover image
  const [activeImage, setActiveImage] = useState(null);

  // Image data for cursor hover
  const hoverImages = [
    {
      src: "/bt.png",
      alt: "Laboratory Equipment",
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5MYWJvcmF0b3J5PC90ZXh0Pjwvc3ZnPg=='
    },
    {
      src: "/bottle.png",
      alt: "Crystal Production",
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5Qcm9kdWN0aW9uPC90ZXh0Pjwvc3ZnPg=='
    },
    {
      src: "/bottle3.png",
      alt: "Distribution Network",
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5OZXR3b3JrPC90ZXh0Pjwvc3ZnPg=='
    },
    {
      src: "/darkbottle.png",
      alt: "Quality Control",
      fallback: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iODAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjE0Ij5RdWFsaXR5PC90ZXh0Pjwvc3ZnPg=='
    }
  ];

  const navItems = [
    { text: "Laboratory", icon: "fas fa-flask" },
    { text: "Production", icon: "fas fa-industry" },
    { text: "Distribution", icon: "fas fa-truck" },
    { text: "Quality Control", icon: "fas fa-certificate" }
  ];

  useEffect(() => {
    let ctx;
    let cursorTl;
    let setCursorX, setCursorY;
    
    const handleMouseMove = (e) => {
      if (setCursorX && setCursorY) {
        setCursorX(e.clientX);
        setCursorY(e.clientY);
      }
    };

    if (sectionRef.current) {
      ctx = gsap.context(() => {
        // Initialize cursor
        gsap.set(cursorRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0
        });

        // Faster cursor follow
        setCursorX = gsap.quickTo(cursorRef.current, "x", {
          duration: 0.4, // Increased speed
          ease: "power2.out"
        });

        setCursorY = gsap.quickTo(cursorRef.current, "y", {
          duration: 0.4, // Increased speed
          ease: "power2.out"
        });

        // Split text animation for main title
        const mainTitleText = mainTitleRef.current.textContent;
        mainTitleRef.current.innerHTML = mainTitleText.split('').map(char => 
          char === ' ' ? '<span>&nbsp;</span>' : `<span class="char">${char}</span>`
        ).join('');

        const chars = mainTitleRef.current.querySelectorAll('.char');
        
        // Main animation timeline with ScrollTrigger
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%", // Trigger earlier
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        });
        
        tl.fromTo(subtitleRef.current,
          { y: -30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" } // Faster animation
        )
        .fromTo(chars, 
          { y: 100, opacity: 0, rotationX: -90 },
          { 
            y: 0, 
            opacity: 1, 
            rotationX: 0,
            duration: 1.0, // Faster animation
            stagger: 0.015, // Increased stagger speed
            ease: "power3.out"
          },
          "-=0.2"
        )
        .fromTo(descriptionRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, // Faster
          "-=0.4"
        )
        .fromTo(navLinksRef.current,
          { y: 30, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 0.7,
            stagger: 0.08, // Faster stagger
            ease: "power3.out" 
          },
          "-=0.3"
        )
        .fromTo(underlineRefs.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: "power2.out"
          },
          "-=0.5"
        );

        // Cursor hover timeline
        cursorTl = gsap.timeline({ paused: true });
        cursorTl.to(cursorRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.3, // Faster animation
          ease: "expo.inOut"
        });

        // Add hover events to nav links
        navLinksRef.current.forEach((navLink, i) => {
          if (navLink) {
            navLink.addEventListener("mouseenter", () => {
              setActiveImage(i);
              cursorTl.play();
            });

            navLink.addEventListener("mouseleave", () => {
              cursorTl.reverse();
              setActiveImage(null);
            });
          }
        });
      }, sectionRef);

      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      if (ctx) ctx.revert();
      window.removeEventListener("mousemove", handleMouseMove);
      
      // Clean up nav link event listeners
      navLinksRef.current.forEach(navLink => {
        if (navLink) {
          navLink.removeEventListener("mouseenter", () => {});
          navLink.removeEventListener("mouseleave", () => {});
        }
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-black/90 backdrop-blur-sm border-b border-white/5 relative overflow-hidden py-20 px-4 sm:px-6"
    >
      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-48 h-36 pointer-events-none z-50 rounded-lg overflow-hidden shadow-2xl"
        style={{ 
          mixBlendMode: 'normal',
          transform: 'translate(-50%, -50%)'
        }}
      >
        {hoverImages.map((image, index) => (
          <img
            key={index}
            ref={el => cursorMediasRef.current[index] = el}
            src={image.src}
            alt={image.alt}
            className={`cursor-media absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${activeImage === index ? 'opacity-100' : 'opacity-0'}`}
            onError={(e) => {
              if (e.target.src !== image.fallback) {
                e.target.src = image.fallback;
              }
            }}
          />
        ))}
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" ></div>
      </div>

      {/* Decorative Box Frame */}
      <div className="absolute inset-8 sm:inset-12 lg:inset-16">
        {/* Top border */}
        <div className="absolute top-0 left-0 right-0 flex justify-center">
          <div className="flex items-center">
            <div className="w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="w-px h-16 bg-gradient-to-b from-gray-400 to-transparent mx-4"></div>
            <div className="w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>
        
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center">
          <div className="flex items-center">
            <div className="w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
            <div className="w-px h-16 bg-gradient-to-t from-gray-400 to-transparent mx-4"></div>
            <div className="w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 py-16">
        <div className="flex flex-col items-center text-center">
          
          {/* Subtitle */}
          <div 
            ref={subtitleRef}
            className="mb-8 opacity-0"
          >
            <p className="text-gray-400 font-light text-sm tracking-[0.4em] uppercase">
              OUR ONGOING PURSUIT
            </p>
          </div>

          {/* Main Title */}
          <h2 
            ref={mainTitleRef}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-12 leading-tight max-w-5xl"
          >
            MODERNIZE AND LIBERATE THE CRYSTAL INDUSTRY
          </h2>

          {/* Description */}
          <div 
            ref={descriptionRef}
            className="opacity-0 mb-16 max-w-3xl"
          >
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              IT'S NOT ABOUT FINDING A NEW LOOK.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              IT'S ABOUT BRINGING THE POWER OF CREATION BACK TO THE PEOPLE.
            </p>
          </div>

          {/* Navigation Links - Column Style */}
          <nav className="w-full max-w-2xl">
            <div className="flex flex-col space-y-1">
              {navItems.map((item, index) => (
                <div key={index} className="relative py-4">
                  <a
                    href="#"
                    ref={el => navLinksRef.current[index] = el}
                    className="nav-link group flex items-center justify-center opacity-0 text-center py-2 px-4 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <i className={`${item.icon} text-xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300`}></i>
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-lg">
                        {item.text}
                      </span>
                    </div>
                  </a>
                  <div 
                    ref={el => underlineRefs.current[index] = el}
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent origin-left scale-x-0"
                  ></div>
                </div>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ModernizeSection;
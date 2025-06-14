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
const particlesRef = useRef([]);
const parallaxElementsRef = useRef([]);

const [activeImage, setActiveImage] = useState(null);
const [isTouchDevice, setIsTouchDevice] = useState(false);

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
src: "/don.png",
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
setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);


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
    // Initialize cursor only for non-touch devices
    if (!isTouchDevice) {
      gsap.set(cursorRef.current, {
        xPercent: -50,
        yPercent: -50,
        scale: 0,
        opacity: 0
      });

      setCursorX = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.4,
        ease: "power2.out"
      });

      setCursorY = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.4,
        ease: "power2.out"
      });
    }

    // Split text animation for main title
    const mainTitleText = mainTitleRef.current.textContent;
    mainTitleRef.current.innerHTML = mainTitleText.split('').map(char => 
      char === ' ' ? '<span>&nbsp;</span>' : `<span class="char">${char}</span>`
    ).join('');

    const chars = mainTitleRef.current.querySelectorAll('.char');
    
    // Parallax effect for background elements
    gsap.to(parallaxElementsRef.current, {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    // Main animation timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    tl.fromTo(subtitleRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    )
    .fromTo(chars, 
      { y: 100, opacity: 0, rotationX: -90 },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1.0,
        stagger: 0.015,
        ease: "power3.out"
      },
      "-=0.2"
    )
    .fromTo(descriptionRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    )
    .fromTo(navLinksRef.current,
      { y: 30, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.7,
        stagger: 0.08,
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

    // Create floating particles
    particlesRef.current = gsap.utils.toArray('.particle');
    particlesRef.current.forEach((particle, i) => {
      const duration = 10 + Math.random() * 10;
      const delay = Math.random() * 5;
      const y = 50 + Math.random() * 100;
      
      gsap.to(particle, {
        y: `+=${y}`,
        x: `+=${Math.random() * 40 - 20}`,
        rotation: Math.random() * 360,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: delay
      });
    });

    // Add pulsing animation to decorative lines
    gsap.to('.decorative-line', {
      opacity: 0.7,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Cursor hover timeline (only for non-touch devices)
    if (!isTouchDevice) {
      cursorTl = gsap.timeline({ paused: true });
      cursorTl.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
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
    }
  }, sectionRef);

  if (!isTouchDevice) {
    window.addEventListener("mousemove", handleMouseMove);
  }
}

return () => {
  if (ctx) ctx.revert();
  if (!isTouchDevice) {
    window.removeEventListener("mousemove", handleMouseMove);
  }
  
  // Clean up nav link event listeners
  navLinksRef.current.forEach(navLink => {
    if (navLink && !isTouchDevice) {
      navLink.removeEventListener("mouseenter", () => {});
      navLink.removeEventListener("mouseleave", () => {});
    }
  });
};


}, [isTouchDevice]);

// Generate particles for background
const renderParticles = () => {
const particles = [];
for (let i = 0; i < 20; i++) {
particles.push(
<div
key={i}
ref={el => parallaxElementsRef.current[i] = el}
className="particle absolute rounded-full opacity-10"
style={{
width: `${2 + Math.random() * 3}px`,
height: `${2 + Math.random() * 3}px`,
backgroundColor: '#ffffff',
top: `${Math.random() * 100}%`,
left: `${Math.random() * 100}%`,
}}
/>
);
}
return particles;
};

return (
<section 
ref={sectionRef}
className="min-h-screen bg-black/90 backdrop-blur-sm border-b border-white/5 relative overflow-hidden  md:py-14 px-4 sm:px-6"
>
{/* Floating Particles Background */}
<div className="absolute inset-0 overflow-hidden pointer-events-none">
{renderParticles()}
</div>


  {/* Custom Cursor (only for non-touch devices) */}
  {!isTouchDevice && (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-36 h-28 md:w-48 md:h-36 pointer-events-none z-50 rounded-lg overflow-hidden shadow-2xl"
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
  )}

  {/* Decorative Box Frame with Glowing Lines */}
  <div className="absolute inset-4 sm:inset-8 lg:inset-16">
    {/* Top border with glow effect */}
    <div className="absolute top-0 left-0 right-0 flex justify-center">
      <div className="flex items-center">
        <div className="w-16 sm:w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent decorative-line" 
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
        <div className="w-px h-8 sm:h-12 md:h-16 bg-gradient-to-b from-white to-transparent mx-2 sm:mx-4 decorative-line"
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
        <div className="w-16 sm:w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent decorative-line" 
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
      </div>
    </div>
    
    {/* Bottom border with glow effect */}
    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
      <div className="flex items-center">
        <div className="w-16 sm:w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent decorative-line" 
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
        <div className="w-px h-8 sm:h-12 md:h-16 bg-gradient-to-t from-white to-transparent mx-2 sm:mx-4 decorative-line"
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
        <div className="w-16 sm:w-32 lg:w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent decorative-line" 
             style={{ boxShadow: '0 0 8px rgba(255,255,255,0.5)' }}></div>
      </div>
    </div>
  </div>

  <div className="container mx-auto max-w-6xl relative z-10 py-12 md:py-16">
    <div className="flex flex-col items-center text-center">
      
      {/* Subtitle */}
      <div 
        ref={subtitleRef}
        className="mb-6 md:mb-8 opacity-0"
      >
        <p className="text-gray-400 font-light text-xs sm:text-sm tracking-[0.3em] sm:tracking-[0.4em] uppercase">
          OUR ONGOING PURSUIT
        </p>
      </div>

      {/* Main Title - Split into 2 centered lines */}
      <h2 
        ref={mainTitleRef}
        className="text-xl sm:text-xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-8 md:mb-12 leading-tight text-white text-center w-full"
        style={{ 
          lineHeight: '1.8',
          letterSpacing: '-0.02em'
        }}
      >
        MODERNIZE AND LIBERATE
      </h2>
      
      {/* Description */}
      <div 
        ref={descriptionRef}
        className="opacity-0 mb-10 md:mb-16 max-w-3xl text-center"
      >
        <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
          IT'S NOT ABOUT FINDING A NEW LOOK.
        </p>
        <p className="text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed">
          IT'S ABOUT BRINGING THE POWER OF CREATION BACK TO THE PEOPLE.
        </p>
      </div>

      {/* Navigation Links - Column Style */}
      <nav className="w-full max-w-2xl">
        <div className="flex flex-col space-y-1">
          {navItems.map((item, index) => (
            <div key={index} className="relative py-2 md:py-4">
              <a
                href="#"
                ref={el => navLinksRef.current[index] = el}
                className="nav-link group flex items-center justify-center opacity-0 text-center py-2 px-4 transition-all duration-300"
                onMouseEnter={isTouchDevice ? () => setActiveImage(index) : undefined}
                onMouseLeave={isTouchDevice ? () => setActiveImage(null) : undefined}
                onClick={isTouchDevice ? () => setActiveImage(activeImage === index ? null : index) : undefined}
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <i className={`${item.icon} text-lg sm:text-xl text-gray-400 group-hover:text-yellow-400 transition-colors duration-300`}></i>
                  <span className="text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-base sm:text-lg">
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

  {/* Mobile Image Preview */}
  {isTouchDevice && activeImage !== null && (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg z-40 p-4 border-t border-white/10 transition-transform duration-300 transform translate-y-0">
      <div className="container mx-auto max-w-md">
        <div className="flex flex-col items-center">
          <img
            src={hoverImages[activeImage].src}
            alt={hoverImages[activeImage].alt}
            className="w-full max-h-40 object-contain mb-3"
            onError={(e) => {
              if (e.target.src !== hoverImages[activeImage].fallback) {
                e.target.src = hoverImages[activeImage].fallback;
              }
            }}
          />
          <p className="text-gray-300 text-sm text-center">
            {hoverImages[activeImage].alt}
          </p>
        </div>
      </div>
    </div>
  )}
</section>


);
};

export default ModernizeSection;
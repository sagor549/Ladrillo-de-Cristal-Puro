import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const Hero = () => {
const heroRef = useRef();
const presentsRef = useRef();
const titleRef = useRef();
const subtitleRef = useRef();
const bottleRef = useRef();
const descriptionRef = useRef();
const [showModal, setShowModal] = useState(false);

useEffect(() => {
const ctx = gsap.context(() => {
// Split text animation for title
const titleText = titleRef.current.textContent;
titleRef.current.innerHTML = titleText
  .split('')
  .map(char => 
    char === ' ' ? '<span> </span>' : `<span class="char">${char}</span>`
  )
  .join('');



  const chars = titleRef.current.querySelectorAll('.char');
  
  // Main hero animation sequence
  const tl = gsap.timeline({ delay: 0.8 });
  
  tl.fromTo(presentsRef.current,
    { y: -20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
  )
  .fromTo(chars, 
    { y: 80, opacity: 0, rotationX: -90 },
    { 
      y: 0, 
      opacity: 1, 
      rotationX: 0,
      duration: 1,
      stagger: 0.03,
      ease: "power3.out"
    },
    "-=0.3"
  )
  .fromTo(subtitleRef.current,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    "-=0.4"
  )
  .fromTo(bottleRef.current,
    { scale: 0.8, opacity: 0 },
    { 
      scale: 1, 
      opacity: 1, 
      duration: 1.2, 
      ease: "power3.out" 
    },
    "-=0.5"
  )
  .fromTo(descriptionRef.current,
    { y: 20, opacity: 0 },
    { 
      y: 0, 
      opacity: 1,
      duration: 0.6,
      ease: "power2.out"
    },
    "-=0.3"
  );

}, heroRef);

return () => ctx.revert();


}, []);

const openModal = () => {
setShowModal(true);
document.body.style.overflow = 'hidden';
};

const closeModal = () => {
setShowModal(false);
document.body.style.overflow = 'unset';
};

return (
<>
<section 
ref={heroRef} 
className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6"
>
{/* Background Image with Blur Overlay */}
<div className="absolute inset-0 z-0">
<div
className="w-full h-full bg-cover bg-center"
style={{ backgroundImage: "url('/bgg.png')" }}
/>
<div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
</div>


    {/* Content Container */}
    <div className="container mx-auto max-w-7xl relative z-10 py-8 lg:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between min-h-[90vh] lg:min-h-0">
        
        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden w-full flex flex-col items-center text-center space-y-6">
          {/* Presents Text */}
          <div 
            ref={presentsRef}
            className="opacity-0"
          >
            <p className="text-gray-300 font-light text-xs tracking-[0.3em] uppercase mb-2">
              <i className="fas fa-crown mr-2"></i>
              Underground Empire Presents
            </p>
            <div className="w-20 h-0.5 bg-gradient-to-r from-gray-400 to-transparent mx-auto"></div>
          </div>

          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-3xl sm:text-4xl font-serif font-bold text-white leading-tight"
          >
            Ladrillo de Cristal Puro
          </h1>

          {/* Bottle - Mobile */}
          <div 
            ref={bottleRef}
            className="w-full max-w-[200px] cursor-pointer transform transition-transform hover:scale-105"
            onClick={openModal}
          >
            <img 
              src="bottle.png" 
              alt="Ladrillo de Cristal Puro Bottle" 
              className="w-full h-auto object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDIwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjEwMCIgeT0iMjAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIxNiI+Qm90dGxlPC90ZXh0Pjwvc3ZnPg==';
              }}
            />
          </div>

          {/* Subtitle */}
          <p 
            ref={subtitleRef}
            className="text-sm text-gray-300 font-light leading-relaxed"
          >
            Forged in shadow, perfected in silence
          </p>

          {/* Description */}
          <div 
            ref={descriptionRef}
            className="opacity-0 space-y-3 text-xs text-gray-400"
          >
            <p className="flex items-center justify-center">
              <i className="fas fa-fire mr-2"></i>
              99.8% Pure Crystal Formula
            </p>
            <p className="flex items-center justify-center">
              <i className="fas fa-shield-alt mr-2"></i>
              Laboratory Grade Precision
            </p>
            <p className="flex items-center justify-center">
              <i className="fas fa-gem mr-2"></i>
              Underground Exclusive
            </p>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex w-full items-center justify-between">
          
          {/* Text Content - Desktop */}
          <div className="text-left w-1/2 pr-12">
            <div 
              ref={presentsRef}
              className="mb-8 opacity-0"
            >
              <p className="text-gray-300 font-light text-sm tracking-[0.3em] uppercase mb-3">
                <i className="fas fa-crown mr-3"></i>
                Underground Empire Presents
              </p>
              <div className="w-24 h-0.5 bg-gradient-to-r from-gray-400 to-transparent"></div>
            </div>

            <h1 
              ref={titleRef}
              className="text-6xl xl:text-7xl font-serif font-bold text-white mb-6 leading-tight"
            >
              Ladrillo de Cristal Puro
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-gray-200 font-light mb-8 leading-relaxed"
            >
              Forged in shadow, perfected in silence. Where purity meets power, legends are born.
            </p>

            <div 
              ref={descriptionRef}
              className="opacity-0 space-y-4 text-gray-400"
            >
              <div className="grid grid-cols-1 gap-4">
                <p className="flex items-center text-sm">
                  <i className="fas fa-fire mr-3 text-orange-400"></i>
                  99.8% Pure Crystal Formula - Unmatched Clarity
                </p>
                <p className="flex items-center text-sm">
                  <i className="fas fa-shield-alt mr-3 text-blue-400"></i>
                  Laboratory Grade Precision - Every Batch Tested
                </p>
                <p className="flex items-center text-sm">
                  <i className="fas fa-gem mr-3 text-purple-400"></i>
                  Underground Exclusive - Limited Production
                </p>
                <p className="flex items-center text-sm">
                  <i className="fas fa-lock mr-3 text-red-400"></i>
                  Encrypted Distribution Network
                </p>
              </div>
            </div>
          </div>

          {/* Bottle Image - Desktop */}
          <div 
            ref={bottleRef}
            className="w-1/2 flex justify-center"
          >
            <div 
              className="relative w-full max-w-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
              onClick={openModal}
            >
              <img 
                src="bottle.png" 
                alt="Ladrillo de Cristal Puro Bottle" 
                className="w-full h-auto max-h-[80vh] object-contain drop-shadow-2xl"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDMwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjE1MCIgeT0iMzAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIyNCI+Qm90dGxlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              
              {/* Click to expand hint */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs px-3 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
                <i className="fas fa-expand mr-1"></i>
                Click to expand
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Scroll Indicator */}
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
        <div className="w-1 h-2 bg-gray-400 rounded-full mt-2 animate-pulse" />
      </div>
    </div>
  </section>

  {/* Modal for Full Bottle Image */}
  {showModal && (
    <div 
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
      onClick={closeModal}
    >
      <div className="relative max-w-4xl max-h-full">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute -top-12 right-0 text-white text-2xl hover:text-gray-300 transition-colors z-10"
        >
          <i className="fas fa-times"></i>
        </button>
        
        {/* Full Size Bottle Image */}
        <div className="relative">
          <img 
            src="bottle.png" 
            alt="Ladrillo de Cristal Puro Bottle - Full View" 
            className="w-full h-auto max-h-[90vh] object-contain drop-shadow-2xl animate-pulse"
            onClick={closeModal}
            onError={(e) => {
              e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDQwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI4MDAiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMykiIHN0cm9rZS13aWR0aD0iMiIvPjx0ZXh0IHg9IjIwMCIgeT0iNDAwIiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMiI+RnVsbCBCb3R0bGU8L3RleHQ+PC9zdmc+';
            }}
          />
          
          {/* Product Details Overlay */}
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Ladrillo de Cristal Puro</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><i className="fas fa-percentage mr-2"></i>Purity: 99.8%</p>
              <p><i className="fas fa-weight mr-2"></i>Grade: Premium</p>
              <p><i className="fas fa-flask mr-2"></i>Lab Tested</p>
              <p><i className="fas fa-certificate mr-2"></i>Certified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )}
</>


);
};

export default Hero;
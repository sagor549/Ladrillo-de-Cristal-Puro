import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const InfiniteScrollShowcase = () => {
  const sectionRefs = useRef([]);
  const headerRef = useRef();
  
  // Product sections data
  const products = [
    {
      title: "Premium Quartz Collection",
      description: "Natural crystals with healing properties",
      bgImage: "/crystal1.jpg",
      className: "first"
    },
    {
      title: "Amethyst Geodes",
      description: "Large geodes for home and office",
      bgImage: "/crystal2.jpg",
      className: "second"
    },
    {
      title: "Handcrafted Jewelry",
      description: "Elegant pieces featuring natural stones",
      bgImage: "/crystal3.jpg",
      className: "third"
    },
    {
      title: "Healing Crystal Sets",
      description: "Curated for specific intentions",
      bgImage: "/crystal4.jpg",
      className: "fourth"
    },
    {
      title: "Raw Crystal Specimens",
      description: "Direct from the earth, untouched beauty",
      bgImage: "/crystal5.jpg",
      className: "fifth"
    }
  ];

  useEffect(() => {
    // Set body height to enable scrolling
    document.body.style.height = `${products.length * 100}vh`;

    // Create ScrollTriggers for each section
    const triggers = products.map((_, i) => {
      return ScrollTrigger.create({
        trigger: sectionRefs.current[i],
        start: "top top",
        end: "bottom top",
        onEnter: () => gsap.set(sectionRefs.current[i], { visibility: "visible" }),
        onLeave: () => gsap.set(sectionRefs.current[i], { visibility: "hidden" }),
        onEnterBack: () => gsap.set(sectionRefs.current[i], { visibility: "visible" }),
        onLeaveBack: () => gsap.set(sectionRefs.current[i], { visibility: "hidden" })
      });
    });

    // Infinite scroll effect
    const topTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "top+=1 top",
      onLeaveBack: () => {
        gsap.to(window, { 
          scrollTo: (products.length - 1) * window.innerHeight, 
          duration: 0.8 
        });
      }
    });

    const bottomTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "bottom bottom",
      end: "bottom+=1 bottom",
      onLeave: () => {
        gsap.to(window, { 
          scrollTo: 1, 
          duration: 0.8 
        });
      }
    });

    // Header animation
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -20,
      duration: 1,
      scrollTrigger: {
        trigger: sectionRefs.current[0],
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    return () => {
      // Cleanup ScrollTriggers
      triggers.forEach(trigger => trigger.kill());
      topTrigger.kill();
      bottomTrigger.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      document.body.style.height = "";
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-black">
      {/* Header */}
      <header 
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 py-4 text-white"
      >
        <div className="text-xl font-serif tracking-widest">CRYSTAL EMPORIUM</div>
        <div className="tracking-widest text-sm">
          <a 
            href="#" 
            className="border-b border-transparent hover:border-white transition-all duration-300"
          >
            CONTACT US
          </a>
        </div>
      </header>

      {/* Product Sections */}
      {products.map((product, index) => (
        <section
          key={index}
          ref={el => (sectionRefs.current[index] = el)}
          className={`${product.className} fixed top-0 left-0 w-full h-screen invisible`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${product.bgImage})` 
            }}
          />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-6xl font-serif tracking-widest text-white mb-6">
                {product.title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 font-light">
                {product.description}
              </p>
            </div>
          </div>
        </section>
      ))}

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center">
        <div className="text-gray-300 text-sm tracking-widest mb-2">SCROLL</div>
        <div className="w-px h-16 bg-gradient-to-t from-gray-400 to-transparent"></div>
      </div>
    </div>
  );
};

export default InfiniteScrollShowcase;
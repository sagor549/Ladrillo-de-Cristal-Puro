import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const ProductShowcase = () => {
  const sectionRef = useRef();
  const panel1Ref = useRef();
  const panel2Ref = useRef();
  const panel3Ref = useRef();
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText);
    
    // Parallax background effect
    gsap.to(".panel-bg", {
      yPercent: -15,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
    
    // Setup animations for each panel
    const panels = [panel1Ref.current, panel2Ref.current, panel3Ref.current];
    
    panels.forEach((panel, index) => {
      // Content animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none"
        }
      });
      
      // Split text animation
      const title = panel.querySelector(".panel-title");
      const subtitle = panel.querySelector(".panel-subtitle");
      const description = panel.querySelector(".panel-description");
      const features = panel.querySelectorAll(".panel-feature");
      
      const splitTitle = new SplitText(title, { type: "chars" });
      const splitSubtitle = new SplitText(subtitle, { type: "words" });
      
      tl.from(splitTitle.chars, {
        opacity: 0,
        y: 40,
        rotationX: 90,
        stagger: 0.03,
        duration: 0.8,
        ease: "power4.out"
      }, 0);
      
      tl.from(splitSubtitle.words, {
        opacity: 0,
        y: 30,
        stagger: 0.03,
        duration: 0.7,
        ease: "expo.out"
      }, 0.2);
      
      tl.from(description, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out"
      }, 0.4);
      
      tl.from(features, {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: "back.out(1.7)"
      }, 0.6);
    });
    
    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden bg-black/95"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="absolute inset-0 opacity-[0.02] bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200')] bg-cover"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute top-[15%] left-[10%] w-4 h-4 bg-white/5 rounded-full animate-pulse"></div>
      <div className="absolute top-[30%] right-[20%] w-2 h-2 bg-white/5 rounded-full animate-pulse"></div>
      <div className="absolute bottom-[20%] left-[25%] w-3 h-3 bg-white/5 rounded-full animate-pulse"></div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <div className="inline-block mb-6">
            <span className="text-white/60 font-inter font-medium text-sm tracking-[0.3em] uppercase">
              Masterful Creations
            </span>
            <div className="h-px bg-gradient-to-r from-white/40 to-transparent mt-4 w-24 mx-auto"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-white leading-tight mb-8">
            Artisan Collection
          </h2>
          
          <p className="text-xl text-white/80 font-inter max-w-2xl mx-auto">
            Experience the pinnacle of craftsmanship in every creation
          </p>
        </div>
        
        {/* Panel 1 - Top Left */}
        <div 
          ref={panel1Ref}
          className="relative min-h-[80vh] rounded-2xl overflow-hidden mb-24 group"
        >
          <div 
            className="panel-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('darkbottle.png')" }}
          ></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-black/90"></div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-xl">
            <h3 className="panel-title text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              The Essence of Perfection
            </h3>
            
            <p className="panel-subtitle text-xl text-white/80 font-inter mb-6">
              Crafted in the rolling hills of Tuscany
            </p>
            
            <p className="panel-description text-white/70 font-inter leading-relaxed mb-8">
              Our premium olive oil captures the essence of the Mediterranean. Each bottle is a testament to generations of expertise, blending tradition with modern techniques to create a product of unparalleled quality and flavor.
            </p>
            
            <div className="space-y-6">
              <div className="panel-feature">
                <h4 className="text-lg font-bold text-white mb-2">Crafted Excellence</h4>
                <p className="text-white/60 font-inter">
                  Hand-picked from century-old olive trees grown without pesticides or artificial fertilizers.
                </p>
              </div>
              
              <div className="panel-feature">
                <h4 className="text-lg font-bold text-white mb-2">Organic Harvest</h4>
                <p className="text-white/60 font-inter">
                  Sustainably harvested using methods perfected over generations.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel 2 - Bottom Right */}
        <div 
          ref={panel2Ref}
          className="relative min-h-[80vh] rounded-2xl overflow-hidden mb-24 group"
        >
          <div 
            className="panel-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('bt.png')" }}
          ></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-tl from-black/80 via-black/50 to-black/90"></div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-xl ml-auto text-right">
            <h3 className="panel-title text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              Time-Honored Techniques
            </h3>
            
            <p className="panel-subtitle text-xl text-white/80 font-inter mb-6">
              Preserving purity through tradition
            </p>
            
            <p className="panel-description text-white/70 font-inter leading-relaxed mb-8">
              Our meticulous process ensures that every drop maintains the integrity of the olive's natural flavors and health benefits, resulting in a product that stands apart in both taste and quality.
            </p>
            
            <div className="space-y-6">
              <div className="panel-feature">
                <h4 className="text-lg font-bold text-white mb-2">Cold Pressed</h4>
                <p className="text-white/60 font-inter">
                  Extracted within 24 hours of harvest at temperatures below 27°C to preserve nutrients.
                </p>
              </div>
              
              <div className="panel-feature">
                <h4 className="text-lg font-bold text-white mb-2">Laboratory Tested</h4>
                <p className="text-white/60 font-inter">
                  Each batch undergoes rigorous testing to ensure premium quality and purity standards.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Panel 3 - Centered */}
        <div 
          ref={panel3Ref}
          className="relative min-h-[80vh] rounded-2xl overflow-hidden group"
        >
          <div 
            className="panel-bg absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603665270146-9060ca1e07f3?auto=format&fit=crop&w=1200')" }}
          ></div>
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>
          
          <div className="relative z-10 p-8 md:p-12 lg:p-16 max-w-2xl mx-auto text-center">
            <h3 className="panel-title text-3xl md:text-4xl font-playfair font-bold text-white mb-4">
              The Final Masterpiece
            </h3>
            
            <p className="panel-subtitle text-xl text-white/80 font-inter mb-6">
              Where tradition meets perfection
            </p>
            
            <p className="panel-description text-white/70 font-inter leading-relaxed mb-8 max-w-2xl mx-auto">
              The culmination of generations of expertise, our signature blend represents the pinnacle of olive oil craftsmanship. Each bottle is a testament to our unwavering commitment to quality and flavor.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="panel-feature bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Quality Guaranteed</h4>
                <p className="text-white/60 font-inter text-sm">
                  Every batch certified for purity and exceptional flavor profile
                </p>
              </div>
              
              <div className="panel-feature bg-black/30 backdrop-blur-sm border border-white/10 p-6 rounded-xl">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Aged to Perfection</h4>
                <p className="text-white/60 font-inter text-sm">
                  Matured in optimal conditions to develop complex flavor notes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
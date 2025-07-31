import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import heroImagePath from "@assets/pexels-3170155-9462365_1753910576699.jpg";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for mouse movement
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Scroll-based animations
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 400], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse movement handler
  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (rect) {
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const x = (e.clientX - centerX) / rect.width;
      const y = (e.clientY - centerY) / rect.height;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    }
  };

  return (
    <motion.section
      ref={heroRef}
      onMouseMove={handleMouseMove}
      style={{ opacity: heroOpacity }}
      className="relative min-h-screen overflow-hidden bg-[#FAFAF9]"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ scale: heroScale }}
        className="absolute inset-0 w-full h-full"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF9]/60 via-[#FAFAF9]/20 to-[#FAFAF9]/60 z-10" />
        <img
          src={heroImagePath}
          alt="CleanSip Premium Experience"
          className="w-full h-full object-cover filter contrast-[0.9] brightness-[1.1]"
          onLoad={() => setIsLoaded(true)}
        />
      </motion.div>

      {/* Content Grid */}
      <div className="relative z-20 h-screen grid grid-cols-12 gap-4 px-4 sm:px-6 lg:px-12">
        
        {/* Left Column - Main Typography */}
        <div className="col-span-12 lg:col-span-7 flex items-center">
          <motion.div
            style={{
              x: mouseXSpring,
              y: mouseYSpring,
            }}
            className="w-full"
          >
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 50 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="type-display-1 font-sans text-[#0A0A0A] leading-[0.8]"
            >
              <span className="block">Endlich</span>
              <span className="block ml-[10vw] font-black">wieder</span>
              <motion.span
                className="block ml-[5vw] font-serif italic text-[#00BFA6]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -30 }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                echte
              </motion.span>
              <span className="block ml-[15vw] font-thin">Strohhalme.</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="type-body-lg text-[#6B7280] mt-12 max-w-lg ml-[5vw]"
            >
              Schluss mit matschigen Öko-Alternativen. 
              <br />
              <span className="font-medium text-[#0A0A0A]">
                Nur bewährte Qualität für erwachsene Ansprüche.
              </span>
            </motion.p>

            {/* CTA Group */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 ml-[5vw] flex items-center gap-8"
            >
              <Link to="/product/plastik-strohhalm">
                <Button
                  size="lg"
                  className={cn(
                    "bg-[#0A0A0A] hover:bg-[#00BFA6] text-white",
                    "px-12 py-6 rounded-full",
                    "type-label tracking-widest",
                    "transition-all duration-500 ease-out",
                    "hover:scale-105 hover:shadow-2xl",
                    "relative overflow-hidden group"
                  )}
                >
                  <span className="relative z-10">Jetzt zurückholen</span>
                  <div className="absolute inset-0 bg-[#00BFA6] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </Button>
              </Link>

              <motion.div
                className="flex items-center gap-2 text-[#6B7280] type-caption"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.3 }}
              >
                <span>CHF 14.99</span>
                <span className="text-[#00BFA6]">•</span>
                <span>Sofort lieferbar</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Column - Visual Element */}
        <div className="col-span-12 lg:col-span-5 relative flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.8 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Floating Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -right-8 bg-[#00BFA6] text-[#0A0A0A] rounded-full px-6 py-3 type-label shadow-xl"
            >
              Swiss Made
            </motion.div>

            {/* Product Stats */}
            <div className="absolute -bottom-12 -left-12 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="type-display-3 font-black text-[#0A0A0A]">100</div>
              <div className="type-caption text-[#6B7280] mt-1">Stück pro Packung</div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Hints */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-12 left-12 flex items-center gap-12"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-px bg-[#0A0A0A]" />
            <span className="type-label text-[#0A0A0A]">01</span>
          </div>
          
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-colors duration-300",
                  i === 1 ? "bg-[#0A0A0A]" : "bg-[#0A0A0A]/20"
                )}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll Indicator - Refined */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-12 right-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="type-label text-[#0A0A0A] writing-mode-vertical-rl">
              Scroll
            </span>
            <div className="w-px h-16 bg-gradient-to-b from-[#0A0A0A] to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
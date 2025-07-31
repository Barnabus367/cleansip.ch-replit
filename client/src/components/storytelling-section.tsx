import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import storytellingImagePath from "@assets/pexels-davidmceachan-90911_1753910576699.jpg";

export default function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const { ref: textRef, inView: textInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Editorial Layout */}
        <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left - Story Content */}
          <motion.div 
            ref={textRef}
            style={{ y: contentY }}
            className="col-span-12 lg:col-span-6"
          >
            {/* Mission Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="mb-8"
            >
              <span className="type-label text-[#00BFA6]">
                Unsere Mission
              </span>
            </motion.div>

            {/* Main Title - Editorial Style */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="type-display-3 text-[#0A0A0A] mb-12"
            >
              <span className="font-thin">Keine</span>
              <br />
              <span className="font-black text-[#00BFA6]">Kompromisse.</span>
              <br />
              <span className="font-thin">Nur Qualität.</span>
            </motion.h2>

            {/* Story Text - Premium Typography */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={textInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="type-body-lg text-[#6B7280]">
                <span className="font-medium text-[#0A0A0A]">CleanSip steht für bewährte Qualität</span> in 
                einer Zeit voller Experimente. Während andere auf unausgereifte 
                Alternativen setzen, liefern wir zuverlässige Lösungen.
              </p>

              <p className="type-body-lg text-[#6B7280]">
                <span className="font-medium text-[#0A0A0A]">Qualität ist in der Schweiz legal</span> – 
                und wir nutzen diese Freiheit. Unsere Strohhalme machen genau das, 
                was sie sollen: durchhalten bis zum letzten Tropfen.
              </p>

              <p className="type-body-lg text-[#6B7280]">
                <span className="font-medium text-[#0A0A0A]">Für Erwachsene gemacht.</span> Keine 
                Bevormundung durch untaugliche Alternativen. Nur solide Schweizer 
                Qualität für anspruchsvolle Menschen.
              </p>
            </motion.div>

            {/* Key Values */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={textInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 flex flex-wrap gap-4"
            >
              {["100% Zuverlässig", "Swiss Made", "Keine Aufweichung"].map((value, index) => (
                <div
                  key={value}
                  className="bg-[#0A0A0A]/5 px-6 py-3 rounded-full"
                >
                  <span className="type-label text-[#0A0A0A]">{value}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right - Image */}
          <motion.div 
            style={{ y: imageY }}
            className="col-span-12 lg:col-span-6"
          >
            <div className="relative">
              {/* Main Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={textInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="relative aspect-[4/5] overflow-hidden rounded-sm"
              >
                <img
                  src={storytellingImagePath}
                  alt="CleanSip Story - Premium Strohhalme"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Stat Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={textInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -left-8 bottom-12 bg-white p-6 rounded-sm shadow-xl"
              >
                <div className="type-display-3 font-black text-[#00BFA6]">
                  0%
                </div>
                <p className="type-caption text-[#6B7280] mt-2">
                  Aufweichung nach 30 Min
                </p>
              </motion.div>

              {/* Quote Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={textInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -right-4 top-12 bg-[#0A0A0A] text-white p-8 rounded-sm max-w-xs"
              >
                <blockquote className="type-quote">
                  "Endlich wieder Strohhalme, die funktionieren."
                </blockquote>
                <cite className="type-caption block mt-4 not-italic">
                  — Ein zufriedener Kunde
                </cite>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={textInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-[#E5E7EB]"
        >
          {[
            { number: "10K+", label: "Zufriedene Kunden" },
            { number: "100%", label: "Plastik, 100% Legal" },
            { number: "21cm", label: "Perfekte Länge" },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="type-display-2 font-black text-[#0A0A0A]">
                {stat.number}
              </div>
              <p className="type-caption text-[#6B7280] mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
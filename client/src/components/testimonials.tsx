import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image?: string;
  highlight?: string;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Michael R.",
    role: "Barbesitzer, Zürich",
    content: "Endlich Strohhalme, die nicht nach 2 Minuten aufweichen! Meine Gäste lieben sie.",
    rating: 5,
    highlight: "nicht aufweichen",
  },
  {
    id: "2",
    name: "Sarah L.",
    role: "Event-Managerin",
    content: "Für unsere Premium-Events sind diese Strohhalme perfekt. Stil trifft auf Funktion.",
    rating: 5,
    highlight: "Premium-Events",
  },
  {
    id: "3",
    name: "Thomas K.",
    role: "Privatperson",
    content: "Ich will einfach meinen Drink geniessen, ohne dass der Strohhalm zerfällt. Mission erfüllt!",
    rating: 5,
    highlight: "Mission erfüllt",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(45deg, #0A0A0A 25%, transparent 25%, transparent 75%, #0A0A0A 75%, #0A0A0A), 
                           repeating-linear-gradient(45deg, #0A0A0A 25%, transparent 25%, transparent 75%, #0A0A0A 75%, #0A0A0A)`,
          backgroundPosition: '0 0, 40px 40px',
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="relative z-10">
        {/* Desktop Layout - Cards Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1] 
              }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Mobile Layout - Carousel */}
        <div className="lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialCard testimonial={testimonials[activeIndex]} />
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index 
                    ? "w-8 bg-[#00BFA6]" 
                    : "bg-[#0A0A0A]/20 hover:bg-[#0A0A0A]/40"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Individual Testimonial Card
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const [isHovered, setIsHovered] = useState(false);

  // Function to highlight specific words
  const renderHighlightedContent = (content: string, highlight?: string) => {
    if (!highlight) return content;
    
    const parts = content.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={index} className="text-[#00BFA6] font-semibold">{part}</span>
        : part
    );
  };

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className={cn(
        "relative bg-white rounded-sm p-8 h-full",
        "border border-[#E5E7EB] transition-all duration-500",
        "hover:border-[#00BFA6]/20 hover:shadow-2xl"
      )}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00BFA6] rounded-full flex items-center justify-center">
        <Quote className="w-6 h-6 text-white" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star
              className={cn(
                "w-4 h-4",
                i < testimonial.rating 
                  ? "fill-[#FFD54F] text-[#FFD54F]" 
                  : "fill-gray-200 text-gray-200"
              )}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <blockquote className="type-quote text-[#0A0A0A] mb-6">
        "{renderHighlightedContent(testimonial.content, testimonial.highlight)}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-4">
        {testimonial.image ? (
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#0A0A0A]/5 flex items-center justify-center">
            <span className="type-label text-[#0A0A0A]">
              {testimonial.name.charAt(0)}
            </span>
          </div>
        )}
        
        <div>
          <p className="type-body font-medium text-[#0A0A0A]">
            {testimonial.name}
          </p>
          <p className="type-caption text-[#6B7280]">
            {testimonial.role}
          </p>
        </div>
      </div>

      {/* Hover Effect - Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-[#00BFA6]"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
}
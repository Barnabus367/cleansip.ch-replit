import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

// Import product images
import productBlackPath from "@assets/Produktbild-schwarzer-Strohhalm_1753910576700.jpg";
import productBubblePath from "@assets/pexels-pixabay-531634_1753910576700.jpg";
import productCanPath from "@assets/pexels-3170155-9462365_1753910576699.jpg";

interface ProductCard {
  id: string;
  title: string;
  subtitle: string;
  price: string;
  image: string;
  color: string;
  handle: string;
  size: "large" | "medium" | "small";
  position: { col: string; row: string };
}

const products: ProductCard[] = [
  {
    id: "1",
    title: "Klassik",
    subtitle: "Der zeitlose Schwarze",
    price: "14.99",
    image: productBlackPath,
    color: "#000000",
    handle: "plastik-strohhalm",
    size: "large",
    position: { col: "col-span-8", row: "row-span-2" }
  },
  {
    id: "2",
    title: "Bunt",
    subtitle: "Farbenfrohe Vielfalt",
    price: "14.99",
    image: productBubblePath,
    color: "#00BFA6",
    handle: "plastik-strohhalm",
    size: "medium",
    position: { col: "col-span-4", row: "row-span-1" }
  },
  {
    id: "3",
    title: "Party Pack",
    subtitle: "Für jeden Anlass",
    price: "39.99",
    image: productCanPath,
    color: "#FFD54F",
    handle: "plastik-strohhalm",
    size: "medium",
    position: { col: "col-span-4", row: "row-span-1" }
  }
];

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects for different cards
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={sectionRef} className="py-32 bg-[#FAFAF9] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Section Header - Editorial Style */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-12 gap-4 mb-24"
        >
          <div className="col-span-12 lg:col-span-6">
            <h2 className="type-display-3 font-sans text-[#0A0A0A]">
              <span className="font-thin">Die</span>
              <br />
              <span className="font-black ml-16">Kollektion</span>
            </h2>
          </div>
          
          <div className="col-span-12 lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="type-body-lg text-[#6B7280]">
              Jeder Strohhalm erzählt eine Geschichte. 
              <span className="block font-medium text-[#0A0A0A] mt-2">
                Von Klassik bis Modern.
              </span>
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Product Grid */}
        <div className="grid grid-cols-12 gap-4 lg:gap-6 auto-rows-[300px]">
          
          {/* Large Featured Product */}
          <motion.div
            style={{ y: y1 }}
            className="col-span-12 lg:col-span-8 row-span-2"
          >
            <ProductCardAwwwards product={products[0]} index={0} />
          </motion.div>

          {/* Medium Products - Staggered */}
          <motion.div
            style={{ y: y2 }}
            className="col-span-12 sm:col-span-6 lg:col-span-4"
          >
            <ProductCardAwwwards product={products[1]} index={1} />
          </motion.div>

          <motion.div
            className="col-span-12 sm:col-span-6 lg:col-span-4 lg:mt-12"
          >
            <ProductCardAwwwards product={products[2]} index={2} />
          </motion.div>

          {/* Editorial Text Block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="col-span-12 lg:col-span-5 flex items-center"
          >
            <div className="p-8 lg:p-12">
              <blockquote className="type-quote text-[#0A0A0A]">
                "Wir glauben an die Freiheit der Wahl. 
                Keine Kompromisse, keine Entschuldigungen."
              </blockquote>
              <cite className="type-caption block mt-6 not-italic">
                — CleanSip Manifest
              </cite>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Individual Product Card Component
function ProductCardAwwwards({ product, index }: { product: ProductCard; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 1, 
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1] 
      }}
      className="h-full"
    >
      <Link to={`/product/${product.handle}`}>
        <div
          className={cn(
            "group relative h-full overflow-hidden bg-white",
            "transition-all duration-700 ease-out cursor-pointer",
            isHovered ? "shadow-2xl" : "shadow-lg"
          )}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Image Container */}
          <div className="relative h-full overflow-hidden">
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            
            {/* Gradient Overlay */}
            <div className={cn(
              "absolute inset-0 bg-gradient-to-t",
              "from-black/60 via-black/0 to-black/0",
              "transition-opacity duration-500",
              isHovered ? "opacity-100" : "opacity-70"
            )} />
          </div>

          {/* Content Overlay */}
          <div className="absolute inset-0 p-8 flex flex-col justify-between">
            
            {/* Top Badge */}
            <div className="flex justify-between items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <span className="type-label text-[#0A0A0A]">
                  CHF {product.price}
                </span>
              </motion.div>

              <motion.div
                animate={{ 
                  rotate: isHovered ? 45 : 0,
                  scale: isHovered ? 1.1 : 1
                }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
              >
                <ArrowUpRight className="w-5 h-5 text-[#0A0A0A]" />
              </motion.div>
            </div>

            {/* Bottom Content */}
            <div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h3 className="type-h1 text-white mb-2">
                  {product.title}
                </h3>
                <p className="type-body text-white/80">
                  {product.subtitle}
                </p>
              </motion.div>

              {/* Color Indicator */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: isHovered ? "100%" : "60px" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-1 mt-6"
                style={{ backgroundColor: product.color }}
              />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
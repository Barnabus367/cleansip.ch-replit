import { motion } from "framer-motion";
import { Shield, Award, Truck, Heart, CheckCircle, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  stat?: string;
}

const trustItems: TrustItem[] = [
  {
    icon: Shield,
    title: "Swiss Quality",
    description: "Höchste Qualitätsstandards direkt aus der Schweiz",
    stat: "100%",
  },
  {
    icon: Truck,
    title: "Schneller Versand",
    description: "1-2 Werktage innerhalb der Schweiz",
    stat: "24h",
  },
  {
    icon: Heart,
    title: "Zufriedene Kunden",
    description: "Über 10'000 zufriedene Kunden",
    stat: "10k+",
  },
  {
    icon: Award,
    title: "Premium Material",
    description: "BPA-frei und lebensmittelecht zertifiziert",
    stat: "A+",
  },
];

export default function TrustSection() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="relative">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-[#E5E7EB]">
        {trustItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative bg-[#FAFAF9] p-8 lg:p-12 group overflow-hidden"
          >
            <TrustCard item={item} index={index} />
          </motion.div>
        ))}
      </div>

      {/* Central Promise */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.4,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div className="bg-[#00BFA6] text-white rounded-full p-8 shadow-2xl">
          <Zap className="w-12 h-12" />
        </div>
      </motion.div>
    </section>
  );
}

// Individual Trust Card
function TrustCard({ item, index }: { item: TrustItem; index: number }) {
  return (
    <>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at ${
              index % 2 ? "top left" : "bottom right"
            }, #00BFA6 0%, transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Icon & Stat */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-16 h-16 bg-[#00BFA6]/10 rounded-full flex items-center justify-center"
          >
            <item.icon className="w-8 h-8 text-[#00BFA6]" />
          </motion.div>
          
          {item.stat && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="type-display-3 font-black text-[#00BFA6]/20"
            >
              {item.stat}
            </motion.div>
          )}
        </div>

        {/* Text */}
        <h3 className="type-h2 text-[#0A0A0A] mb-3">
          {item.title}
        </h3>
        <p className="type-body text-[#6B7280]">
          {item.description}
        </p>

        {/* Hover Accent */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-[#00BFA6]"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: "left" }}
        />
      </div>
    </>
  );
}

// Compact Trust Badges for Product Pages
export function TrustBadges() {
  const badges = [
    { icon: CheckCircle, text: "Swiss Made" },
    { icon: Truck, text: "Gratis Versand ab CHF 50" },
    { icon: Shield, text: "Sichere Zahlung" },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-2 bg-[#0A0A0A]/5 px-4 py-2 rounded-full"
        >
          <badge.icon className="w-4 h-4 text-[#00BFA6]" />
          <span className="type-caption text-[#0A0A0A]">{badge.text}</span>
        </motion.div>
      ))}
    </div>
  );
}
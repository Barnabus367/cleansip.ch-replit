import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Users, Target, Zap } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useInView } from "react-intersection-observer";
import heroImagePath from "@assets/pexels-davidmceachan-90911_1753910576699.jpg";
import teamImagePath from "@assets/pexels-3170155-9462365_1753910576699.jpg";

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const values = [
    {
      icon: Award,
      title: "Qualität",
      description: "Kompromisslose Schweizer Qualität in jedem Produkt.",
    },
    {
      icon: Users,
      title: "Kundenfokus",
      description: "Ihre Zufriedenheit steht bei uns an erster Stelle.",
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Moderne Lösungen für traditionelle Bedürfnisse.",
    },
    {
      icon: Zap,
      title: "Zuverlässigkeit",
      description: "Produkte, auf die Sie sich verlassen können.",
    },
  ];

  const milestones = [
    { year: "2020", event: "Gründung von CleanSip in Zürich" },
    { year: "2021", event: "Launch der ersten Produktlinie" },
    { year: "2022", event: "Expansion in die ganze Schweiz" },
    { year: "2023", event: "10'000+ zufriedene Kunden" },
    { year: "2024", event: "Neue Farbvarianten und Innovationen" },
  ];

  return (
    <>
      <Header />
      
      <main className="bg-[#FAFAF9]">
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen overflow-hidden">
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="absolute inset-0"
          >
            <img
              src={heroImagePath}
              alt="CleanSip Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#FAFAF9]" />
          </motion.div>

          <div className="relative z-10 h-full flex items-center justify-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl mx-auto px-4"
            >
              <h1 className="type-display-1 text-white mb-8">
                <span className="font-thin">Über</span>
                <br />
                <span className="font-black">CleanSip</span>
              </h1>
              <p className="type-body-lg text-white/90 max-w-2xl mx-auto">
                Seit 2020 setzen wir uns für Qualität und Zuverlässigkeit ein. 
                Unsere Mission: Produkte, die funktionieren – ohne Kompromisse.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-12 gap-8 lg:gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="col-span-12 lg:col-span-6"
              >
                <span className="type-label text-[#00BFA6]">Unsere Geschichte</span>
                <h2 className="type-display-3 text-[#0A0A0A] mt-4 mb-8">
                  <span className="font-thin">Geboren aus</span>
                  <br />
                  <span className="font-black">Notwendigkeit</span>
                </h2>
                <div className="space-y-6 type-body-lg text-[#6B7280]">
                  <p>
                    <span className="font-medium text-[#0A0A0A]">CleanSip entstand 2020</span> aus 
                    einer einfachen Beobachtung: Während die Welt nach nachhaltigen Alternativen 
                    suchte, wurden dabei oft Funktionalität und Benutzererfahrung vernachlässigt.
                  </p>
                  <p>
                    <span className="font-medium text-[#0A0A0A]">Wir glaubten</span>, dass es 
                    möglich sein muss, Produkte zu schaffen, die sowohl umweltbewusst als auch 
                    zuverlässig sind. Keine aufweichenden Papierstrohhalme, keine unpraktischen 
                    Alternativen – nur bewährte Qualität.
                  </p>
                  <p>
                    <span className="font-medium text-[#0A0A0A]">Heute</span> sind wir stolz darauf, 
                    über 10'000 Kunden in der ganzen Schweiz mit unseren Produkten zu beliefern. 
                    Von Privatpersonen bis zu Gastronomiebetrieben – alle schätzen unsere 
                    kompromisslose Qualität.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="col-span-12 lg:col-span-6"
              >
                <div className="relative">
                  <img
                    src={teamImagePath}
                    alt="CleanSip Team"
                    className="rounded-sm shadow-2xl"
                  />
                  <div className="absolute -bottom-8 -left-8 bg-[#00BFA6] text-white p-8 rounded-sm shadow-xl">
                    <div className="type-display-3 font-black">4+</div>
                    <p className="type-body mt-2">Jahre Erfahrung</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="type-display-3 text-[#0A0A0A]">
                <span className="font-thin">Unsere</span>
                <span className="font-black ml-4">Werte</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <ValueCard key={value.title} value={value} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-24">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="type-display-3 text-[#0A0A0A]">
                <span className="font-thin">Unser</span>
                <span className="font-black ml-4">Weg</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-[#E5E7EB]" />

              {milestones.map((milestone, index) => (
                <TimelineItem
                  key={milestone.year}
                  milestone={milestone}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-[#0A0A0A] text-white">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="type-display-3 mb-8">
                <span className="font-thin">Werden Sie Teil</span>
                <br />
                <span className="font-black text-[#00BFA6]">unserer Geschichte</span>
              </h2>
              <p className="type-body-lg text-gray-300 mb-12 max-w-2xl mx-auto">
                Entdecken Sie unsere Produkte und erleben Sie den Unterschied, 
                den echte Qualität macht.
              </p>
              <a
                href="/product/plastik-strohhalm"
                className="inline-flex items-center px-12 py-6 bg-[#00BFA6] text-[#0A0A0A] rounded-full type-label font-bold hover:bg-[#00BFA6]/90 transition-all duration-300 hover:scale-105"
              >
                Jetzt entdecken
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

// Value Card Component
function ValueCard({ value, index }: { value: any; index: number }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center group"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-20 h-20 bg-[#00BFA6]/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#00BFA6]/20 transition-colors"
      >
        <value.icon className="w-10 h-10 text-[#00BFA6]" />
      </motion.div>
      <h3 className="type-h2 text-[#0A0A0A] mb-3">{value.title}</h3>
      <p className="type-body text-[#6B7280]">{value.description}</p>
    </motion.div>
  );
}

// Timeline Item Component
function TimelineItem({ milestone, index, isLeft }: { milestone: any; index: number; isLeft: boolean }) {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex items-center mb-16 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-1/2 ${isLeft ? 'text-right pr-12' : 'pl-12'}`}>
        <div className="type-display-3 font-black text-[#00BFA6] mb-2">
          {milestone.year}
        </div>
        <p className="type-body-lg text-[#6B7280]">{milestone.event}</p>
      </div>

      {/* Center Dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00BFA6] rounded-full shadow-lg" />
    </motion.div>
  );
}
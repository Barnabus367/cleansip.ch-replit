import { Star, Quote } from "lucide-react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
    {
        name: "Marco S.",
        location: "Zürich",
        role: "Barkeeper, Kronenhalle",
        text: "Endlich Strohhalme, die einen ganzen Mojito überleben. Meine Gäste fragen sogar nach der Marke.",
        rating: 5,
        avatar: "🍸",
        verified: true
    },
    {
        name: "Sandra M.",
        location: "Basel",
        role: "Event-Managerin",
        text: "Nach 200+ Events kann ich sagen: CleanSip rettet den Ruf. Nie wieder peinliche Papier-Desaster.",
        rating: 5,
        avatar: "🎉",
        verified: true
    },
    {
        name: "Thomas K.",
        location: "Bern",
        role: "Familienvater",
        text: "Kindergeburtstag ohne Drama. Diese Strohhalme überleben sogar meine Zwillinge.",
        rating: 5,
        avatar: "👨‍👧‍👦",
        verified: true
    }
];

// Staggered animation variants for cards
const cardVariants = {
    hidden: {
        opacity: 0,
        y: 60,
        scale: 0.9
    },
    visible: (index: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: index * 0.2,
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
        }
    })
};

export default function TestimonialsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    // Parallax scroll effects for testimonials
    const { scrollY } = useScroll();

    return (
        <section ref={ref} className="py-24 bg-gradient-to-br from-brand-neutral via-white to-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Enhanced Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white text-sm font-bold uppercase tracking-wider rounded-full mb-6 shadow-lg">
                        <Star className="w-4 h-4 fill-white" />
                        Echte Erfolgsgeschichten
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-black text-brand-secondary mb-6 tracking-[-0.02em] leading-tight">
                        Das sagen unsere
                        <span className="text-brand-primary"> Rebellen</span>
                    </h2>
                    <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
                        Über <strong className="text-brand-primary">500 Schweizer</strong> haben bereits gewechselt und nie zurückgeblickt.
                    </p>
                </motion.div>

                {/* Premium Testimonials Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {testimonials.map((testimonial, index) => {
                        // Create sophisticated parallax effect for each card
                        const cardY = useTransform(
                            scrollY,
                            [1200, 2400],
                            [30 * (index + 1), -30 * (index + 1)]
                        );

                        return (
                            <motion.div
                                key={index}
                                custom={index}
                                variants={cardVariants}
                                initial="hidden"
                                animate={isInView ? "visible" : "hidden"}
                                style={{ y: cardY }}
                                whileHover={{
                                    scale: 1.03,
                                    y: cardY.get() - 15,
                                    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)"
                                }}
                                className="relative bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 group"
                            >
                                {/* Elegant Quote Icon */}
                                <div className="absolute -top-4 -left-4 w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <Quote className="w-6 h-6 text-black" />
                                </div>

                                {/* Customer Info Header */}
                                <div className="flex items-center mb-6">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 rounded-2xl flex items-center justify-center text-3xl mr-4 shadow-inner">
                                        {testimonial.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <div className="font-bold text-lg text-brand-secondary">{testimonial.name}</div>
                                            {testimonial.verified && (
                                                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                                    <span className="text-white text-xs">✓</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="text-sm text-gray-600 font-medium">{testimonial.location}</div>
                                        <div className="text-xs text-gray-500">{testimonial.role}</div>
                                    </div>
                                </div>

                                {/* Premium Star Rating */}
                                <div className="flex items-center gap-1 mb-6">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ scale: 0, rotate: -180 }}
                                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                                            transition={{ delay: 0.5 + (index * 0.2) + (i * 0.1), duration: 0.4 }}
                                        >
                                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                                        </motion.div>
                                    ))}
                                    <span className="ml-2 text-sm font-semibold text-gray-700">5.0</span>
                                </div>

                                {/* Enhanced Testimonial Text */}
                                <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 font-medium italic">
                                    "{testimonial.text}"
                                </blockquote>

                                {/* Verification Badge */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-xs text-gray-500 font-semibold">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                                        Verifizierter Kunde
                                    </div>
                                    <div className="text-xs text-gray-400 font-medium">
                                        Januar 2025
                                    </div>
                                </div>

                                {/* Hover Effect Gradient */}
                                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                            </motion.div>
                        );
                    })}
                </div>

                {/* Trust Signal Footer */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-200">
                        <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            <span className="font-bold text-gray-900">4.9/5</span>
                        </div>
                        <div className="w-px h-6 bg-gray-300" />
                        <div className="text-sm text-gray-600 font-medium">
                            <strong>500+</strong> zufriedene Schweizer Kunden
                        </div>
                        <div className="w-px h-6 bg-gray-300" />
                        <div className="text-sm text-gray-600 font-medium">
                            🇨🇭 <strong>Swiss Quality</strong>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}

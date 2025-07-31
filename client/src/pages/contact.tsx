import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Nachricht gesendet!",
        description: "Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", subject: "", message: "" });
      }, 3000);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "E-Mail",
      content: "hello@cleansip.ch",
      action: "mailto:hello@cleansip.ch",
    },
    {
      icon: Phone,
      title: "Telefon",
      content: "+41 44 123 45 67",
      action: "tel:+41441234567",
    },
    {
      icon: MapPin,
      title: "Adresse",
      content: "Bahnhofstrasse 1, 8001 Zürich",
      action: "https://maps.google.com",
    },
    {
      icon: Clock,
      title: "Geschäftszeiten",
      content: "Mo-Fr: 9-17 Uhr",
      action: null,
    },
  ];

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-20"
          >
            <h1 className="type-display-2 text-[#0A0A0A] mb-6">
              <span className="font-thin">Lassen Sie uns</span>
              <br />
              <span className="font-black text-[#00BFA6]">sprechen</span>
            </h1>
            <p className="type-body-lg text-[#6B7280] max-w-2xl mx-auto">
              Haben Sie Fragen zu unseren Produkten oder möchten Sie eine Grossbestellung aufgeben? 
              Wir sind für Sie da.
            </p>
          </motion.div>

          {/* Contact Layout */}
          <div className="grid grid-cols-12 gap-8 lg:gap-16">
            
            {/* Left: Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="bg-white rounded-sm p-8 lg:p-12 shadow-premium">
                <h2 className="type-h1 text-[#0A0A0A] mb-8">
                  Nachricht senden
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="type-label text-[#0A0A0A] block mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-[#E5E7EB] focus:border-[#00BFA6] transition-colors type-body bg-transparent outline-none"
                        placeholder="Ihr Name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="type-label text-[#0A0A0A] block mb-2">
                        E-Mail
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border-b-2 border-[#E5E7EB] focus:border-[#00BFA6] transition-colors type-body bg-transparent outline-none"
                        placeholder="ihre@email.ch"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="type-label text-[#0A0A0A] block mb-2">
                      Betreff
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-b-2 border-[#E5E7EB] focus:border-[#00BFA6] transition-colors type-body bg-transparent outline-none cursor-pointer"
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="general">Allgemeine Anfrage</option>
                      <option value="order">Bestellung</option>
                      <option value="wholesale">Grosshandel</option>
                      <option value="support">Support</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="type-label text-[#0A0A0A] block mb-2">
                      Nachricht
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border-b-2 border-[#E5E7EB] focus:border-[#00BFA6] transition-colors type-body bg-transparent outline-none resize-none"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className={cn(
                        "w-full bg-[#0A0A0A] text-white py-6 rounded-full type-label tracking-widest",
                        "hover:bg-[#00BFA6] transition-all duration-500",
                        "flex items-center justify-center gap-3",
                        (isSubmitting || isSubmitted) && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="w-5 h-5" />
                          Gesendet!
                        </>
                      ) : isSubmitting ? (
                        "Wird gesendet..."
                      ) : (
                        <>
                          Nachricht senden
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              </div>
            </motion.div>

            {/* Right: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="col-span-12 lg:col-span-5"
            >
              {/* Contact Cards */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="group"
                  >
                    {info.action ? (
                      <a
                        href={info.action}
                        target={info.title === "Adresse" ? "_blank" : undefined}
                        rel={info.title === "Adresse" ? "noopener noreferrer" : undefined}
                        className="block"
                      >
                        <ContactCard info={info} />
                      </a>
                    ) : (
                      <ContactCard info={info} />
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Additional Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-12 bg-[#00BFA6]/10 rounded-sm p-8"
              >
                <h3 className="type-h3 text-[#0A0A0A] mb-4">
                  Grossbestellungen
                </h3>
                <p className="type-body text-[#6B7280] mb-4">
                  Für Bestellungen über 1000 Stück bieten wir Sonderkonditionen. 
                  Kontaktieren Sie uns für ein individuelles Angebot.
                </p>
                <a href="mailto:wholesale@cleansip.ch" className="type-label text-[#00BFA6] hover:text-[#0A0A0A] transition-colors">
                  wholesale@cleansip.ch →
                </a>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-24 text-center bg-white rounded-sm p-12 shadow-premium"
          >
            <h2 className="type-h1 text-[#0A0A0A] mb-4">
              Noch Fragen?
            </h2>
            <p className="type-body-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Besuchen Sie unsere FAQ-Seite für Antworten auf häufig gestellte Fragen 
              oder nehmen Sie direkt Kontakt mit uns auf.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/faq"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0A0A0A] rounded-full type-label text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
              >
                FAQ ansehen
              </a>
              <a
                href="tel:+41441234567"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#00BFA6] text-white rounded-full type-label hover:bg-[#00BFA6]/90 transition-all duration-300"
              >
                Jetzt anrufen
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}

// Contact Card Component
function ContactCard({ info }: { info: { icon: any; title: string; content: string } }) {
  return (
    <div className="bg-white rounded-sm p-6 group-hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[#00BFA6]/10 rounded-full flex items-center justify-center group-hover:bg-[#00BFA6]/20 transition-colors">
          <info.icon className="w-6 h-6 text-[#00BFA6]" />
        </div>
        <div>
          <h3 className="type-label text-[#0A0A0A] mb-1">
            {info.title}
          </h3>
          <p className="type-body text-[#6B7280]">
            {info.content}
          </p>
        </div>
      </div>
    </div>
  );
}
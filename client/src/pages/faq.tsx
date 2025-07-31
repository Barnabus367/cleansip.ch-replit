import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Package, Truck, CreditCard, HelpCircle } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  // Produkt
  {
    id: "1",
    category: "Produkt",
    question: "Aus welchem Material sind die CleanSip Strohhalme?",
    answer: "Unsere Strohhalme sind aus hochwertigem, BPA-freiem und lebensmittelechtem Kunststoff gefertigt. Sie sind speziell dafür entwickelt, stabil zu bleiben und nicht aufzuweichen – im Gegensatz zu Papier-Alternativen."
  },
  {
    id: "2",
    category: "Produkt",
    question: "Wie lang sind die Strohhalme?",
    answer: "Unsere Strohhalme haben eine Länge von 21cm – die perfekte Größe für alle gängigen Gläser und Becher."
  },
  {
    id: "3",
    category: "Produkt",
    question: "Sind die Strohhalme wiederverwendbar?",
    answer: "Unsere Strohhalme sind für den Einmalgebrauch konzipiert, um höchste Hygiene zu gewährleisten. Sie können jedoch bei Bedarf gespült und mehrfach verwendet werden."
  },
  {
    id: "4",
    category: "Produkt",
    question: "Welche Farben sind verfügbar?",
    answer: "Wir bieten verschiedene Farbvarianten an: Schwarz, Weiß, Blau, Grün, Gelb, Rot, Rosa und eine bunte Mischung. So finden Sie für jeden Anlass die passende Farbe."
  },
  // Bestellung
  {
    id: "5",
    category: "Bestellung",
    question: "Wie viele Strohhalme sind in einer Packung?",
    answer: "Jede Packung enthält 100 Strohhalme – genug für viele Anlässe und Events."
  },
  {
    id: "6",
    category: "Bestellung",
    question: "Gibt es Mengenrabatte für Großbestellungen?",
    answer: "Ja! Für Bestellungen über 1000 Stück bieten wir attraktive Sonderkonditionen. Kontaktieren Sie uns unter wholesale@cleansip.ch für ein individuelles Angebot."
  },
  {
    id: "7",
    category: "Bestellung",
    question: "Kann ich Muster bestellen?",
    answer: "Derzeit bieten wir keine Einzelmuster an. Unsere kleinste Verkaufseinheit ist eine Packung mit 100 Stück."
  },
  // Versand
  {
    id: "8",
    category: "Versand",
    question: "Wie lange dauert der Versand?",
    answer: "Innerhalb der Schweiz liefern wir in 1-2 Werktagen. Bestellungen bis 14 Uhr werden noch am selben Tag versendet."
  },
  {
    id: "9",
    category: "Versand",
    question: "Welche Versandkosten fallen an?",
    answer: "Der Versand kostet CHF 4.90. Ab einem Bestellwert von CHF 50 liefern wir versandkostenfrei."
  },
  {
    id: "10",
    category: "Versand",
    question: "Liefern Sie auch ins Ausland?",
    answer: "Aktuell liefern wir nur innerhalb der Schweiz. Internationale Lieferungen sind in Planung."
  },
  // Zahlung
  {
    id: "11",
    category: "Zahlung",
    question: "Welche Zahlungsmethoden akzeptieren Sie?",
    answer: "Wir akzeptieren alle gängigen Zahlungsmethoden: Kreditkarte (Visa, Mastercard), TWINT, PayPal und Rechnung (für Geschäftskunden)."
  },
  {
    id: "12",
    category: "Zahlung",
    question: "Ist die Zahlung sicher?",
    answer: "Ja, alle Zahlungen werden über verschlüsselte SSL-Verbindungen abgewickelt. Ihre Daten sind bei uns sicher."
  },
];

const categories = ["Alle", "Produkt", "Bestellung", "Versand", "Zahlung"];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQs = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Alle" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Produkt": return Package;
      case "Bestellung": return HelpCircle;
      case "Versand": return Truck;
      case "Zahlung": return CreditCard;
      default: return HelpCircle;
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-[#FAFAF9] pt-32 pb-20">
        <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <h1 className="type-display-2 text-[#0A0A0A] mb-6">
              <span className="font-thin">Häufige</span>
              <br />
              <span className="font-black text-[#00BFA6]">Fragen</span>
            </h1>
            <p className="type-body-lg text-[#6B7280] max-w-2xl mx-auto">
              Finden Sie schnell Antworten auf Ihre Fragen zu unseren Produkten, 
              Bestellungen und mehr.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative mb-12"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
            <input
              type="text"
              placeholder="Suchen Sie nach einem Thema..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white rounded-full border border-[#E5E7EB] focus:border-[#00BFA6] transition-colors type-body outline-none"
            />
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-3 justify-center mb-12"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-6 py-3 rounded-full type-label transition-all duration-300",
                  selectedCategory === category
                    ? "bg-[#00BFA6] text-white"
                    : "bg-white text-[#6B7280] hover:bg-[#00BFA6]/10"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* FAQ Items */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredFAQs.map((item, index) => {
              const Icon = getCategoryIcon(item.category);
              const isOpen = openItems.includes(item.id);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full px-6 py-6 flex items-center justify-between text-left hover:bg-[#FAFAF9] transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 bg-[#00BFA6]/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-[#00BFA6]" />
                      </div>
                      <div className="flex-1 pr-4">
                        <h3 className="type-h3 text-[#0A0A0A]">{item.question}</h3>
                        <span className="type-caption text-[#6B7280]">{item.category}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-[#6B7280]" />
                    </motion.div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pl-[4.5rem]">
                          <p className="type-body text-[#6B7280]">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>

          {/* No Results */}
          {filteredFAQs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <p className="type-body-lg text-[#6B7280]">
                Keine Ergebnisse gefunden. Versuchen Sie eine andere Suche.
              </p>
            </motion.div>
          )}

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center bg-white rounded-sm p-12 shadow-premium"
          >
            <h2 className="type-h1 text-[#0A0A0A] mb-4">
              Keine Antwort gefunden?
            </h2>
            <p className="type-body-lg text-[#6B7280] mb-8 max-w-2xl mx-auto">
              Unser Kundenservice-Team hilft Ihnen gerne weiter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#0A0A0A] text-white rounded-full type-label hover:bg-[#00BFA6] transition-all duration-300"
              >
                Kontakt aufnehmen
              </a>
              <a
                href="tel:+41441234567"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#0A0A0A] rounded-full type-label text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-all duration-300"
              >
                +41 44 123 45 67
              </a>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
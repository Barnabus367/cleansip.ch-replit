import { useState } from "react";
import { Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const comingSoonProducts = [
  {
    id: "PC-50",
    name: "Party Cups Deluxe",
    description: "Becher, die nicht knicken",
    price: "CHF 12.90",
    weight: "500g",
    releaseDate: "Q2 2025",
    notifyCount: 342,
    teaser: "Nie wieder enttäuschte Partygäste",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Party Cups Deluxe 50er Pack"
  },
  {
    id: "PS-100",
    name: "Pro Stirrer Platinum",
    description: "Rührstäbchen mit Stil",
    price: "CHF 5.90",
    weight: "150g",
    releaseDate: "Q2 2025",
    notifyCount: 278,
    teaser: "Für perfekt gemischte Drinks",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Pro Stirrer Platinum 100er Pack"
  },
  {
    id: "FB-40",
    name: "Flex Cutlery Elite",
    description: "Besteck ohne Kompromisse",
    price: "CHF 9.80",
    weight: "300g",
    releaseDate: "Q3 2025",
    notifyCount: 156,
    teaser: "Eleganz trifft Funktionalität",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Flex Cutlery Elite 40er Kit"
  }
];

export default function ComingSoonSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "Anmeldung erfolgreich!",
        description: "Du wirst benachrichtigt, sobald neue Produkte verfügbar sind.",
      });
      setEmail("");
    } catch (error) {
      toast({
        title: "Fehler bei der Anmeldung",
        description: "Bitte versuche es später noch einmal.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="coming-soon" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-brand-secondary mb-4">Demnächst verfügbar</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Erweitere dein Party-Arsenal! Melde dich an und erfahre als Erster, wenn unsere neuen Produkte live gehen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {comingSoonProducts.map((product, index) => (
            <div key={product.id} className="group relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
              {/* Blur Overlay with Hover Reveal */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-secondary/80 to-black/60 backdrop-blur-sm z-10 flex items-center justify-center group-hover:opacity-0 transition-opacity duration-500">
                <div className="text-center text-white">
                  <Clock className="mx-auto h-12 w-12 mb-4 text-brand-primary" />
                  <div className="font-bold text-lg mb-2">Bald verfügbar</div>
                  <div className="text-sm text-brand-accent">{product.releaseDate}</div>
                </div>
              </div>
              
              {/* Product Content */}
              <div className="group-hover:blur-none blur-sm transition-all duration-500">
                <img 
                  src={product.imageUrl} 
                  alt={product.alt}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-block px-2 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded">
                      #{index + 2} in Pipeline
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Bell className="w-3 h-3 mr-1" />
                      {product.notifyCount} warten bereits
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-secondary">{product.name}</h3>
                  <p className="text-brand-primary font-medium italic">"{product.teaser}"</p>
                  <p className="text-gray-600">{product.description}</p>
                  
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-bold text-brand-primary">{product.price}</span>
                    <span className="text-sm text-gray-500">{product.id} | {product.weight}</span>
                  </div>
                  
                  {/* Features Preview */}
                  <div className="border-t border-gray-200 pt-3">
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Gleiche CleanSip Qualität
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        48h Lieferung garantiert
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        Swiss Engineering
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Email Signup */}
        <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto text-center shadow-lg">
          <h3 className="text-2xl font-bold text-brand-secondary mb-4">Verpasse nichts!</h3>
          <p className="text-gray-600 mb-6">
            Trag dich ein und erfahre zuerst, wenn Party Cups & Co. live gehen!
          </p>
          
          <form onSubmit={handleNewsletterSignup} className="flex flex-col sm:flex-row gap-4">
            <Input
              type="email"
              placeholder="deine@email.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold"
            >
              <Bell className="mr-2 h-4 w-4" />
              {isSubmitting ? "Wird angemeldet..." : "Benachrichtigen"}
            </Button>
          </form>
          
          <p className="text-xs text-gray-500 mt-3">
            Keine Spam-Mails. Nur wichtige Updates zu neuen Produkten.
          </p>
        </div>
      </div>
    </section>
  );
}

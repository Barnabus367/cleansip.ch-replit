import { useState } from "react";
import { Clock, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const comingSoonProducts = [
  {
    id: "PC-50",
    name: "Classic Party Cups 50er Pack",
    description: "Robuste PP-Becher für jede Feier",
    price: "CHF 12.90",
    weight: "500g",
    imageUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Classic Party Cups 50er Pack"
  },
  {
    id: "PS-100",
    name: "Pro Stirrer 100er Pack",
    description: "100 holzfreie Rührstäbchen",
    price: "CHF 5.90",
    weight: "150g",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Pro Stirrer 100er Pack Rührstäbchen"
  },
  {
    id: "FB-40",
    name: "Flex Fork & Knife 40er Kit",
    description: "Kunststoff-Besteck-Kit",
    price: "CHF 9.80",
    weight: "300g",
    imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
    alt: "Flex Fork & Knife 40er Kit Besteck"
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
          {comingSoonProducts.map((product) => (
            <div key={product.id} className="relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden">
              <div className="absolute inset-0 bg-gray-900 bg-opacity-10 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center text-white">
                  <Clock className="mx-auto h-8 w-8 mb-2" />
                  <div className="font-semibold">Coming Soon</div>
                </div>
              </div>
              
              <img 
                src={product.imageUrl} 
                alt={product.alt}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              
              <h3 className="text-xl font-bold text-brand-secondary mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-3">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-brand-primary">{product.price}</span>
                <span className="text-sm text-gray-500">{product.id} | {product.weight}</span>
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

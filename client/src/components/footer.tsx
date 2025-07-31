import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import CleanSipLogo from "../../logo-ceansip.svg";

export default function Footer() {
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
        title: "Newsletter-Anmeldung erfolgreich!",
        description: "Du erhältst Updates zu neuen Produkten.",
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
    <footer className="bg-brand-secondary text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link href="/">
              <a className="inline-block hover:scale-105 transition-transform duration-200">
                <img 
                  src={CleanSipLogo} 
                  alt="CleanSip Logo" 
                  className="h-12 w-auto filter brightness-0 invert"
                />
              </a>
            </Link>
            <p className="text-gray-300 text-sm">
              Nie mehr matschige Alternativen. Bewährte Kunststoff-Qualität für deine Party.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Produkte</h4>
            <div className="space-y-2 text-sm">
              <Link href="/category/strohhalme">
                <a className="text-gray-300 hover:text-white transition-colors block">Strohhalme</a>
              </Link>
              <Link href="/coming-soon">
                <a className="text-gray-300 hover:text-white transition-colors block">Party Cups</a>
              </Link>
              <Link href="/coming-soon">
                <a className="text-gray-300 hover:text-white transition-colors block">Rührstäbchen</a>
              </Link>
              <Link href="/coming-soon">
                <a className="text-gray-300 hover:text-white transition-colors block">Besteck</a>
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="font-semibold">Kundenservice</h4>
            <div className="space-y-2 text-sm">
              <a href="/shipping" className="text-gray-300 hover:text-white transition-colors block">Versandinformationen</a>
              <a href="/returns" className="text-gray-300 hover:text-white transition-colors block">Rückgabe</a>
              <a href="/faq" className="text-gray-300 hover:text-white transition-colors block">FAQ</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors block">Kontakt</a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="font-semibold">Newsletter</h4>
            <p className="text-gray-300 text-sm">
              Neue Produkte? Trag dich ein und erfahre zuerst, wenn Party Cups & Co. live gehen!
            </p>
            <form onSubmit={handleNewsletterSignup} className="space-y-2">
              <Input
                type="email"
                placeholder="deine@email.ch"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 focus:border-brand-primary"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-primary hover:bg-brand-primary/90 text-white font-medium"
              >
                {isSubmitting ? "Wird angemeldet..." : "Anmelden"}
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-300">
            © 2024 CleanSip. Alle Rechte vorbehalten.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">Datenschutz</a>
            <a href="/terms" className="text-gray-300 hover:text-white transition-colors">AGB</a>
            <a href="/impressum" className="text-gray-300 hover:text-white transition-colors">Impressum</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

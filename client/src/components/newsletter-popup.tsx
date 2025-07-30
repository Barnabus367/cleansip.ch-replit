import { useState, useEffect } from "react";
import { X, Bell, Gift, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const headlines = [
  "Schluss mit Papierfrust – hol dir Updates",
  "Werde Teil der Stabilitäts-Revolution",
  "Erste News, wenn neue Produkte kommen"
];

const benefits = [
  { icon: Gift, text: "Exklusive Rabatte für Rebellen", color: "text-green-500" },
  { icon: Star, text: "Neue Produkte vor allen anderen", color: "text-yellow-500" },
  { icon: Zap, text: "Tips für frustfreie Parties", color: "text-blue-500" }
];

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentHeadline, setCurrentHeadline] = useState(0);
  const { toast } = useToast();

  // Show popup after 30 seconds or on exit intent
  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user hasn't already subscribed (localStorage)
      const hasSubscribed = localStorage.getItem('cleansip_newsletter_subscribed');
      if (!hasSubscribed) {
        setIsOpen(true);
      }
    }, 30000);

    // Headline rotation
    const headlineTimer = setInterval(() => {
      setCurrentHeadline((prev) => (prev + 1) % headlines.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(headlineTimer);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/newsletter", { email });
      toast({
        title: "🎉 Willkommen in der Rebellion!",
        description: "Du erhältst exklusive Updates und Rabatte.",
      });
      localStorage.setItem('cleansip_newsletter_subscribed', 'true');
      setIsOpen(false);
      setEmail("");
    } catch (error) {
      toast({
        title: "Ups, das ging schief",
        description: "Versuche es nochmal oder kontaktiere uns direkt.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md mx-auto bg-gradient-to-br from-brand-secondary to-black text-white border-2 border-brand-primary">
        <div className="relative p-6">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-white hover:bg-white/10"
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-8 w-8 text-black" />
            </div>
            <h2 className="text-2xl font-bold mb-2 min-h-[3rem] flex items-center justify-center">
              {headlines[currentHeadline]}
            </h2>
            <p className="text-gray-300">
              Schließ dich über 1'000 Schweizern an, die bereits rebellieren.
            </p>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 ${benefit.color}`} />
                  <span className="text-sm">{benefit.text}</span>
                </div>
              );
            })}
          </div>

          {/* Email Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="deine@email.ch"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300 focus:border-brand-primary"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-brand-primary hover:bg-brand-primary/90 text-black font-bold py-3"
            >
              {isSubmitting ? "Wird angemeldet..." : "🔥 REBELLION BEITRETEN"}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center mt-4">
            <p className="text-xs text-gray-400">
              Kein Spam. Nur wichtige Updates und exklusive Angebote.
            </p>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-xs text-gray-500 hover:text-gray-300 mt-2 underline"
            >
              Nein danke, ich bleibe bei Pappe
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
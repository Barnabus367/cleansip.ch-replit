import { useState } from "react";
import { Clock, Bell, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Link } from "wouter";

export default function ComingSoon() {
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
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Back button */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="p-0 text-brand-primary hover:text-brand-primary/80">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Startseite
              </Button>
            </Link>
          </div>

          {/* Hero section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-brand-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-brand-secondary mb-4">
              Neue Produkte kommen bald!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir arbeiten hart daran, unser Sortiment zu erweitern. Party Cups, Rührstäbchen und Besteck werden bald verfügbar sein.
            </p>
          </div>

          {/* Newsletter signup */}
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-brand-secondary">
                Verpasse den Launch nicht!
              </CardTitle>
              <p className="text-gray-600">
                Melde dich für unseren Newsletter an und erfahre als Erster, 
                wenn die neuen Produkte verfügbar sind.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleNewsletterSignup} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3">
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
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold px-6"
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    {isSubmitting ? "Wird angemeldet..." : "Benachrichtigen"}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 text-center">
                  Keine Spam-Mails. Nur wichtige Updates zu neuen Produkten.
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Coming soon products preview */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-center text-brand-secondary mb-8">
              Was dich erwartet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🥤</span>
                  </div>
                  <h3 className="font-semibold text-brand-secondary mb-2">Party Cups</h3>
                  <p className="text-gray-600 text-sm">Robuste PP-Becher für jede Feier</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🥄</span>
                  </div>
                  <h3 className="font-semibold text-brand-secondary mb-2">Rührstäbchen</h3>
                  <p className="text-gray-600 text-sm">Holzfreie Rührstäbchen für Getränke</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🍴</span>
                  </div>
                  <h3 className="font-semibold text-brand-secondary mb-2">Besteck-Kit</h3>
                  <p className="text-gray-600 text-sm">Praktisches Kunststoff-Besteck</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

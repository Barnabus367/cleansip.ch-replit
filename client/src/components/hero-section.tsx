import { Check, Truck, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-brand-neutral to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-secondary leading-tight">
                CleanSip –<br />
                <span className="text-brand-primary">Nie mehr matschige Alternativen.</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Plastikstrohhalme & klassische Party-Basics. In 48 h bei dir.
              </p>
            </div>

            {/* USP Bullets */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Check className="h-5 w-5 text-brand-primary" />
                <span className="text-gray-700">100% Kunststoff-Qualität – kein Aufweichen</span>
              </div>
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-brand-primary" />
                <span className="text-gray-700">Schweizer Lager: 48-h-Zustellung</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-brand-primary" />
                <span className="text-gray-700">Bewährte Hygiene-Standards (BPA-frei, lebensmittelecht)</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/product/cleansip-100">
                <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 h-auto text-lg font-semibold shadow-lg">
                  100er-Pack Strohhalme jetzt kaufen
                </Button>
              </Link>
              <Link href="#coming-soon">
                <Button variant="outline" className="border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-8 py-4 h-auto text-lg font-semibold">
                  Mehr Produkte demnächst
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1544145945-f90425340c7e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
              alt="CleanSip Plastikstrohhalme in erfrischenden Getränken" 
              className="rounded-2xl shadow-2xl w-full h-auto"
            />
            
            {/* Floating trust badge */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-brand-accent rounded-full"></div>
                <span className="text-sm font-medium">Schweizer Qualität</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

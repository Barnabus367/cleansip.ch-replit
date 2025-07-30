import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Users, Star, Zap } from "lucide-react";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function ManifestPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-br from-brand-secondary via-black to-brand-secondary text-white">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="text-brand-primary hover:text-brand-primary/80 p-0">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Zurück zur Revolution
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-6 py-3 bg-red-600 text-white text-sm font-bold uppercase tracking-wider rounded-full mb-6">
              Das Manifest
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
              Das CleanSip<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                Manifest
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Wir glauben an Strohhalme, die nicht kapitulieren.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            
            {/* Mission Section */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 text-brand-primary mr-3" />
                <h2 className="text-3xl font-bold text-white mb-0">Unsere Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Während die Welt auf Pappe kaut, liefern wir Stabilität. 
                Keine Kompromisse. Keine Ausreden. Nur funktionierende Produkte.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                CleanSip steht für Menschen, die es satt haben, gegen ihren Strohhalm zu kämpfen. 
                Die verstehen, dass Qualität wichtiger ist als politische Korrektheit.
              </p>
            </div>

            {/* Target Audience */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-brand-primary mr-3" />
                <h2 className="text-3xl font-bold text-white mb-0">Für wen wir da sind</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">🍸</div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">Bar-Profis</h3>
                  <p className="text-gray-300">Die auf Qualität setzen und keine Zeit für Ausreden haben</p>
                </div>
                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">👨‍👩‍👧‍👦</div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">Eltern</h3>
                  <p className="text-gray-300">Die keine Tränen wollen, wenn der Strohhalm wieder aufweicht</p>
                </div>
                <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-6">
                  <div className="text-2xl mb-3">🎉</div>
                  <h3 className="text-xl font-bold text-brand-primary mb-2">Party-Menschen</h3>
                  <p className="text-gray-300">Die ihre Feiern nicht von minderwertigen Produkten ruinieren lassen</p>
                </div>
              </div>
            </div>

            {/* Werte */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <Star className="h-8 w-8 text-brand-primary mr-3" />
                <h2 className="text-3xl font-bold text-white mb-0">Unsere Werte</h2>
              </div>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Ehrlichkeit über Trends</h3>
                    <p className="text-gray-300">Wir sagen die Wahrheit, auch wenn sie unbequem ist. Papierstrohhalme sind ein Kompromiss zu viel.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Qualität über Quantität</h3>
                    <p className="text-gray-300">Lieber weniger Produkte, die funktionieren, als viele, die enttäuschen.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-2 h-2 bg-brand-primary rounded-full mt-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Schweizer Zuverlässigkeit</h3>
                    <p className="text-gray-300">Pünktlich, präzise, und ohne Ausreden. Wie es sein soll.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Promise */}
            <div className="bg-gradient-to-r from-brand-primary/20 to-brand-accent/20 border border-brand-primary/30 rounded-2xl p-8 mb-12">
              <div className="flex items-center mb-6">
                <Zap className="h-8 w-8 text-brand-accent mr-3" />
                <h2 className="text-3xl font-bold text-white mb-0">Unser Versprechen</h2>
              </div>
              <p className="text-white text-xl leading-relaxed mb-6">
                <strong>Jeder CleanSip Strohhalm überlebt dein ganzes Getränk.</strong>
              </p>
              <p className="text-gray-200 text-lg leading-relaxed">
                Sollte ein CleanSip Strohhalm doch mal versagen, ersetzten wir die komplette Packung. 
                Kostenlos. Ohne Diskussion. Das ist unser Wort.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-black/50 backdrop-blur-sm border-2 border-brand-primary rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-white mb-4">Bereit für die Revolution?</h2>
                <p className="text-gray-300 text-lg mb-6">
                  Schließ dich über 4'800 Schweizern an, die bereits den Unterschied spüren.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/product/cleansip-100">
                    <Button className="bg-brand-primary hover:bg-brand-primary/90 text-black font-bold px-8 py-4 h-auto text-lg shadow-2xl shadow-brand-primary/25 hover:shadow-brand-primary/40 transition-all duration-300 transform hover:scale-105">
                      🔥 JETZT BESTELLEN
                    </Button>
                  </Link>
                  <Link href="/#coming-soon">
                    <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 h-auto text-lg font-bold transition-all duration-300">
                      📬 UPDATES ERHALTEN
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
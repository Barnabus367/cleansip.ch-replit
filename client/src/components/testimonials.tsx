import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Marco S., Zürich",
    role: "Barkeeper",
    text: "Endlich Strohhalme, die einen ganzen Mojito überleben! Meine Gäste sind begeistert.",
    rating: 5,
    avatar: "🍸"
  },
  {
    name: "Sandra M., Basel", 
    role: "Event-Managerin",
    text: "Meine Gäste beschweren sich nie mehr. CleanSip rettet Events!",
    rating: 5,
    avatar: "🎉"
  },
  {
    name: "Thomas K., Bern",
    role: "Familienvater",
    text: "Keine Tränen mehr beim Kindergeburtstag. Diese Strohhalme funktionieren einfach.",
    rating: 5,
    avatar: "👨‍👧‍👦"
  }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-brand-neutral to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-green-600 text-white text-sm font-bold uppercase tracking-wider rounded-full mb-4">
            Echte Erfolgsgeschichten
          </div>
          <h2 className="text-3xl font-bold text-brand-secondary mb-4">Das sagen unsere Rebellen</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Über 500 Schweizer haben bereits gewechselt und nie zurückgeblickt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-2xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-brand-secondary">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
              
              <div className="flex items-center text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                Verifizierter Käufer
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 bg-brand-secondary rounded-2xl p-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">500+</div>
              <div className="text-sm text-gray-300">Zufriedene Kunden</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">4.9/5</div>
              <div className="text-sm text-gray-300">Durchschnittsbewertung</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">0%</div>
              <div className="text-sm text-gray-300">Versagerquote</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-primary mb-2">48h</div>
              <div className="text-sm text-gray-300">Durchschnittliche Lieferzeit</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import { Truck, Leaf, Tag } from "lucide-react";

export default function TrustSection() {
  const features = [
    {
      icon: Truck,
      title: "Schneller Versand",
      description: "48h Lieferung aus dem Schweizer Lager. Versandkostenfrei ab CHF 50."
    },
    {
      icon: Leaf,
      title: "Solange erlaubt",
      description: "Rest-Stock bewährter Qualität. In der Schweiz aktuell noch legal verfügbar."
    },
    {
      icon: Tag,
      title: "Hygiene-Standards",
      description: "BPA-frei und lebensmittelecht. Hygienisch einzeln verpackt."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="w-16 h-16 bg-brand-primary rounded-full flex items-center justify-center mx-auto">
                  <Icon className="text-white h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-brand-secondary">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

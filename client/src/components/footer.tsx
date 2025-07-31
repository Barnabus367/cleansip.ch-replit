import { Link } from "wouter";
import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Mail, MapPin } from "lucide-react";
import logoPath from "/logo-ceansip.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: "Alle Produkte", href: "/product/plastik-strohhalm" },
      { label: "Bestseller", href: "/product/plastik-strohhalm" },
      { label: "Neue Farben", href: "/coming-soon" },
    ],
    über: [
      { label: "Über uns", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Kontakt", href: "/contact" },
    ],
    rechtliches: [
      { label: "AGB", href: "/coming-soon" },
      { label: "Datenschutz", href: "/coming-soon" },
      { label: "Impressum", href: "/coming-soon" },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-[#0A0A0A] text-white">
      {/* Main Footer Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-24">
        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-12 lg:col-span-4">
            <Link to="/">
              <img
                src={logoPath}
                alt="CleanSip"
                className="h-10 w-auto brightness-0 invert mb-8"
              />
            </Link>
            
            <p className="type-body text-gray-400 mb-8 max-w-sm">
              Die Revolution gegen matschige Öko-Alternativen. 
              Endlich wieder echte Strohhalme.
            </p>

            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#00BFA6] transition-colors duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="grid grid-cols-3 gap-8">
              
              {/* Shop Links */}
              <div>
                <h3 className="type-label text-gray-400 mb-6">Shop</h3>
                <ul className="space-y-4">
                  {footerLinks.shop.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href}>
                        <motion.span
                          whileHover={{ x: 2 }}
                          className="type-body-sm text-gray-300 hover:text-[#00BFA6] transition-colors inline-block"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* About Links */}
              <div>
                <h3 className="type-label text-gray-400 mb-6">Über uns</h3>
                <ul className="space-y-4">
                  {footerLinks.über.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href}>
                        <motion.span
                          whileHover={{ x: 2 }}
                          className="type-body-sm text-gray-300 hover:text-[#00BFA6] transition-colors inline-block"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="type-label text-gray-400 mb-6">Rechtliches</h3>
                <ul className="space-y-4">
                  {footerLinks.rechtliches.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href}>
                        <motion.span
                          whileHover={{ x: 2 }}
                          className="type-body-sm text-gray-300 hover:text-[#00BFA6] transition-colors inline-block"
                        >
                          {link.label}
                        </motion.span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-16">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-6">
              <h3 className="type-h2 text-white mb-2">
                Bleib informiert
              </h3>
              <p className="type-body text-gray-400">
                Erhalte exklusive Angebote und Neuigkeiten.
              </p>
            </div>
            
            <div className="col-span-12 lg:col-span-6">
              <form className="flex gap-4">
                <input
                  type="email"
                  placeholder="deine@email.ch"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 type-body text-white placeholder:text-gray-500 focus:outline-none focus:border-[#00BFA6] transition-colors"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-[#00BFA6] text-[#0A0A0A] px-8 py-3 rounded-full type-label font-bold hover:bg-[#00BFA6]/90 transition-colors"
                >
                  Abonnieren
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            
            {/* Copyright */}
            <p className="type-caption text-gray-500">
              © {currentYear} CleanSip. Alle Rechte vorbehalten.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 type-caption text-gray-500">
              <MapPin className="w-4 h-4" />
              <span>Zürich, Schweiz</span>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center gap-6">
              <span className="type-caption text-gray-500">
                Wir akzeptieren:
              </span>
              <div className="flex gap-3">
                {["Visa", "MC", "TWINT"].map((method) => (
                  <div
                    key={method}
                    className="bg-white/10 px-3 py-1 rounded type-caption text-gray-400"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
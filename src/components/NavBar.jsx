import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const SECTIONS = ["home", "studio", "chi-sono", "galleria", "contatti"];
const NAV_OFFSET = 80;

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Scroll listener: navbar shadow + scroll-spy (solo se siamo sulla home)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      if (!isHome) return;
      const current = SECTIONS.find((section) => {
        const el = document.getElementById(section);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  // Se arriviamo sulla home con un hash (es. /#galleria), scrolla a quella sezione
  useEffect(() => {
    if (!isHome || !location.hash) return;
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    // piccolo timeout per assicurare che il DOM sia montato
    const t = setTimeout(() => {
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
      window.scrollTo({ top, behavior: "smooth" });
    }, 50);
    return () => clearTimeout(t);
  }, [isHome, location.hash]);

  const scrollToSection = (id) => {
    setMenuOpen(false);
    if (!isHome) {
      // Su un'altra pagina: naviga alla home con l'hash, l'effect sopra farà lo scroll
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveSection(id);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="shrink-0 group"
          >
            <span className="font-pirata-one text-xl sm:text-2xl font-black tracking-tighter text-black group-hover:text-red-900 transition-colors">
              NERO CORPUS
            </span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {SECTIONS.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 lg:px-4 py-2 text-xs lg:text-sm tracking-wider font-semibold rounded-full transition-all duration-300 ${
                  isHome && activeSection === section
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {section === "chi-sono" ? "chi sono" : section}
              </button>
            ))}
            <a
              href="https://www.instagram.com/nerocorpus"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 p-2 text-gray-700 hover:text-red-900 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>

          {/* Mobile: Instagram + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href="https://www.instagram.com/nerocorpus"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-black hover:text-red-900 transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="p-2 rounded-lg text-black hover:bg-gray-100 transition-colors"
              aria-label="Apri menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
          {SECTIONS.map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-sm tracking-wider font-semibold transition-all ${
                isHome && activeSection === section
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {section === "chi-sono" ? "Chi Sono" : section}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

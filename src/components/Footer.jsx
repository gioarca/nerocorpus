import React from "react";
import IubendaLink from "./IubendaLink";

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

function Footer() {
  const legalLinkClass = "hover:text-red-900 transition-colors duration-200";

  return (
    <footer className="mt-auto border-t border-gray-200 text-black py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2 group">
          <img
            src="/nerocorpus.png"
            alt="Nero Corpus"
            className="h-16 group-hover:scale-110 transition-transform duration-200"
          />
        </a>

        {/* Social */}
        <div className="text-center">
          <p className="font-semibold text-lg mb-4">Seguici</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://www.instagram.com/nerocorpus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Nero Corpus"
              className="transition-transform duration-300 hover:scale-110 hover:opacity-70"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Link legali */}
        <nav
          aria-label="Link legali"
          className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-sm text-gray-600"
        >
          <IubendaLink type="privacy" className={legalLinkClass}>
            Privacy Policy
          </IubendaLink>
          <span className="hidden sm:inline text-gray-300">·</span>
          <IubendaLink type="cookie" className={legalLinkClass}>
            Cookie Policy
          </IubendaLink>
        </nav>

        {/* Informazioni di legge */}
        <div className="text-center text-xs text-gray-500 leading-relaxed max-w-xl space-y-1">
          <p className="font-semibold text-gray-700">
            Marta Conte · Ditta Individuale
          </p>
          <p>
            Via dell'Arma di Cavalleria 4 · 31055 Quinto di Treviso (TV) ·
            Italia
          </p>
          <p>
            P.IVA <span className="font-mono">XXXXXXXXXXX</span>
            {" · "}
            C.F. <span className="font-mono">CNTMRTXXXXXXXXXX</span>
          </p>
          <p>
            Email:{" "}
            <a
              href="mailto:martaconte.tattoo@gmail.com"
              className="hover:text-red-900 transition-colors"
            >
              martaconte.tattoo@gmail.com
            </a>
          </p>
        </div>

        {/* Copyright + tagline */}
        <div className="text-center text-sm text-gray-600 pt-4 border-t border-gray-100 w-full max-w-xs">
          <p>© {new Date().getFullYear()} Nero Corpus Tattoo Studio</p>
          <p className="text-[#971e1e] text-xs mt-2 italic">
            L'arte che vive sulla tua pelle
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

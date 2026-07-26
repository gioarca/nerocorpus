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

const TikTokIcon = ({ className }) => (
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
    <path d="M9 12a4 4 0 1 0 4 4V4c.5 2.5 2.5 4.5 5 5" />
  </svg>
);

function Footer() {
  const legalLinkClass = "hover:text-red-900 transition-colors duration-200";

  return (
    <footer className="mt-auto border-t border-gray-200 text-black px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-5 sm:space-y-6">
        {/* Logo */}
        <a href="/" className="flex items-center group">
          <img
            src="/nerocorpus.png"
            alt="Nero Corpus"
            className="h-14 sm:h-16 group-hover:scale-110 transition-transform duration-200"
          />
        </a>

        {/* Social */}
        <div className="text-center">
          <p className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">
            Seguici
          </p>
          <div className="flex justify-center items-center gap-4 sm:gap-6">
            <a
              href="https://www.instagram.com/nerocorpus"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Nero Corpus"
              className="inline-flex p-2 transition-transform duration-300 hover:scale-110 hover:opacity-70"
            >
              <InstagramIcon className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@marta_fatatuaggi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok Nero Corpus"
              className="inline-flex p-2 transition-transform duration-300 hover:scale-110 hover:opacity-70"
            >
              <TikTokIcon className="w-6 h-6" />
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
        <div className="text-center text-xs text-gray-500 leading-relaxed max-w-xl space-y-1 px-2">
          <p className="font-semibold text-gray-700">
            Marta Conte · Ditta Individuale
          </p>
          <p>
            Via dell'Arma di Cavalleria 4 · 31055 Quinto di Treviso (TV) ·
            Italia
          </p>
          <p className="flex flex-wrap justify-center gap-x-1">
            <span>
              P.IVA <span className="font-mono">05490170262</span>
            </span>
            <span className="text-gray-300">·</span>
            <span>
              C.F. <span className="font-mono">CNTMRT02S63L407G</span>
            </span>
          </p>
          <p>Sede legale: Via Giovanni Boccaccio, 14 - Treviso (TV) - 31100</p>
          <p className="break-words">
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

import React from "react";
import { Instagram, Facebook } from "lucide-react";

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 text-black py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
        {/* Logo Vicus */}
        <a href="/" className="flex items-center space-x-2 group">
          <img
            src="/nerocorpus.png" // Sostiture con il path corretto del tuo logo
            alt="Logo"
            className="h-16 group-hover:scale-110 transition-transform duration-200"
          />
        </a>

        {/* Social */}
        <div className="text-center">
          <p className="font-semibold text-lg mb-4">Seguici</p>
          <div className="flex justify-center space-x-6">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 hover:opacity-70"
            >
              <Instagram alt="Instagram" className="w-10 h-10 object-cover" />
            </a>
          </div>
        </div>

        {/* Link */}
        {/* <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
          <a
            href="/workinprogress"
            className="hover:text-red-600 transition-colors duration-200"
          >
            Blog
          </a>
        </div> */}

        {/* Copyright */}
        <div className="text-center text-sm">
          <p>© 2026 Nero Corpus Tattoo Studio.</p>
          <p>Tutti i diritti riservati</p>
          <p className="text-[#971e1e] text-xs m-2">
            L'arte che vive sulla tua pelle
          </p>
          <p>P.IVA 05592070261</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

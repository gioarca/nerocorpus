import React from "react";

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
  return (
    <footer className="mt-auto border-t border-gray-200 text-black py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-6">
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
              href="https://www.instagram.com/nerocorpus"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110 hover:opacity-70"
            >
              <InstagramIcon />
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
          {/* <p>P.IVA XXXXXXXXXXX</p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;

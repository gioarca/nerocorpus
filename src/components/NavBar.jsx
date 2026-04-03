import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { Instagram, Facebook, Target } from "lucide-react";
import { Menu, X } from "lucide-react";
import scrollToSection from "../utils/scrollToSection.js";

function NavBar({ contactRef }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const linkClass =
    "text-sm tracking-wide text-black hover:text-amber-500 transition-colors duration-200 px-1 py-1 border-b-2 border-transparent hover:border-amber-500";

  const links = [
    { href: "/", label: "Home" },
    {
      href: "/#studio",
      label: "Studio",
      onClick: scrollToSection,
    },
    { href: "/#chi-sono", label: "Chi Sono", onClick: scrollToSection },
    { href: "/#galleria", label: "Galleria", onClick: scrollToSection },
    { href: "/#contatti", label: "Contatti", onClick: scrollToSection },
    { href: "https://instagram.com", target: "_blank", label: <Instagram /> },
  ];

  return (
    <nav className="w-full mb-8">
      {/* stesso bg della homepage: zinc-900, bordo bottom sottile zinc-800 */}
      <div className="fixed top-0 w-full bg-white border-b border-black z-50">
        <div className="relative container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="/nerocorpus.png"
              alt="Deposito137"
              className="h-7 object-contain group-hover:opacity-80 transition-opacity duration-200 mr-6"
            />
            <span className="text-[#571d1d] font-bold mr-2">Nero</span>
            <span className="text-[#d4a574] font-bold ml-2">Corpus</span>
          </a>

          {/* Hamburger mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-zinc-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-amber-500" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6 text-black" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Menu desktop */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {links.map(({ href, label, onClick }) => (
              <a
                key={label}
                href={href}
                onClick={onClick}
                className={linkClass}
              >
                {label}
              </a>
            ))}
          </div>

          {/* Menu mobile */}
          <Transition
            show={isOpen}
            as="div"
            enter="transition duration-200 ease-out"
            enterFrom="opacity-0 -translate-y-2"
            enterTo="opacity-100 translate-y-0"
            leave="transition duration-150 ease-in"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-2"
            className="absolute top-full left-0 right-0 bg-zinc-900 border-b border-l-4 border-b-zinc-800 border-l-amber-500 shadow-xl p-5 lg:hidden"
          >
            <div className="flex flex-col space-y-1">
              {links.map(({ href, label, onClick }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => scrollToSection(item)}
                  className="text-sm font-bold uppercase tracking-wide text-black hover:text-amber-500 hover:bg-zinc-800 transition-colors duration-200 px-3 py-3 border-b border-zinc-800 last:border-0"
                >
                  {label}
                </a>
              ))}
            </div>
          </Transition>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

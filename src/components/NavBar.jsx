import React, { useState, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { Menu, X } from "lucide-react";

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sostituisci l'import di Instagram con questo componente locale
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

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  const linkClass =
    "text-sm tracking-wide text-black hover:text-amber-500 transition-colors duration-200 px-1 py-1 border-b-2 border-transparent hover:border-amber-500";

  const links = [
    { href: "/", label: "Home", id: null },
    { href: "/#studio", label: "Studio", id: "studio" },
    { href: "/#chi-sono", label: "Chi Sono", id: "chi-sono" },
    { href: "/#galleria", label: "Galleria", id: "galleria" },
    { href: "/#contatti", label: "Contatti", id: "contatti" },
    {
      href: "https://instagram.com/nerocorpus",
      // eslint-disable-next-line react-hooks/static-components
      label: <InstagramIcon />,
      id: null,
      target: "_blank",
    },
  ];

  return (
    <nav className="w-full mb-8">
      <div className="fixed top-0 w-full bg-white border-b border-black z-50">
        <div className="relative container mx-auto px-4 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center group">
            <img
              src="/nerocorpus.png"
              alt="Nero Corpus"
              className="h-7 object-contain group-hover:opacity-80 transition-opacity duration-200 mr-6"
            />
            <span
              className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors ${
                scrolled ? "text-black" : "text-zinc-700"
              } group-hover:text-red-900`}
            >
              NERO CORPUS
            </span>
          </a>

          {/* Hamburger mobile */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-zinc-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
            {links.map(({ href, label, id, target }) => (
              <a
                key={href}
                href={href}
                target={target}
                rel={target === "_blank" ? "noopener noreferrer" : undefined}
                onClick={
                  id
                    ? (e) => {
                        e.preventDefault();
                        scrollToSection(id);
                      }
                    : undefined
                }
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
              {links.map(({ href, label, id, target }) => (
                <a
                  key={href}
                  href={href}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                  onClick={
                    id
                      ? (e) => {
                          e.preventDefault();
                          scrollToSection(id);
                        }
                      : undefined
                  }
                  className="text-sm font-bold uppercase tracking-wide text-white hover:text-amber-500 hover:bg-zinc-800 transition-colors duration-200 px-3 py-3 border-b border-zinc-800 last:border-0"
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

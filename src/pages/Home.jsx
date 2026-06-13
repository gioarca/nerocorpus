import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  MapPin,
  Mail,
  ChevronDown,
  ArrowRight,
  Sparkles,
  LampDesk,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import Form from "../components/Form";

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

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();
  const [lightbox, setLightbox] = useState({ open: false, index: 0 });

  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ["home", "studio", "chi-sono", "galleria", "contatti"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!lightbox.open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") setLightbox((l) => ({ ...l, open: false }));
      if (e.key === "ArrowRight")
        setLightbox((l) => ({
          ...l,
          index: (l.index + 1) % galleryImages.length,
        }));
      if (e.key === "ArrowLeft")
        setLightbox((l) => ({
          ...l,
          index: (l.index - 1 + galleryImages.length) % galleryImages.length,
        }));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox.open]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    emailjs
      .sendForm(
        "service_7khyl6i",
        "template_jjc3jdm",
        form.current,
        "jjFvCEL0VM8Mcw5vK",
      )
      .then(
        () => {
          setTimeout(() => {
            setIsSubmitting(false);
            setFormValues({
              user_name: "",
              user_email: "",
              user_phone: "",
              message: "",
            });
            window.location.href = "/thanks";
          }, 1500);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setIsSubmitting(false);
        },
      );
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const offset = 80;
    const elementPosition = element?.getBoundingClientRect().top || 0;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  const galleryImages = [
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344234/55916220-08B3-4D46-8308-B78FAD279B17_4_5005_c_kheijq.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344070/DBAEC495-B5B8-407A-A09D-4DF318D2ABB3_1_102_o_yv5qks.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344133/10324BD3-6ADE-4354-B989-4F3A57B1C8B0_4_5005_c_aopjnl.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344175/6ECA3D30-95BE-4462-9043-F5EBD19DAC62_4_5005_c_anutgm.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344162/B23BC8C2-3C5C-446D-938E-4966D690E64E_4_5005_c_xlmh8f.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344013/1E201C3B-3842-43FB-90AE-C3E2A66B72E9_1_102_o_vspdiz.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343716/IMG_5245_cspefw.jpg",
    "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343652/IMG_5216_cbww33.jpg",
    // aggiungi qui le altre URL Cloudinary
  ];

  return (
    <div className="bg-white text-black font-sans antialiased">
      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
      >
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 sm:pt-0">
          <div className="mb-6 sm:mb-8">
            <img
              src="/nerocorpus.png"
              className="h-48 sm:h-64 lg:h-80 mx-auto"
              alt="Nero Corpus Logo"
            />
          </div>

          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-black tracking-[0.1em] font-light uppercase">
              L'arte sulla tua pelle
            </h1>
            <p className="text-base sm:text-lg text-gray-500 font-light">
              Quinto di Treviso (TV)
            </p>
          </div>

          <button
            onClick={() => scrollToSection("contatti")}
            className="group relative inline-flex items-center gap-2 bg-black text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:bg-red-900 transition-all duration-500 transform hover:scale-105 shadow-2xl"
          >
            <a href="#contatti" className="block">
              <span>Prenota Ora</span>
            </a>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("studio")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        >
          <ChevronDown
            size={32}
            className="text-gray-400 group-hover:text-black transition-colors"
          />
        </button>
      </section>

      {/* Studio Section */}
      <section id="studio" className="py-16 sm:py-24 lg:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-1 lg:order-2">
              <div className="relative aspect-4/5 sm:aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1595747644932-abb68f85f419?ixlib=rb-4.1.0&auto=format&fit=crop&q=60&w=900"
                  alt="Studio Nero Corpus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold">
                  <LampDesk size={16} />
                  <span>Lo Studio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight font-pirata-one">
                  Dove l'arte prende vita
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Benvenuti da{" "}
                  <span className="font-bold text-black">Nero Corpus</span>, lo
                  studio tattoo di riferimento a Quinto di Treviso. Creo opere
                  d'arte uniche che raccontano la tua storia attraverso
                  l'inchiostro.
                </p>
                <p>
                  Combino tecnica e creatività senza limiti per trasformare le
                  tue idee in tatuaggi indimenticabili.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <div className="bg-gray-50 px-6 py-4 rounded-2xl border border-gray-100 hover:border-red-900 hover:shadow-lg transition-all duration-300">
                  <p className="text-red-900 font-black text-3xl mb-1">100+</p>
                  <p className="text-sm text-gray-600 uppercase tracking-wide">
                    Tatuaggi realizzati
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chi Sono Section */}
      <section
        id="chi-sono"
        className="py-16 sm:py-24 lg:py-32 px-4 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
              <span>L'Artista</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-pirata-one">
              Chi sono
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Immagine di Marta */}
            <div className="max-w-md mx-auto lg:mx-0 w-full">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl">
                <div className="relative aspect-3/4">
                  <img
                    src="https://res.cloudinary.com/dzoceyg2u/image/upload/v1781255060/bc0ecd1a-c58e-41af-82ca-525f2fb6b861_ytao9c.jpg"
                    alt="Marta Conte"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-black mb-2">
                      Marta Conte
                    </h3>
                    <p className="text-base sm:text-lg text-white/80 font-light">
                      Blackwork & Fine line
                    </p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-all duration-500" />
              </div>
            </div>

            {/* Descrizione di Marta */}
            <div className="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
              <p>
                Classe 2002, carattere da vendere e una passione sfrenata per
                l'arte del tatuaggio. Mi chiamo Marta Conte e sono la mente
                creativa dietro lo studio di NeroCorpus. Artista nata, ho
                trasformato la mia passione in una professione, dedicandomi a
                creare tatuaggi che non sono solo disegni, ma vere e proprie
                opere d'arte sulla pelle. Con un occhio attento ai dettagli e
                una mano ferma, mi impegno a realizzare ogni tatuaggio con
                precisione e cura, assicurandomi che ogni cliente esca dal mio
                studio con un pezzo unico che racconta la sua storia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galleria" className="py-16 sm:py-24 lg:py-32 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
              <span>Il Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-pirata-one">
              Galleria
            </h2>
          </div>

          {/* Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {galleryImages.map((image, i) => (
              <div
                key={i}
                onClick={() => setLightbox({ open: true, index: i })}
                className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={image}
                  alt={`Tattoo ${i + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  {/* <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 tracking-widest uppercase">
                    Vedi
                  </span> */}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightbox.open && (
          <div
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox((l) => ({ ...l, open: false }))}
          >
            {/* Chiudi */}
            <button
              onClick={() => setLightbox((l) => ({ ...l, open: false }))}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Chiudi"
            >
              <X size={32} />
            </button>

            {/* Freccia sinistra */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => ({
                  ...l,
                  index:
                    (l.index - 1 + galleryImages.length) % galleryImages.length,
                }));
              }}
              className="absolute left-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Precedente"
            >
              <ChevronDown size={36} className="rotate-90" />
            </button>

            {/* Immagine */}
            <img
              src={galleryImages[lightbox.index]}
              alt={`Tattoo ${lightbox.index + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            />

            {/* Freccia destra */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightbox((l) => ({
                  ...l,
                  index: (l.index + 1) % galleryImages.length,
                }));
              }}
              className="absolute right-4 text-white/70 hover:text-white transition-colors p-2"
              aria-label="Successivo"
            >
              <ChevronDown size={36} className="-rotate-90" />
            </button>

            {/* Contatore */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
              {lightbox.index + 1} / {galleryImages.length}
            </div>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <div id="contatti" className="py-16 sm:py-24 lg:py-32 px-4 bg-gray-50">
        <Form />
      </div>
    </div>
  );
}

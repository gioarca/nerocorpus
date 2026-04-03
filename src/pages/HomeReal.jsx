import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
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

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
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

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="bg-white text-black font-sans antialiased">
      {/* Navigation - Fixed Header */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <button
              onClick={() => scrollToSection("home")}
              className="shrink-0 group"
            >
              <span
                className={`text-xl sm:text-2xl font-black tracking-tighter transition-colors ${
                  scrolled ? "text-black" : "text-white"
                } group-hover:text-red-900`}
              >
                <a href="/">NERO CORPUS</a>
              </span>
            </button>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {["home", "studio", "chi-sono", "galleria", "contatti"].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`px-3 lg:px-4 py-2 text-xs lg:text-sm tracking-wider font-semibold rounded-full transition-all duration-300 ${
                      activeSection === section
                        ? "bg-black text-white"
                        : scrolled
                          ? "text-gray-700 hover:bg-gray-100"
                          : "text-white/90 hover:bg-white/10"
                    }`}
                  >
                    {section === "chi-sono" ? "chi sono" : section}
                  </button>
                ),
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled
                  ? "text-black hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-white border-t border-gray-100 px-4 py-4 space-y-2">
            {["home", "studio", "chi-sono", "galleria", "contatti"].map(
              (section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm tracking-wider font-semibold transition-all ${
                    activeSection === section
                      ? "bg-black text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {section === "chi-sono" ? "Chi Sono" : section}
                </button>
              ),
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Screen Impact */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 sm:pt-0">
          <div className="mb-6 sm:mb-8">
            <img
              src="/nerocorpus.png"
              className="h-48 sm:h-64 lg:h-80 mx-auto drop-shadow-2xl"
              alt="Nero Corpus Logo"
            />
          </div>

          <div className="space-y-4 sm:space-y-6 mb-8 sm:mb-12">
            <h1 className="text-xl sm:text-2xl lg:text-3xl text-white/90 tracking-[0.3em] font-light uppercase">
              L'arte sulla tua pelle
            </h1>
            <p className="text-base sm:text-lg text-white/70 font-light">
              Treviso
            </p>
          </div>

          <button
            onClick={() => scrollToSection("contatti")}
            className="group relative inline-flex items-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base font-bold hover:bg-red-900 hover:text-white transition-all duration-500 transform hover:scale-105 shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">Prenota Ora</span>
            <ArrowRight
              size={18}
              className="relative z-10 group-hover:translate-x-1 transition-transform"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-900 to-red-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => scrollToSection("studio")}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group"
        >
          <ChevronDown
            size={32}
            className="text-white/60 group-hover:text-white transition-colors"
          />
        </button>
      </section>

      {/* Studio Section */}
      <section id="studio" className="py-16 sm:py-24 lg:py-32 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image - Mobile First */}
            <div className="order-1 lg:order-2">
              <div className="relative aspect-[4/5] sm:aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                <img
                  src="https://images.unsplash.com/photo-1595747644932-abb68f85f419?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGF0dG9vJTIwc3R1ZGlvfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=900"
                  alt="Studio Nero Corpus"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>

            {/* Text */}
            <div className="order-2 lg:order-1 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-4">
                <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold">
                  <Sparkles size={16} />
                  <span>Il Nostro Studio</span>
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight">
                  Dove l'arte
                  <br />
                  prende vita
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6 text-gray-600 text-base sm:text-lg leading-relaxed">
                <p>
                  Benvenuti da{" "}
                  <span className="font-bold text-black">Nero Corpus</span>, lo
                  studio tattoo di riferimento nella provincia di Treviso.
                  Creiamo opere d'arte uniche che raccontano la tua storia
                  attraverso l'inchiostro.
                </p>
                <p>
                  Marta combina tecnica impeccabile e creatività senza limiti
                  per trasformare le tue idee in tatuaggi indimenticabili.
                </p>
              </div>

              {/* Stats */}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              Chi sono
            </h2>
          </div>

          <div className="flex justify-center">
            <div className="max-w-md w-full">
              <div className="group relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-500 hover:shadow-3xl">
                {/* Image Container */}
                <div className="relative aspect-[3/4]">
                  <img
                    src="https://images.unsplash.com/photo-1736596059713-cd4e9ad763b6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHx0YXR0b28lMjBzdHVkaW98ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=900"
                    alt="Marta Conte"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                  {/* Text Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 text-white">
                    <h3 className="text-2xl sm:text-3xl font-black mb-2">
                      Marta Conte
                    </h3>
                    <p className="text-base sm:text-lg text-white/80 font-light">
                      Realistico & Ritratti
                    </p>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-all duration-500"></div>
              </div>
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black">
              Galleria
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {[
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344234/55916220-08B3-4D46-8308-B78FAD279B17_4_5005_c_kheijq.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344070/DBAEC495-B5B8-407A-A09D-4DF318D2ABB3_1_102_o_yv5qks.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344133/10324BD3-6ADE-4354-B989-4F3A57B1C8B0_4_5005_c_aopjnl.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344175/6ECA3D30-95BE-4462-9043-F5EBD19DAC62_4_5005_c_anutgm.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344162/B23BC8C2-3C5C-446D-938E-4966D690E64E_4_5005_c_xlmh8f.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344013/1E201C3B-3842-43FB-90AE-C3E2A66B72E9_1_102_o_vspdiz.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343716/IMG_5245_cspefw.jpg",
              "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343652/IMG_5216_cbww33.jpg",
            ].map((image, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img
                  src={image}
                  alt={`Tattoo ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                  <span className="text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:scale-110">
                    Tattoo #{i + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contatti"
        className="py-16 sm:py-24 lg:py-32 px-4 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
              <span>Contatti</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4">
              Prenota ora
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Inizia il tuo viaggio verso un tatuaggio indimenticabile
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Info - Mobile First */}
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-black mb-6">
                  Vieni a trovarci
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 group">
                    <div className="mt-1 p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <MapPin className="text-red-900" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Indirizzo</p>
                      <p className="text-gray-600">Treviso (TV)</p>
                    </div>
                  </div>

                  <a
                    href="mailto:martaconte.tattoo@gmail.com"
                    className="flex items-start gap-4 group hover:bg-gray-50 p-3 -m-3 rounded-xl transition-colors"
                  >
                    <div className="mt-1 p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <Mail className="text-red-900" size={20} />
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Email</p>
                      <p className="text-gray-600 break-all">
                        martaconte.tattoo@gmail.com
                      </p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-black mb-6">
                  Richiedi una consulenza
                </h3>

                <form ref={form} onSubmit={sendEmail} className="space-y-5">
                  <div>
                    <label
                      htmlFor="user_name"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Nome <span className="text-red-900">*</span>
                    </label>
                    <input
                      type="text"
                      id="user_name"
                      name="user_name"
                      value={formValues.user_name}
                      onChange={handleChange}
                      required
                      placeholder="Il tuo nome"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user_email"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Email <span className="text-red-900">*</span>
                    </label>
                    <input
                      type="email"
                      id="user_email"
                      name="user_email"
                      value={formValues.user_email}
                      onChange={handleChange}
                      required
                      placeholder="tua@email.com"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="user_phone"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Telefono{" "}
                      <span className="text-gray-400 text-xs font-normal">
                        (opzionale)
                      </span>
                    </label>
                    <input
                      type="tel"
                      id="user_phone"
                      name="user_phone"
                      value={formValues.user_phone}
                      onChange={handleChange}
                      placeholder="+39 123 456 7890"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-gray-700 mb-2"
                    >
                      Messaggio{" "}
                      <span className="text-gray-400 text-xs font-normal">
                        (opzionale)
                      </span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formValues.message}
                      onChange={handleChange}
                      placeholder="Descrivi la tua idea per il tatuaggio..."
                      rows="4"
                      className="w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-black text-white py-4 rounded-2xl font-bold hover:bg-red-900 transition-all duration-500 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Invio in corso...
                      </span>
                    ) : (
                      "Invia Richiesta"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

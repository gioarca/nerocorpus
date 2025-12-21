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
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { i, image, img } from "framer-motion/client";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // const [dots, setDots] = useState("");
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formValues, setFormValues] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    message: "",
  });
  // const [privacyAccepted, setPrivacyAccepted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setDots((prev) => {
  //       if (prev === "...") return "";
  //       return prev + ".";
  //     });
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // if (!privacyAccepted) {
    //   alert("Devi accettare la privacy policy per continuare.");
    //   return;
    // }
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_7khyl6i",
        "template_jjc3jdm",
        form.current,
        "jjFvCEL0VM8Mcw5vK"
      )
      .then(
        () => {
          console.log("SUCCESS!");
          setTimeout(() => {
            console.log("Form submitted:", formValues);
            setIsSubmitting(false);
            setFormValues({
              user_name: "",
              user_email: "",
              user_phone: "",
              message: "",
            });
            // setPrivacyAccepted(false);
            window.location.href = "/thanks";
          }, 2000);
        },
        (error) => {
          console.error("FAILED...", error.text);
          setIsSubmitting(false);
        }
      );
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActiveSection(id);
  };

  return (
    <div className="bg-[#1a1a1a] text-white font-sans">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl sm:text-3xl font-bold tracking-wider">
              <span className="text-[#2d5f5f]">NERO</span>
              <span className="text-[#d4a574] ml-2">CORPUS</span>
            </div>

            <div className="hidden md:flex space-x-8">
              {["home", "studio", "chi sono", "galleria", "contatti"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-sm uppercase tracking-widest transition-colors hover:text-[#d4a574] ${
                      activeSection === item ? "text-[#d4a574]" : "text-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            menuOpen ? "max-h-64" : "max-h-0"
          }`}
        >
          <div className="px-4 py-6 space-y-4 bg-[#1a1a1a]/98">
            {["home", "studio", "chi sono", "galleria", "contatti"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left text-sm uppercase tracking-widest hover:text-[#d4a574] transition-colors"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-br from-[#2d5f5f] via-[#1a1a1a] to-[#3d5c4a] opacity-90"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a574' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative z-10 text-center px-4 max-w-5xl">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
            <span className="block text-[#2d5f5f] drop-shadow-lg">NERO</span>
            <span className="block text-[#d4a574] drop-shadow-lg">CORPUS</span>
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-gray-300 tracking-wide">
            L'arte sulla tua pelle • Treviso
          </p>
          <button
            onClick={() => scrollToSection("contatti")}
            className="bg-[#d4a574] text-[#1a1a1a] px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#3d5c4a] hover:text-white transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Prenota Ora
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={40} className="text-[#d4a574]" />
        </div>
      </section>

      {/* About me Section */}
      <section
        id="studio"
        className="py-24 px-4 bg-linear-to-b from-[#1a1a1a] to-[#2d5f5f]/20"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl sm:text-5xl font-bold text-[#d4a574] mb-4">
                Lo studio
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Benvenuti da Nero Corpus, lo studio tattoo di riferimento nella
                provincia di Treviso. Creiamo opere d'arte uniche che raccontano
                la tua storia attraverso l'inchiostro.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Marta combina tecnica impeccabile e creatività senza limiti per
                trasformare le tue idee in tatuaggi indimenticabili.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                {/* <div className="bg-[#2d5f5f] px-6 py-3 rounded-lg">
                  <p className="text-[#d4a574] font-bold text-2xl">10+</p>
                  <p className="text-sm text-gray-300">Anni di esperienza</p>
                </div> */}
                <div className="bg-[#3d5c4a] px-6 py-3 rounded-lg">
                  <p className="text-[#d4a574] font-bold text-2xl">100+</p>
                  <p className="text-sm text-gray-300">Tatuaggi realizzati</p>
                </div>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-linear-to-br from-[#2d5f5f] to-[#3d5c4a] flex items-center justify-center">
                {/* <p className="text-6xl text-[#d4a574] opacity-20">NC</p> */}
                <img
                  src="https://images.unsplash.com/photo-1595747644932-abb68f85f419?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dGF0dG9vJTIwc3R1ZGlvfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=900"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artista con descrizione */}
      <section id="chi sono" className="py-24 px-4 bg-[#1a1a1a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-[#d4a574]">
            Chi sono
          </h2>
          <div className="flex sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center items-center">
            {[
              {
                name: "Marta Conte",
                specialty: "Realistico & Ritratti",
                color: "#2d5f5f",
                image:
                  "https://images.unsplash.com/photo-1736596059713-cd4e9ad763b6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE0fHx0YXR0b28lMjBzdHVkaW98ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=900",
              },
              // {
              //   name: "Sara Bianchi",
              //   specialty: "Giapponese & Oriental",
              //   color: "#3d5c4a",
              //   image:
              //     "https://images.unsplash.com/photo-1562259954-bf6c7f31bf60?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
              // },
              // {
              //   name: "Luca Verdi",
              //   specialty: "Blackwork & Geometrico",
              //   color: "#d4a574",
              //   image:
              //     "https://images.unsplash.com/photo-1509965478903-f26fb372b4e3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1740",
              // },
            ].map((artist, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-2xl shadow-xl transition-transform hover:scale-105 duration-300"
              >
                <div
                  className="h-96 flex items-end justify-center p-6"
                  style={{
                    background: `linear-gradient(to bottom, ${artist.color}40, ${artist.color})`,
                  }}
                >
                  <div className="text-center">
                    <img src={artist.image}></img>
                    <h3 className="text-2xl font-bold mt-2 mb-2">
                      {artist.name}
                    </h3>
                    <p className="text-gray-300">{artist.specialty}</p>
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="galleria"
        className="py-24 px-4 bg-linear-to-b from-[#1a1a1a] to-[#2d5f5f]/30"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-[#d4a574]">
            Galleria
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              {
                i: 1,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344234/55916220-08B3-4D46-8308-B78FAD279B17_4_5005_c_kheijq.jpg",
              },
              {
                i: 2,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344070/DBAEC495-B5B8-407A-A09D-4DF318D2ABB3_1_102_o_yv5qks.jpg",
              },
              {
                i: 3,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344133/10324BD3-6ADE-4354-B989-4F3A57B1C8B0_4_5005_c_aopjnl.jpg",
              },
              {
                i: 4,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344175/6ECA3D30-95BE-4462-9043-F5EBD19DAC62_4_5005_c_anutgm.jpg",
              },
              {
                i: 5,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344162/B23BC8C2-3C5C-446D-938E-4966D690E64E_4_5005_c_xlmh8f.jpg",
              },
              {
                i: 6,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766344013/1E201C3B-3842-43FB-90AE-C3E2A66B72E9_1_102_o_vspdiz.jpg",
              },
              {
                i: 7,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343716/IMG_5245_cspefw.jpg",
              },
              {
                i: 8,
                image:
                  "https://res.cloudinary.com/dzoceyg2u/image/upload/v1766343652/IMG_5216_cbww33.jpg",
              },
            ].map((tattoo, i) => (
              <div
                key={i}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer shadow-lg"
              >
                <div className="w-full h-full bg-linear-to-br flex items-center justify-center">
                  <img
                    src={
                      tattoo.image ||
                      `https://res.cloudinary.com/dzoceyg2u/image/upload/v1702138281/placeholder_tattoo_qxqfhi.jpg`
                    }
                    alt={`Tattoo ${i}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                    Tattoo #{i}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contatti" className="py-24 px-4 bg-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-[#d4a574]">
            Contattaci
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#2d5f5f] mb-6">
                Vieni a trovarci
              </h3>
              <div className="flex items-start gap-4">
                <MapPin className="text-[#d4a574] mt-1 shrink-0" size={24} />
                <div>
                  <p className="text-gray-400">Treviso (TV)</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-4">
                <Phone className="text-[#d4a574]" size={24} />
                <p className="text-gray-300">+39 333 123 4567</p>
              </div> */}
              <a href="mailto:martaconte.tattoo@gmail.com">
                <div className="flex items-center gap-4">
                  <Mail className="text-[#d4a574]" size={24} />
                  <p className="text-gray-300">Mail</p>
                </div>
              </a>
              {/* <div className="flex gap-4 pt-6">
                <a
                  href="#"
                  className="bg-[#2d5f5f] p-3 rounded-full hover:bg-[#3d5c4a] transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="#"
                  className="bg-[#2d5f5f] p-3 rounded-full hover:bg-[#3d5c4a] transition-colors"
                >
                  <Facebook size={24} />
                </a>
              </div> */}
            </div>

            <div className="bg-[#2d5f5f]/20 p-8 rounded-2xl border border-[#2d5f5f]/50">
              <h3 className="text-xl font-bold mb-6">
                Prenota la tua consulenza
              </h3>
              <form ref={form} onSubmit={sendEmail}>
                <div className="space-y-4">
                  <label
                    htmlFor="user_name"
                    className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wide"
                  >
                    Nome<span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formValues.user_name}
                    onChange={handleChange}
                    required
                    placeholder="Nome"
                    className="w-full bg-[#1a1a1a] border border-[#2d5f5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4a574] transition-colors"
                  />
                  <label
                    htmlFor="user_email"
                    className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wide"
                  >
                    Email<span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="user_email"
                    name="user_email"
                    value={formValues.user_email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full bg-[#1a1a1a] border border-[#2d5f5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4a574] transition-colors"
                  />
                  <label
                    htmlFor="user_phone"
                    className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wide"
                  >
                    Telefono{" "}
                    <span className="text-zinc-600 text-xs normal-case">
                      (opzionale)
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="user_phone"
                    name="user_phone"
                    value={formValues.user_phone}
                    onChange={handleChange}
                    placeholder="Telefono"
                    className="w-full bg-[#1a1a1a] border border-[#2d5f5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4a574] transition-colors"
                  />

                  {/* Messaggio */}
                  <label
                    htmlFor="message"
                    className="block text-sm font-bold text-zinc-300 mb-2 uppercase tracking-wide"
                  >
                    Messaggio{" "}
                    <span className="text-zinc-600 text-xs normal-case">
                      (opzionale)
                    </span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formValues.messaggio}
                    onChange={handleChange}
                    placeholder="Descrivi la tua idea"
                    rows="4"
                    className="w-full bg-[#1a1a1a] border border-[#2d5f5f] rounded-lg px-4 py-3 focus:outline-none focus:border-[#d4a574] transition-colors resize-none"
                  ></textarea>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-[#d4a574] text-[#1a1a1a] py-3 rounded-lg font-semibold hover:bg-[#3d5c4a] hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    Invia Richiesta
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0d0d0d] py-8 px-4 border-t border-[#2d5f5f]/30">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Nero Corpus Tattoo Studio.
          </p>
          <p className="text-gray-400 text-sm">Tutti i diritti riservati</p>
          <p className="text-[#d4a574] text-xs mt-2">
            L'arte che vive sulla tua pelle
          </p>
        </div>
      </footer>
    </div>
  );
}

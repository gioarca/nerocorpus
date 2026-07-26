import React from "react";

const FormOld = () => {
  return (
    <div>
      <section
        id="contatti"
        className="py-16 sm:py-24 lg:py-32 px-4 bg-gray-50"
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-red-900 text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
              <span>Contatti</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-4 font-pirata-one">
              Prenota ora
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Inizia il tuo viaggio verso un tatuaggio indimenticabile
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-black mb-6 font-pirata-one">
                  Vieni a trovarci
                </h3>
                <div className="space-y-4">
                  {/* Mappa */}
                  <a
                    href="https://maps.app.goo.gl/oheoVoJVqyKPyNbr9"
                    className="flex items-start gap-4 group hover:bg-gray-50 p-3 -m-3 rounded-xl transition-colors"
                  >
                    <div className="flex items-start gap-4 group">
                      <div className="mt-1 p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                        <MapPin className="text-red-900" size={20} />
                      </div>

                      <div>
                        <p className="font-semibold text-black mb-1">
                          Indirizzo
                        </p>
                        <p className="text-red-900">
                          Via dell'Arma di Cavalleria 4 · Quinto di Treviso (TV)
                        </p>
                      </div>
                    </div>
                  </a>

                  {/* Mail */}
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

                  {/* Instagram nei contatti */}
                  <a
                    href="https://www.instagram.com/nerocorpus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group hover:bg-gray-50 p-3 -m-3 rounded-xl transition-colors"
                  >
                    <div className="mt-1 p-2 bg-red-50 rounded-lg group-hover:bg-red-100 transition-colors">
                      <InstagramIcon className="text-red-900" />
                    </div>
                    <div>
                      <p className="font-semibold text-black mb-1">Instagram</p>
                      <p className="text-gray-600">@nerocorpus</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-3">
              <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-xl sm:text-2xl font-black mb-6 font-pirata-one">
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
};

export default FormOld;

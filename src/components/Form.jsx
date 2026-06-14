import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Check,
  Loader2,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import IubendaLink from "./IubendaLink";

const EMAILJS_SERVICE_ID = "service_7khyl6i";
const EMAILJS_TEMPLATE_ID = "template_jjc3jdm";
const EMAILJS_PUBLIC_KEY = "jjFvCEL0VM8Mcw5vK";

const MAX_MESSAGE_LENGTH = 500;

const INITIAL_VALUES = {
  user_name: "",
  user_email: "",
  user_phone: "",
  message: "",
  privacy_consent: false,
  marketing_consent: false,
};

const inputBase =
  "w-full bg-gray-50 border-2 border-gray-200 rounded-2xl pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white focus:ring-4 focus:ring-red-900/10 transition-all duration-200";

const labelClass = "block text-sm font-bold text-gray-700 mb-2";

export default function Form({ onSuccess }) {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setIsSubmitting(true);

    emailjs
      .sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        EMAILJS_PUBLIC_KEY,
      )
      .then(
        () => {
          setTimeout(() => {
            setIsSubmitting(false);
            setFormValues(INITIAL_VALUES);
            if (onSuccess) onSuccess();
            else window.location.href = "/thanks";
          }, 1200);
        },
        (error) => {
          console.error("EmailJS failed:", error?.text || error);
          setIsSubmitting(false);
          setErrorMsg(
            "Si è verificato un errore. Riprova tra qualche istante o scrivici via email.",
          );
        },
      );
  };

  return (
    <div className="relative w-full max-w-xl mx-auto bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Glow decorativo */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-red-900/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"
      />

      <div className="relative">
        <h3 className="text-2xl sm:text-3xl font-black mb-2 font-pirata-one">
          Richiedi una consulenza
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Compila il modulo, ti risponderò il prima possibile.
        </p>

        <form ref={form} onSubmit={sendEmail} className="space-y-5" noValidate>
          {/* Nome */}
          <div>
            <label htmlFor="user_name" className={labelClass}>
              Nome <span className="text-red-900">*</span>
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formValues.user_name}
                onChange={handleChange}
                required
                placeholder="Il tuo nome"
                className={inputBase}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="user_email" className={labelClass}>
              Email <span className="text-red-900">*</span>
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="email"
                id="user_email"
                name="user_email"
                value={formValues.user_email}
                onChange={handleChange}
                required
                placeholder="tua@email.com"
                className={inputBase}
              />
            </div>
          </div>

          {/* Telefono */}
          <div>
            <label htmlFor="user_phone" className={labelClass}>
              Telefono{" "}
              <span className="text-gray-400 text-xs font-normal">
                (opzionale)
              </span>
            </label>
            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="tel"
                id="user_phone"
                name="user_phone"
                value={formValues.user_phone}
                onChange={handleChange}
                placeholder="+39 123 456 7890"
                className={inputBase}
              />
            </div>
          </div>

          {/* Messaggio */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="message"
                className="text-sm font-bold text-gray-700"
              >
                Messaggio{" "}
                <span className="text-gray-400 text-xs font-normal">
                  (opzionale)
                </span>
              </label>
              <span
                className={`text-xs tabular-nums transition-colors ${
                  formValues.message.length > MAX_MESSAGE_LENGTH * 0.9
                    ? "text-red-900"
                    : "text-gray-400"
                }`}
              >
                {formValues.message.length}/{MAX_MESSAGE_LENGTH}
              </span>
            </div>
            <div className="relative">
              <MessageSquare
                size={18}
                className="absolute left-4 top-4 text-gray-400 pointer-events-none"
              />
              <textarea
                id="message"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                placeholder="Descrivi la tua idea: stile, soggetto, dimensione, zona del corpo..."
                rows="4"
                maxLength={MAX_MESSAGE_LENGTH}
                className={`${inputBase} resize-none`}
              />
            </div>
          </div>

          {/* Blocco consensi */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-200">
            <div className="flex items-start gap-2 text-xs text-gray-600 leading-relaxed pb-3 border-b border-gray-200">
              <ShieldCheck size={16} className="text-red-900 mt-0.5 shrink-0" />
              <p>
                Titolare del trattamento: <strong>Marta Conte</strong>. I dati
                saranno trattati solo per rispondere alla tua richiesta.
                Maggiori informazioni nella{" "}
                <IubendaLink
                  type="privacy"
                  className="text-red-900 font-semibold underline hover:no-underline"
                >
                  Privacy Policy
                </IubendaLink>
                .
              </p>
            </div>

            {/* Privacy (obbligatorio) */}
            <label
              htmlFor="privacy_consent"
              className="flex items-start gap-3 cursor-pointer group"
            >
              <span className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="privacy_consent"
                  name="privacy_consent"
                  checked={formValues.privacy_consent}
                  onChange={handleChange}
                  required
                  className="peer sr-only"
                />
                <span className="block w-5 h-5 rounded-md border-2 border-gray-300 bg-white transition-all duration-200 group-hover:border-red-900/60 peer-checked:bg-red-900 peer-checked:border-red-900 peer-focus-visible:ring-2 peer-focus-visible:ring-red-900/40 peer-focus-visible:ring-offset-2" />
                <Check
                  size={14}
                  strokeWidth={3}
                  className="absolute top-0.5 left-0.5 text-white opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 pointer-events-none"
                />
              </span>
              <span className="text-sm text-gray-700 leading-relaxed select-none">
                Ho letto e accetto la{" "}
                <IubendaLink
                  type="privacy"
                  className="text-red-900 font-semibold underline hover:no-underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  Privacy Policy
                </IubendaLink>{" "}
                e acconsento al trattamento dei dati per questa richiesta.{" "}
                <span className="text-red-900">*</span>
              </span>
            </label>

            {/* Marketing (opzionale) */}
            <label
              htmlFor="marketing_consent"
              className="flex items-start gap-3 cursor-pointer group"
            >
              <span className="relative shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  id="marketing_consent"
                  name="marketing_consent"
                  checked={formValues.marketing_consent}
                  onChange={handleChange}
                  className="peer sr-only"
                />
                <span className="block w-5 h-5 rounded-md border-2 border-gray-300 bg-white transition-all duration-200 group-hover:border-red-900/60 peer-checked:bg-red-900 peer-checked:border-red-900 peer-focus-visible:ring-2 peer-focus-visible:ring-red-900/40 peer-focus-visible:ring-offset-2" />
                <Check
                  size={14}
                  strokeWidth={3}
                  className="absolute top-0.5 left-0.5 text-white opacity-0 scale-50 peer-checked:opacity-100 peer-checked:scale-100 transition-all duration-200 pointer-events-none"
                />
              </span>
              <span className="text-sm text-gray-600 leading-relaxed select-none">
                Acconsento a ricevere novità e offerte da Nero Corpus.{" "}
                <span className="text-gray-400 text-xs">(facoltativo)</span>
              </span>
            </label>
          </div>

          {/* Hidden per EmailJS */}
          <input
            type="hidden"
            name="privacy_consent_value"
            value={formValues.privacy_consent ? "Sì" : "No"}
          />
          <input
            type="hidden"
            name="marketing_consent_value"
            value={formValues.marketing_consent ? "Sì" : "No"}
          />
          <input
            type="hidden"
            name="consent_timestamp"
            value={new Date().toISOString()}
          />

          {/* Errore */}
          {errorMsg && (
            <div
              role="alert"
              className="bg-red-50 border border-red-200 text-red-900 rounded-2xl p-4 text-sm flex items-start gap-2"
            >
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit */}
          <button
            disabled={isSubmitting || !formValues.privacy_consent}
            type="submit"
            className="group relative w-full bg-black text-white py-4 rounded-2xl font-bold overflow-hidden transition-all duration-500 hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg enabled:hover:shadow-2xl enabled:hover:shadow-red-900/30"
          >
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-r from-red-900 to-black opacity-0 group-enabled:group-hover:opacity-100 transition-opacity duration-500"
            />
            <span className="relative flex items-center justify-center gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Invio in corso...
                </>
              ) : (
                <>
                  Invia Richiesta
                  <Send
                    size={18}
                    className="group-enabled:group-hover:translate-x-1 transition-transform"
                  />
                </>
              )}
            </span>
          </button>

          {!formValues.privacy_consent && !isSubmitting && (
            <p className="text-xs text-gray-400 text-center -mt-2">
              Accetta la privacy policy per inviare
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

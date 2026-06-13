import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_7khyl6i";
const EMAILJS_TEMPLATE_ID = "template_jjc3jdm";
const EMAILJS_PUBLIC_KEY = "jjFvCEL0VM8Mcw5vK";

const INITIAL_VALUES = {
  user_name: "",
  user_email: "",
  user_phone: "",
  message: "",
  privacy_consent: false,
  marketing_consent: false,
};

export default function ContactForm({ onSuccess }) {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [formValues, setFormValues] = useState(INITIAL_VALUES);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
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
            if (onSuccess) {
              onSuccess();
            } else {
              window.location.href = "/thanks";
            }
          }, 1500);
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

  const inputClass =
    "w-full bg-gray-50 border-2 border-gray-200 rounded-2xl px-4 py-3 text-black placeholder:text-gray-400 focus:outline-none focus:border-red-900 focus:bg-white transition-all";

  const labelClass = "block text-sm font-bold text-gray-700 mb-2";

  return (
    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100">
      <h3 className="text-xl sm:text-2xl font-black mb-6 font-pirata-one">
        Richiedi una consulenza
      </h3>

      <form
        ref={form}
        onSubmit={sendEmail}
        id="contatti"
        className="space-y-5"
        noValidate
      >
        {/* Nome */}
        <div>
          <label htmlFor="user_name" className={labelClass}>
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
            className={inputClass}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="user_email" className={labelClass}>
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
            className={inputClass}
          />
        </div>

        {/* Telefono */}
        <div>
          <label htmlFor="user_phone" className={labelClass}>
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
            className={inputClass}
          />
        </div>

        {/* Messaggio */}
        <div>
          <label htmlFor="message" className={labelClass}>
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
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Informativa breve */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-xs text-gray-600 leading-relaxed">
          <p>
            Titolare del trattamento: <strong>Marta Conte</strong>. I dati
            forniti saranno trattati esclusivamente per rispondere alla tua
            richiesta, nel rispetto del Reg. UE 2016/679 (GDPR). Per dettagli su
            finalità, base giuridica, conservazione e diritti dell'interessato
            consulta la nostra{" "}
            <a
              href="https://www.iubenda.com/privacy-policy/51496637"
              className="iubenda-black iubenda-noiframe iubenda-embed text-red-900 font-semibold underline hover:no-underline"
              title="Privacy Policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Consenso privacy (OBBLIGATORIO) */}
        <div>
          <label
            htmlFor="privacy_consent"
            className="flex items-start gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              id="privacy_consent"
              name="privacy_consent"
              checked={formValues.privacy_consent}
              onChange={handleChange}
              required
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-red-900 focus:ring-2 focus:ring-red-900 focus:ring-offset-0 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              Ho letto e accetto la{" "}
              <a
                href="/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-900 font-semibold underline hover:no-underline"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </a>{" "}
              e acconsento al trattamento dei miei dati personali per rispondere
              a questa richiesta. <span className="text-red-900">*</span>
            </span>
          </label>
        </div>

        {/* Consenso marketing (OPZIONALE) */}
        <div>
          <label
            htmlFor="marketing_consent"
            className="flex items-start gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              id="marketing_consent"
              name="marketing_consent"
              checked={formValues.marketing_consent}
              onChange={handleChange}
              className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-red-900 focus:ring-2 focus:ring-red-900 focus:ring-offset-0 cursor-pointer shrink-0"
            />
            <span className="text-sm text-gray-700 leading-relaxed">
              Acconsento a ricevere comunicazioni promozionali, novità e offerte
              da Nero Corpus. Posso revocare il consenso in qualsiasi momento.{" "}
              <span className="text-gray-400 text-xs">(facoltativo)</span>
            </span>
          </label>
        </div>

        {/* Hidden: valori leggibili per il template EmailJS */}
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

        {/* Messaggio d'errore */}
        {errorMsg && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-900 rounded-2xl p-4 text-sm"
          >
            {errorMsg}
          </div>
        )}

        {/* Submit */}
        <button
          disabled={isSubmitting || !formValues.privacy_consent}
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Invio in corso...
            </span>
          ) : (
            "Invia Richiesta"
          )}
        </button>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { Star, ArrowUpRight } from "lucide-react";
import { googleProfile, googleReviews } from "../utils/GoogleReviews.js";

const LONG_TEXT = 280;

const formatRating = (value) =>
  value.toLocaleString("it-IT", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });

const formatMonth = (yyyyMm) => {
  if (!yyyyMm) return "";
  const [y, m] = yyyyMm.split("-").map(Number);
  return new Intl.DateTimeFormat("it-IT", {
    month: "long",
    year: "numeric",
  }).format(new Date(y, (m || 1) - 1, 1));
};

// "Marco Rossi" → "Marco R." — in pagina non compare mai il cognome intero
const shortName = (name = "") => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) return parts[0] || "Cliente";
  return `${parts[0]} ${parts[parts.length - 1][0].toUpperCase()}.`;
};

const Stars = ({ value, size = 16 }) => {
  const width = `${Math.max(0, Math.min(100, (value / 5) * 100))}%`;
  const row = (className) => (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          fill="currentColor"
          strokeWidth={0}
          className="shrink-0"
        />
      ))}
    </div>
  );
  return (
    <div
      className="relative inline-flex"
      role="img"
      aria-label={`${formatRating(value)} stelle su 5`}
    >
      {row("text-black/20")}
      <div className="absolute inset-0 overflow-hidden" style={{ width }}>
        {/* giallo classico delle valutazioni, come le stelle su Google */}
        {row("text-amber-400")}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  const [open, setOpen] = useState(false);
  const isLong = review.text.length > LONG_TEXT;
  const name = shortName(review.author);

  return (
    <article className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto flex flex-col bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-red-900 transition-colors duration-300">
      <div className="flex items-center justify-between gap-3 mb-5">
        <Stars value={review.rating} />
        {review.esempio && (
          <span className="text-[10px] uppercase tracking-widest font-bold text-red-500 border border-red-500/40 rounded-full px-2 py-0.5">
            Esempio
          </span>
        )}
      </div>

      <div className="flex-1">
        <p
          className={`text-black/80 text-base leading-relaxed ${
            isLong && !open ? "line-clamp-6" : ""
          }`}
        >
          “{review.text}”
        </p>
        {isLong && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="mt-3 text-sm font-bold text-black hover:text-red-500 transition-colors"
          >
            {open ? "Mostra meno" : "Leggi tutto"}
          </button>
        )}
      </div>

      <footer className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
        <div
          aria-hidden="true"
          className="w-10 h-10 shrink-0 rounded-full bg-red-900 text-black flex items-center justify-center font-black"
        >
          {name[0]}
        </div>
        <div className="min-w-0">
          <p className="font-bold text-black truncate">{name}</p>
          <p className="text-xs text-black/50 uppercase tracking-wide">
            {formatMonth(review.date)}
            {review.date ? " · " : ""}Google
          </p>
        </div>
      </footer>
    </article>
  );
};

const gridByCount = (n) => {
  if (n === 1) return "md:grid-cols-1 md:max-w-xl md:mx-auto";
  if (n === 2) return "md:grid-cols-2 md:max-w-4xl md:mx-auto";
  return "md:grid-cols-2 lg:grid-cols-3";
};

export default function Reviews() {
  const [stickerFailed, setStickerFailed] = useState(false);
  const reviews = googleReviews.filter(
    (r) => import.meta.env.DEV || !r.esempio,
  );
  const { rating, total, updatedAt, reviewsUrl, writeReviewUrl, stickerSrc } =
    googleProfile;
  // Google chiede di indicare la valutazione "su Google" con la data a cui si riferisce
  const hasSummary = typeof rating === "number" && total > 0 && !!updatedAt;
  const showSticker = !!stickerSrc && !stickerFailed;

  if (reviews.length === 0 && !hasSummary && !showSticker) return null;

  return (
    <section
      id="recensioni"
      aria-labelledby="recensioni-title"
      className="py-16 sm:py-24 lg:py-32 px-4 bg-transparent text-black"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-red-500 text-xs sm:text-sm uppercase tracking-wider font-bold mb-4">
            <span>Le Recensioni</span>
          </div>
          <h2
            id="recensioni-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-black font-pirata-one"
          >
            Parola ai clienti
          </h2>
        </div>

        {hasSummary && (
          <div className="flex items-center justify-center gap-4 mb-12 sm:mb-16">
            <span className="text-5xl sm:text-6xl font-black leading-none">
              {formatRating(rating)}
            </span>
            <div className="text-left">
              <Stars value={rating} size={20} />
              <p className="text-sm text-black/60 mt-1.5">
                su Google · {total} {total === 1 ? "recensione" : "recensioni"}
              </p>
              <p className="text-xs text-black/40 mt-0.5">
                dati di {formatMonth(updatedAt)}
              </p>
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div
            className={`-mx-4 px-4 scroll-px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0 md:pb-0 md:grid md:gap-6 md:overflow-visible ${gridByCount(
              reviews.length,
            )}`}
          >
            {reviews.map((review, i) => (
              <ReviewCard
                key={`${review.author}-${review.date}-${i}`}
                review={review}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10 sm:mt-12">
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 border border-white/30 text-black px-6 py-3 rounded-full text-sm font-bold hover:border-white transition-colors duration-300"
          >
            Leggi tutte su Google
            <ArrowUpRight
              size={16}
              className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
            />
          </a>
          {showSticker ? (
            // Adesivo ufficiale del Marketing Kit Google: va mostrato così com'è
            <a
              href={writeReviewUrl || reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform duration-300 hover:scale-105"
            >
              <img
                src={stickerSrc}
                alt="Lascia una recensione su Google"
                onError={() => setStickerFailed(true)}
                className="h-14 sm:h-16 w-auto max-w-[260px] object-contain"
              />
            </a>
          ) : (
            writeReviewUrl && (
              <a
                href={writeReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-red-900 hover:text-black transition-all duration-500"
              >
                Lascia una recensione
                <ArrowUpRight
                  size={16}
                  className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform"
                />
              </a>
            )
          )}
        </div>

        {reviews.length > 0 && (
          <div className="mt-8 text-xs text-black/40 text-center max-w-xl mx-auto leading-relaxed">
            <p>
              Recensioni pubblicate su Google e riportate senza modifiche, con
              il consenso degli autori; lo studio non verifica l'identità di chi
              le scrive.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

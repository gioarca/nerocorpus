// Recensioni Google di Nero Corpus, aggiornate a mano.
//
// Come si aggiorna:
// 1. Dal profilo Google dello studio copia valutazione media e numero di recensioni
//    in `googleProfile`, e metti in `updatedAt` il mese in cui lo fai.
// 2. Copia in `googleReviews` le recensioni da mostrare, SENZA ritoccare il testo.
//    Il nome puoi incollarlo intero: in pagina compare solo "Nome I." (es. "Marco R.").
// 3. Le voci con `esempio: true` servono solo a vedere la grafica con `npm run dev`:
//    nella build di produzione vengono scartate. Cancellale quando metti quelle vere.
//
// In produzione la sezione non compare finché non c'è almeno una recensione vera
// oppure valutazione + numero compilati.

export const googleProfile = {
  rating: 5.0, // valutazione media, es. 4.9
  total: 10, // numero totale di recensioni, es. 37
  updatedAt: "2026-11", // mese dell'ultimo aggiornamento, formato "AAAA-MM"

  // "Leggi tutte su Google": profilo Google dello studio → Condividi → copia link.
  // Finché non lo cambi apre la ricerca dello studio su Google Maps.
  reviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Nero%20Corpus%20Quinto%20di%20Treviso",

  // "Lascia una recensione": Profilo dell'attività → "Chiedi recensioni" → copia link.
  // È lo stesso link di GOOGLE_REVIEW_URL nella dashboard. Vuoto = pulsante nascosto.
  writeReviewUrl: "https://g.page/r/CZTcR7mVZI_BEBM/review",
  stickerSrc: "/public/images/sticker-google-reviews.png",
};

export const googleReviews = [
  {
    author: "Nome Cognome",
    rating: 5,
    date: "2026-10",
    text: "Esempio: qui va il testo della recensione copiato da Google, parola per parola.",
    esempio: true,
  },
  {
    author: "Nome Cognome",
    rating: 5,
    date: "2026-09",
    text: "Esempio di recensione lunga, per vedere come si comporta la scheda quando il testo supera le sei righe. Oltre una certa lunghezza il testo viene tagliato e compare il pulsante per leggerlo tutto, così le schede restano ordinate anche quando qualcuno scrive tanto. Il resto del testo si apre con un clic, senza uscire dalla pagina e senza caricare nulla da Google.",
    esempio: true,
  },
  {
    author: "Nome",
    rating: 4,
    date: "2026-08",
    text: "Esempio con un solo nome e quattro stelle.",
    esempio: true,
  },
];

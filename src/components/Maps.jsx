// import { useMemo, useRef, useState } from "react";
// import {
//   APIProvider,
//   Map,
//   AdvancedMarker,
//   Pin,
// } from "@vis.gl/react-google-maps";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Navigation,
//   Phone,
//   Copy,
//   Check,
//   Car,
//   // Bus, // riattivalo insieme alla modalità "transit"
//   Footprints,
// } from "lucide-react";

// /* ------------------------------------------------------------------ *
//  *  Dati dello studio. Passali come prop per riusare il componente su
//  *  siti diversi; questi sono solo i default d'esempio.
//  * ------------------------------------------------------------------ */
// const DEFAULT_STUDIO = {
//   name: "nerocorpus",
//   address: "Via dell'Arma di Cavalleria 4, 31055, Quinto di Treviso (TV)",
//   coords: { lat: 45.6306983, lng: 12.1666673 },
//   phone: "+39 379 3533477",
//   // Opzionale: se ce l'hai, rende le indicazioni più precise su Maps.
//   placeId: null,
//   // Note pratiche mostrate sotto (facoltative).
//   notes: {
//     car: "Parcheggio gratuito davanti all'ingresso.",
//     // transit: "Fermata bus a 200 m, linea 1.",
//     walk: "A 10 min a piedi dal centro di Quinto di Treviso",
//   },
// };

// const TRAVEL_MODES = [
//   { id: "driving", label: "Auto", icon: Car, noteKey: "car" },
//   //   { id: "transit", label: "Mezzi", icon: Bus, noteKey: "transit" },
//   { id: "walking", label: "A piedi", icon: Footprints, noteKey: "walk" },
// ];

// /** Costruisce il deep link alle indicazioni di Google Maps. */
// function directionsUrl({ coords, placeId }, mode) {
//   const params = new URLSearchParams({
//     api: "1",
//     destination: `${coords.lat},${coords.lng}`,
//     travelmode: mode,
//   });
//   if (placeId) params.set("destination_place_id", placeId);
//   return `https://www.google.com/maps/dir/?${params.toString()}`;
// }

// function MapContent({ studio, mapId }) {
//   return (
//     <Map
//       mapId={mapId}
//       defaultCenter={studio.coords}
//       defaultZoom={16}
//       gestureHandling="cooperative"
//       disableDefaultUI
//       zoomControl
//       className="h-full w-full"
//     >
//       <AdvancedMarker position={studio.coords} title={studio.name}>
//         <Pin background="#EA4335" borderColor="#C5221F" glyphColor="#fff" />
//       </AdvancedMarker>
//     </Map>
//   );
// }

// /**
//  * Segnaposto mostrato finché l'utente non sceglie di caricare la mappa:
//  * lo script di Google parte solo dopo il click (consenso + pagina più leggera).
//  */
// function MapPlaceholder({ onLoad }) {
//   return (
//     <div className="flex h-full flex-col items-center justify-center gap-4 bg-neutral-100 p-6 text-center">
//       <MapPin className="text-neutral-400" size={32} />
//       <p className="max-w-sm text-sm text-neutral-600">
//         La mappa è fornita da Google. Caricandola, Google riceverà il tuo
//         indirizzo IP e alcuni dati tecnici del browser.
//       </p>
//       <button
//         type="button"
//         onClick={onLoad}
//         className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
//       >
//         Mostra la mappa
//       </button>
//     </div>
//   );
// }

// export default function ComeRaggiungere({
//   studio = DEFAULT_STUDIO,
//   apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
//   mapId = import.meta.env.VITE_GOOGLE_MAPS_MAP_ID || "DEMO_MAP_ID",
// }) {
//   const [mode, setMode] = useState("driving");
//   const [copied, setCopied] = useState(false);
//   const [showMap, setShowMap] = useState(false);
//   const copiedTimer = useRef(null);

//   const url = useMemo(() => directionsUrl(studio, mode), [studio, mode]);

//   const copyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(studio.address);
//       setCopied(true);
//       clearTimeout(copiedTimer.current);
//       copiedTimer.current = setTimeout(() => setCopied(false), 2000);
//     } catch {
//       /* clipboard non disponibile */
//     }
//   };

//   const noteKey = TRAVEL_MODES.find((m) => m.id === mode)?.noteKey;
//   const activeNote = studio.notes?.[noteKey];

//   return (
//     <section className="mx-auto w-full max-w-6xl px-4 py-16">
//       <div className="mb-8">
//         <h2 className="text-3xl font-pirata-one tracking-tight text-neutral-900">
//           Come raggiungere lo studio
//         </h2>
//         <p className="mt-2 text-neutral-500">Dove sono e come arrivare</p>
//       </div>

//       <div className="grid overflow-hidden rounded-2xl border border-neutral-200 shadow-sm md:grid-cols-[22rem_1fr]">
//         {/* Colonna info */}
//         <div className="flex flex-col gap-6 border-b border-neutral-200 bg-white p-6 md:border-b-0 md:border-r">
//           <div className="flex gap-3">
//             <MapPin className="mt-0.5 shrink-0 text-red-500" size={22} />
//             <div>
//               <p className="font-semibold text-neutral-900">{studio.name}</p>
//               <p className="mt-1 text-sm text-neutral-600">{studio.address}</p>
//             </div>
//           </div>

//           {/* Scelta mezzo */}
//           <div className="flex gap-2">
//             {TRAVEL_MODES.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 type="button"
//                 aria-pressed={mode === id}
//                 onClick={() => setMode(id)}
//                 className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors ${
//                   mode === id
//                     ? "border-neutral-900 bg-neutral-900 text-white"
//                     : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
//                 }`}
//               >
//                 <Icon size={18} />
//                 {label}
//               </button>
//             ))}
//           </div>

//           {activeNote && (
//             <p className="text-sm text-neutral-500">{activeNote}</p>
//           )}

//           {/* Azioni */}
//           <div className="mt-auto flex flex-col gap-2">
//             <a
//               href={url}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center justify-center gap-2 rounded-lg bg-red-900 px-4 py-3 font-medium text-white transition-colors hover:bg-red-800"
//             >
//               <Navigation size={18} /> Ottieni indicazioni
//             </a>

//             <div className="flex gap-2">
//               {studio.phone && (
//                 <a
//                   href={`tel:${studio.phone.replace(/\s/g, "")}`}
//                   className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
//                 >
//                   <Phone size={16} /> Chiama
//                 </a>
//               )}
//               <button
//                 type="button"
//                 onClick={copyAddress}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
//               >
//                 {copied ? (
//                   <>
//                     <Check size={16} className="text-green-600" /> Copiato
//                   </>
//                 ) : (
//                   <>
//                     <Copy size={16} /> Copia
//                     <span className="sr-only"> indirizzo</span>
//                   </>
//                 )}
//               </button>
//               <span className="sr-only" aria-live="polite">
//                 {copied ? "Indirizzo copiato" : ""}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Mappa: caricata solo su richiesta e solo se c'è la chiave */}
//         <div className="h-72 md:h-[26rem]">
//           {showMap && apiKey ? (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.4 }}
//               className="h-full"
//             >
//               <APIProvider apiKey={apiKey}>
//                 <MapContent studio={studio} mapId={mapId} />
//               </APIProvider>
//             </motion.div>
//           ) : apiKey ? (
//             <MapPlaceholder onLoad={() => setShowMap(true)} />
//           ) : (
//             <div className="h-full bg-neutral-100" aria-hidden="true" />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }

// import React, { useMemo, useRef, useState } from "react";
// import { motion } from "framer-motion";
// import {
//   MapPin,
//   Navigation,
//   Phone,
//   Copy,
//   Check,
//   Car,
//   // Bus, // riattivalo insieme alla modalità "transit"
//   Footprints,
// } from "lucide-react";

// /* ------------------------------------------------------------------ *
//  *  Dati dello studio. Passali come prop per riusare il componente su
//  *  siti diversi; questi sono solo i default d'esempio.
//  * ------------------------------------------------------------------ */
// const DEFAULT_STUDIO = {
//   name: "nerocorpus",
//   address: "Via dell'Arma di Cavalleria 4, 31055, Quinto di Treviso (TV)",
//   coords: { lat: 45.6306983, lng: 12.1666673 },
//   phone: "+39 379 3533477",
//   // Opzionale: se ce l'hai, rende le indicazioni più precise su Maps.
//   placeId: null,
//   // Google Maps → Condividi → Incorpora una mappa → copia solo il valore di src.
//   mapEmbedUrl:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.978147090245!2d12.164092376028435!3d45.63070202231423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477935e710298141%3A0xc18f6495b947dc94!2snerocorpus!5e1!3m2!1sit!2sit!4v1793862731187!5m2!1sit!2sit", // Note pratiche mostrate sotto (facoltative).
//   notes: {
//     car: "Parcheggio gratuito davanti all'ingresso.",
//     // transit: "Fermata bus a 200 m, linea 1.",
//     walk: "A 10 min a piedi dal centro di Quinto di Treviso",
//   },
// };

// const TRAVEL_MODES = [
//   { id: "driving", label: "Auto", icon: Car, noteKey: "car" },
//   //   { id: "transit", label: "Mezzi", icon: Bus, noteKey: "transit" },
//   { id: "walking", label: "A piedi", icon: Footprints, noteKey: "walk" },
// ];

// /** Costruisce il deep link alle indicazioni di Google Maps. */
// function directionsUrl({ coords, placeId }, mode) {
//   const params = new URLSearchParams({
//     api: "1",
//     destination: `${coords.lat},${coords.lng}`,
//     travelmode: mode,
//   });
//   if (placeId) params.set("destination_place_id", placeId);
//   return `https://www.google.com/maps/dir/?${params.toString()}`;
// }

// export default function ComeRaggiungere({ studio = DEFAULT_STUDIO }) {
//   const [mode, setMode] = useState("driving");
//   const [copied, setCopied] = useState(false);
//   const copiedTimer = useRef(null);

//   const url = useMemo(() => directionsUrl(studio, mode), [studio, mode]);

//   const copyAddress = async () => {
//     try {
//       await navigator.clipboard.writeText(studio.address);
//       setCopied(true);
//       clearTimeout(copiedTimer.current);
//       copiedTimer.current = setTimeout(() => setCopied(false), 2000);
//     } catch {
//       /* clipboard non disponibile */
//     }
//   };

//   const noteKey = TRAVEL_MODES.find((m) => m.id === mode)?.noteKey;
//   const activeNote = studio.notes?.[noteKey];

//   return (
//     <section className="mx-auto w-full max-w-6xl px-4 py-16">
//       <div className="mb-8">
//         <h2 className="text-3xl font-pirata-one tracking-tight text-neutral-900">
//           Come raggiungere lo studio
//         </h2>
//         <p className="mt-2 text-neutral-500">Dove sono e come arrivare</p>
//       </div>

//       <div className="grid overflow-hidden rounded-2xl border border-neutral-200 shadow-sm md:grid-cols-[22rem_1fr]">
//         {/* Colonna info */}
//         <div className="flex flex-col gap-6 border-b border-neutral-200 bg-white p-6 md:border-b-0 md:border-r">
//           <div className="flex gap-3">
//             <MapPin className="mt-0.5 shrink-0 text-red-500" size={22} />
//             <div>
//               <p className="font-semibold text-neutral-900">{studio.name}</p>
//               <p className="mt-1 text-sm text-neutral-600">{studio.address}</p>
//             </div>
//           </div>

//           {/* Scelta mezzo */}
//           <div className="flex gap-2">
//             {TRAVEL_MODES.map(({ id, label, icon: Icon }) => (
//               <button
//                 key={id}
//                 type="button"
//                 aria-pressed={mode === id}
//                 onClick={() => setMode(id)}
//                 className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-xs font-medium transition-colors ${
//                   mode === id
//                     ? "border-neutral-900 bg-neutral-900 text-white"
//                     : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
//                 }`}
//               >
//                 <Icon size={18} />
//                 {label}
//               </button>
//             ))}
//           </div>

//           {activeNote && (
//             <p className="text-sm text-neutral-500">{activeNote}</p>
//           )}

//           {/* Azioni */}
//           <div className="mt-auto flex flex-col gap-2">
//             <a
//               href={url}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center justify-center gap-2 rounded-lg bg-red-900 px-4 py-3 font-medium text-white transition-colors hover:bg-red-800"
//             >
//               <Navigation size={18} /> Ottieni indicazioni
//             </a>

//             <div className="flex gap-2">
//               {studio.phone && (
//                 <a
//                   href={`tel:${studio.phone.replace(/\s/g, "")}`}
//                   className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
//                 >
//                   <Phone size={16} /> Chiama
//                 </a>
//               )}
//               <button
//                 type="button"
//                 onClick={copyAddress}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
//               >
//                 {copied ? (
//                   <>
//                     <Check size={16} className="text-green-600" /> Copiato
//                   </>
//                 ) : (
//                   <>
//                     <Copy size={16} /> Copia
//                     <span className="sr-only"> indirizzo</span>
//                   </>
//                 )}
//               </button>
//               <span className="sr-only" aria-live="polite">
//                 {copied ? "Indirizzo copiato" : ""}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Mappa: riempie la colonna e si adatta alla sua altezza */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.4 }}
//           className="relative h-72 bg-neutral-100 sm:h-96 md:h-auto md:min-h-[26rem]"
//         >
//           <iframe
//             src={studio.mapEmbedUrl}
//             title={`Mappa: ${studio.name}, ${studio.address}`}
//             className="absolute inset-0 h-full w-full border-0"
//             loading="lazy"
//             referrerPolicy="strict-origin-when-cross-origin"
//             allowFullScreen
//           />
//         </motion.div>
//       </div>
//     </section>
//   );
// }

import React, { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Navigation,
  Phone,
  Copy,
  Check,
  Car,
  Bus,
  Footprints,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 *  Dati dello studio. Passali come prop per riusare il componente su
 *  siti diversi; questi sono solo i default d'esempio.
 * ------------------------------------------------------------------ */
const DEFAULT_STUDIO = {
  name: "nerocorpus",
  address: "Via dell'Arma di Cavalleria 4, 31055, Quinto di Treviso (TV)",
  coords: { lat: 45.6306983, lng: 12.1666673 },
  phone: "+39 379 3533477",
  // Opzionale: se ce l'hai, rende le indicazioni più precise su Maps.
  placeId: null,
  // Google Maps → Condividi → Incorpora una mappa → copia solo il valore di src.
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2720.978147090245!2d12.164092376028435!3d45.63070202231423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477935e710298141%3A0xc18f6495b947dc94!2snerocorpus!5e1!3m2!1sit!2sit!4v1793862731187!5m2!1sit!2sit", // Note pratiche mostrate sotto (facoltative).
  notes: {
    car: "Parcheggio gratuito davanti all'ingresso.",
    // Facoltativa: compare sotto i pulsanti quando è scelto "Mezzi pubblici".
    // transit: "Fermata bus a 200 m, linea 1.",
    walk: "A 10 min a piedi dal centro di Quinto di Treviso",
  },
};

const TRAVEL_MODES = [
  { id: "driving", label: "Auto", icon: Car, noteKey: "car" },
  { id: "transit", label: "Mezzi pubblici", icon: Bus, noteKey: "transit" },
  { id: "walking", label: "A piedi", icon: Footprints, noteKey: "walk" },
];

/** Costruisce il deep link alle indicazioni di Google Maps. */
function directionsUrl({ coords, placeId }, mode) {
  const params = new URLSearchParams({
    api: "1",
    destination: `${coords.lat},${coords.lng}`,
    travelmode: mode,
  });
  if (placeId) params.set("destination_place_id", placeId);
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function ComeRaggiungere({ studio = DEFAULT_STUDIO }) {
  const [mode, setMode] = useState("driving");
  const [copied, setCopied] = useState(false);
  // La mappa di Google si carica solo dopo il click su "Mostra la mappa".
  const [showMap, setShowMap] = useState(false);
  const copiedTimer = useRef(null);

  const url = useMemo(() => directionsUrl(studio, mode), [studio, mode]);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(studio.address);
      setCopied(true);
      clearTimeout(copiedTimer.current);
      copiedTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard non disponibile */
    }
  };

  const noteKey = TRAVEL_MODES.find((m) => m.id === mode)?.noteKey;
  const activeNote = studio.notes?.[noteKey];

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-pirata-one tracking-tight text-neutral-900">
          Come raggiungere lo studio
        </h2>
        <p className="mt-2 text-neutral-500">Dove sono e come arrivare</p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-neutral-200 shadow-sm md:grid-cols-[22rem_1fr]">
        {/* Colonna info */}
        <div className="flex flex-col gap-6 border-b border-neutral-200 bg-white p-6 md:border-b-0 md:border-r">
          <div className="flex gap-3">
            <MapPin className="mt-0.5 shrink-0 text-red-500" size={22} />
            <div>
              <p className="font-semibold text-neutral-900">{studio.name}</p>
              <p className="mt-1 text-sm text-neutral-600">{studio.address}</p>
            </div>
          </div>

          {/* Scelta mezzo */}
          <div className="flex gap-2">
            {TRAVEL_MODES.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                aria-pressed={mode === id}
                onClick={() => setMode(id)}
                className={`flex flex-1 flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center text-xs font-medium leading-tight transition-colors ${
                  mode === id
                    ? "border-neutral-900 bg-neutral-900 text-white"
                    : "border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
          </div>

          {activeNote && (
            <p className="text-sm text-neutral-500">{activeNote}</p>
          )}

          {/* Azioni */}
          <div className="mt-auto flex flex-col gap-2">
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-red-900 px-4 py-3 font-medium text-white transition-colors hover:bg-red-800"
            >
              <Navigation size={18} /> Ottieni indicazioni
            </a>

            <div className="flex gap-2">
              {studio.phone && (
                <a
                  href={`tel:${studio.phone.replace(/\s/g, "")}`}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
                >
                  <Phone size={16} /> Chiama
                </a>
              )}
              <button
                type="button"
                onClick={copyAddress}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
              >
                {copied ? (
                  <>
                    <Check size={16} className="text-green-600" /> Copiato
                  </>
                ) : (
                  <>
                    <Copy size={16} /> Copia
                    <span className="sr-only"> indirizzo</span>
                  </>
                )}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? "Indirizzo copiato" : ""}
              </span>
            </div>
          </div>
        </div>

        {/* Mappa: riempie la colonna e si adatta alla sua altezza */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="relative h-72 bg-neutral-100 sm:h-96 md:h-auto md:min-h-[26rem]"
        >
          {showMap ? (
            /* data-cmp-ab="1" esclude l'iframe dal blocco automatico di iubenda:
               qui il consenso è il click su "Mostra la mappa". Senza quel click
               l'iframe non esiste e a Google non arriva nulla. */
            <iframe
              data-cmp-ab="1"
              src={studio.mapEmbedUrl}
              title={`Mappa: ${studio.name}, ${studio.address}`}
              className="absolute inset-0 h-full w-full border-0"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
              <MapPin
                className="text-neutral-400"
                size={32}
                aria-hidden="true"
              />
              <p className="max-w-xs text-sm text-neutral-600">
                La mappa è fornita da Google. Se la carichi, Google riceve il
                tuo indirizzo IP e può impostare dei cookie.{" "}
                <a
                  href="https://policies.google.com/privacy?hl=it"
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:text-neutral-900"
                >
                  Privacy di Google
                </a>
              </p>
              <button
                type="button"
                onClick={() => setShowMap(true)}
                className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-50"
              >
                Mostra la mappa
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

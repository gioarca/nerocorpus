import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import confetti from "canvas-confetti";

function Thanks() {
  useEffect(() => {
    // Mini esplosione di confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="text-center max-w-lg mx-auto space-y-6">
        {/* Icona SVG animata */}
        <div className="w-20 h-20 mx-auto mb-2">
          <svg
            viewBox="0 0 24 24"
            className="stroke-green-500"
            fill="none"
            strokeWidth={2.5}
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="path"
            />
          </svg>
        </div>

        {/* Titolo */}
        <h1 className="text-3xl font-extrabold text-gray-800">
          Grazie per aver lasciato il tuo contatto!
        </h1>

        {/* Messaggio */}
        <div className="text-gray-600">
          <p>Il tuo messaggio è stato ricevuto correttamente.</p>
          <p>Verrai aggiornato quando le porte si apriranno.</p>
        </div>

        {/* Link di ritorno */}

        <p className="text-sm text-gray-500">
          Torna alla home cliccando{" "}
          <Link
            to="/"
            className="text-red-500 font-bold text-xl hover:underline"
          >
            qui
          </Link>
          .
        </p>
      </div>

      {/* SVG draw animation */}
      <style>
        {`
          .path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: draw 0.7s ease-out forwards;
          }

          @keyframes draw {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Thanks;

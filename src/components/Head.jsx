import React, { useEffect } from "react";

function Head() {
  useEffect(() => {
    // Imposta il titolo
    document.title = "Nerocorpus";

    // Imposta meta charset
    let charsetMeta = document.querySelector("meta[charset]");
    if (!charsetMeta) {
      charsetMeta = document.createElement("meta");
      charsetMeta.setAttribute("charset", "UTF-8");
      document.head.appendChild(charsetMeta);
    }

    // Imposta viewport
    let viewportMeta = document.querySelector('meta[name="viewport"]');
    if (!viewportMeta) {
      viewportMeta = document.createElement("meta");
      viewportMeta.name = "viewport";
      viewportMeta.content = "width=device-width, initial-scale=1.0";
      document.head.appendChild(viewportMeta);
    }

    // Imposta favicon
    let faviconLink = document.querySelector('link[rel="icon"]');
    if (!faviconLink) {
      faviconLink = document.createElement("link");
      faviconLink.rel = "icon";
      faviconLink.type = "image/png";
      faviconLink.href = "/react.svg";
      faviconLink.sizes = "96x96";
      document.head.appendChild(faviconLink);
    }
  }, []);

  return null; // Componente non renderizza nulla nel DOM
}

export default Head;

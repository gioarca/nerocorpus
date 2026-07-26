import React from "react";

const POLICY_ID = "51496637";

const URLS = {
  privacy: `https://www.iubenda.com/privacy-policy/${POLICY_ID}`,
  cookie: `https://www.iubenda.com/privacy-policy/${POLICY_ID}/cookie-policy`,
  terms: `https://www.iubenda.com/terms-and-conditions/${POLICY_ID}`,
};

const TITLES = {
  privacy: "Privacy Policy",
  cookie: "Cookie Policy",
  terms: "Termini e Condizioni",
};

export default function IubendaLink({
  type = "privacy",
  children,
  className = "",
  ...rest
}) {
  const href = URLS[type];
  const title = TITLES[type];

  if (!href) {
    console.warn(`IubendaLink: tipo "${type}" non valido.`);
    return null;
  }

  return (
    <a
      href={href}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className={`iubenda-black iubenda-noiframe iubenda-embed ${className}`}
      {...rest}
    >
      {children ?? title}
    </a>
  );
}

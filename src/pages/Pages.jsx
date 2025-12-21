import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./Home.jsx";
import Thanks from "./Thanks.jsx";

function Pages() {
  const location = useLocation();

  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/thanks" element={<Thanks />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default Pages;

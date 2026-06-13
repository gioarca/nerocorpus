import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Head from "./components/Head";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import Pages from "./pages/Pages";
import "./index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Head />
        <Navbar />
        <Pages />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

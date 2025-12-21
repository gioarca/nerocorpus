import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Head from "./components/Head";
import Pages from "./pages/Pages";
import "./index.css";

function App() {
  return (
    <>
      <Head />
      <Router>
        <Pages />
      </Router>
    </>
  );
}

export default App;

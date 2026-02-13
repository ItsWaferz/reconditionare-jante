import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import PriceCalculator from "./components/PriceCalculator";
import Contact from "./components/Contact";

function App() {
  return (
    <div className="min-h-screen animate-fade-in">
      <Navbar />
      <Hero />
      <Services />
      <Gallery />
      <PriceCalculator />
      <Contact />
    </div>
  );
}

export default App;

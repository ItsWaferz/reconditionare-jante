import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#111424] shadow-lg py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xl">RJ</span>
            </div>
            <span className="hidden sm:block text-white font-bold text-xl">
              Recondiționare Jante
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Acasă
            </button>
            <button
              onClick={() => scrollToSection("servicii")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Servicii
            </button>
            <button
              onClick={() => scrollToSection("galerie")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Galerie
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="text-white hover:text-orange-500 transition-colors"
            >
              Calculator Preț
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Contact
            </button>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#111424] rounded-lg p-4 space-y-3 shadow-xl border border-white/5">
            <button
              onClick={() => scrollToSection("home")}
              className="block w-full text-left text-white hover:text-orange-500 transition-colors py-2"
            >
              Acasă
            </button>
            <button
              onClick={() => scrollToSection("servicii")}
              className="block w-full text-left text-white hover:text-orange-500 transition-colors py-2"
            >
              Servicii
            </button>
            <button
              onClick={() => scrollToSection("galerie")}
              className="block w-full text-left text-white hover:text-orange-500 transition-colors py-2"
            >
              Galerie
            </button>
            <button
              onClick={() => scrollToSection("calculator")}
              className="block w-full text-left text-white hover:text-orange-500 transition-colors py-2"
            >
              Calculator Preț
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left text-white hover:text-orange-500 transition-colors py-2"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

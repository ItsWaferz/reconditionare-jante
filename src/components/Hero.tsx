import { ArrowRight } from "lucide-react";

export default function Hero() {
  const scrollToCalculator = () => {
    const element = document.getElementById("calculator");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden pt-20 pb-24"
    >
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900"></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in">
          Recondiționare Jante
          <span className="block text-orange-500 mt-2">
            Din pasiune pentru automobile.
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Vopsire, sudare, îndreptare, polisare profesională. Redăm jantelor
          tale strălucirea originală.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToCalculator}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
          >
            Calculează Preț
            <ArrowRight size={20} />
          </button>
          <a
            href="tel:+40123456789"
            className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-full text-lg font-semibold transition-all"
          >
            Contactează-ne
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              10+
            </div>
            <div className="text-xs md:text-base text-gray-300">
              Ani Experiență
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              500+
            </div>
            <div className="text-xs md:text-base text-gray-300">
              Jante Recondiţionate
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              100%
            </div>
            <div className="text-xs md:text-base text-gray-300">
              Satisfacție Client
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">
              24h
            </div>
            <div className="text-xs md:text-base text-gray-300">Timp Mediu</div>
          </div>
        </div>
      </div>

      <div className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
}

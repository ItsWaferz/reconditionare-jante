import { useState } from "react";
import { Calculator, Check } from "lucide-react";

type RimType = "tabla" | "aliaj";
type RimSize = "13-15" | "16-17" | "18-19" | "20+";
type ColorType = "standard" | "premium" | "disabled";
type Vulcanizare = "da" | "nu";

const rimTypes = { tabla: "Jante de tablă", aliaj: "Jante de aliaj" };

const baseAlloyPrices = {
  "13-15": 200,
  "16-17": 250,
  "18-19": 350,
  "20+": 450,
};

const baseSteelPrices = {
  "13-15": 100,
  "16-17": 150,
  "18-19": 200,
  "20+": 300,
};

const colorPrices = {
  standard: 0,
  premium: 50,
  disabled: 0,
};

const vulcanizarePrices = {
  da: 50,
  nu: 0,
};

const additionalServices = {
  welding: { label: "Sudură", price: 50 },
  straightening: { label: "Îndreptare", price: 250 },
  polishing: { label: "Polisare", price: 100 },
  protection: { label: "Tratament Protectiv", price: 60 },
};

export default function PriceCalculator() {
  const [rimType, setRimType] = useState<RimType>("aliaj");
  const [rimSize, setRimSize] = useState<RimSize>("18-19");
  const [colorType, setColorType] = useState<ColorType>("standard");
  const [vulcanizare, setVulcanizare] = useState<Vulcanizare>("nu");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(4);
  const [salePercentage, setSalePercentage] = useState(15);
  const [basePrices, setBasePrices] = useState(baseAlloyPrices);

  const handleRimTypeChange = (type: RimType) => {
    setRimType(type);
    if (type === "tabla") {
      setColorType("disabled");
    } else {
      setColorType("standard");
    }
    setBasePrices(type === "aliaj" ? baseAlloyPrices : baseSteelPrices);
  };

  const handleCountChange = (q: number) => {
    setQuantity(q);
    if (q < 4) {
      setSalePercentage(0);
    } else if (q < 7) {
      setSalePercentage(15 + (q - 4) * 5);
    } else {
      setSalePercentage(30);
    }
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const calculatePrice = () => {
    let total = basePrices[rimSize];
    total += colorPrices[colorType];
    total += vulcanizarePrices[vulcanizare];

    return total * quantity;
  };

  const extrasPrice = () => {
    let total = 0;
    selectedServices.forEach((service) => {
      total +=
        additionalServices[service as keyof typeof additionalServices].price;
    });

    return total;
  };

  const pricePerRim = calculatePrice() / quantity;
  const totalPrice = calculatePrice();
  const totalExtras = extrasPrice();
  const finalPrice = totalPrice - totalPrice * (salePercentage / 100);

  return (
    <section
      id="calculator"
      className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block p-3 bg-orange-500 rounded-2xl mb-4">
            <Calculator className="text-white" size={32} />{" "}
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Calculator Preț
          </h2>
          <p className="text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
            Clientii nostrii beneficiaza de{" "}
            <span className="font-bold text-orange-500">
              reduceri începând de la 15%
            </span>{" "}
            pentru un set de{" "}
            <span className="font-bold text-orange-500">minim 4 jante!</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="space-y-8">
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Tip Jante
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(rimTypes).map((type) => (
                  <button
                    key={type}
                    onClick={() => handleRimTypeChange(type as RimType)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      rimType === type
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="font-bold">{rimTypes[type as RimType]}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Dimensiune Jante
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.keys(basePrices).map((size) => (
                  <button
                    key={size}
                    onClick={() => setRimSize(size as RimSize)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      rimSize === size
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="font-bold">{size}"</div>
                    <div className="text-sm text-gray-600">
                      {basePrices[size as RimSize]} RON
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Tip Culoare
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setColorType("standard")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    colorType === "standard"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : rimType === "tabla"
                        ? "border-gray-200 hover:border-red-300"
                        : "border-gray-200 hover:border-orange-300"
                  }`}
                  style={{
                    color: rimType === "tabla" ? "gray" : undefined,
                    cursor: rimType === "tabla" ? "not-allowed" : "pointer",
                  }}
                  disabled={rimType === "tabla"}
                >
                  <div className="font-bold">Standard</div>
                  <div className="text-sm text-gray-600">
                    Gri, Negru Lucios, Gun Metal
                  </div>
                </button>
                <button
                  onClick={() => setColorType("premium")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    colorType === "premium"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : rimType === "tabla"
                        ? "border-gray-200 hover:border-red-300"
                        : "border-gray-200 hover:border-orange-300"
                  }`}
                  style={{
                    color: rimType === "tabla" ? "gray" : undefined,
                    cursor: rimType === "tabla" ? "not-allowed" : "pointer",
                  }}
                  disabled={rimType === "tabla"}
                >
                  <div className="font-bold">Premium</div>
                  <div className="text-sm text-gray-600">
                    Candy Red, Satin Gold
                  </div>
                  <div className="text-sm text-gray-600">+50 RON / jantă</div>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Servicii Vulcanizare
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setVulcanizare("nu")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    vulcanizare === "nu"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : rimType === "tabla"
                        ? "border-gray-200 hover:border-red-300"
                        : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="font-bold">Nu</div>
                  <div className="text-sm text-gray-600">Inclus</div>
                </button>
                <button
                  onClick={() => setVulcanizare("da")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    vulcanizare === "da"
                      ? "border-orange-500 bg-orange-50 text-orange-700"
                      : rimType === "tabla"
                        ? "border-gray-200 hover:border-red-300"
                        : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="font-bold">Da</div>
                  <div className="text-sm text-gray-600">+50 RON</div>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Servicii Adiționale
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(additionalServices).map(([key, service]) => (
                  <button
                    key={key}
                    onClick={() => toggleService(key)}
                    className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      selectedServices.includes(key)
                        ? "border-orange-500 bg-orange-50 text-orange-700"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${
                          selectedServices.includes(key)
                            ? "bg-orange-500 border-orange-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedServices.includes(key) && (
                          <Check className="text-white" size={16} />
                        )}
                      </div>
                      <div className="font-bold text-left">{service.label}</div>
                    </div>
                    <div className="text-sm text-gray-600">
                      +{service.price} RON / jantă
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-4">
                Număr Jante
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleCountChange(quantity - 1)}
                  className="w-12 h-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold text-xl transition-colors"
                >
                  -
                </button>
                <div className="flex-1 text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {quantity}
                  </div>
                  <div className="text-sm text-gray-600">jante</div>
                </div>
                <button
                  onClick={() => handleCountChange(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold text-xl transition-colors"
                >
                  +
                </button>
              </div>
            </div>
            <div className="border-t-2 border-gray-200 pt-8">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base md:text-lg opacity-90">
                    Preț per jantă:
                  </span>
                  <span className="text-xl md:text-2xl font-bold">
                    {pricePerRim.toFixed(0)} RON
                  </span>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="text-base md:text-lg opacity-90">
                    Reducere aplicată:
                  </span>
                  <div className="bg-white/20 px-3 py-1 rounded-lg backdrop-blur-sm">
                    <span className="text-xl md:text-2xl font-bold">
                      -{salePercentage} %
                    </span>
                  </div>
                </div>

                <div className="h-px bg-white/30 w-full mb-6"></div>

                <div className="flex justify-between items-center sm:items-end mt-2">
                  <span className="text-xl font-semibold w-1/3">
                    Total estimat:
                  </span>

                  <div className="flex flex-col items-end w-2/3">
                    {salePercentage > 0 && (
                      <span className="text-xs sm:text-lg text-white/70 line-through decoration-white/70 mb-1 leading-none">
                        {totalPrice.toFixed(0)} RON
                      </span>
                    )}

                    <span className="text-2xl min-[400px]:text-3xl md:text-5xl font-bold tracking-tight leading-none text-right">
                      {finalPrice.toFixed(0)} RON
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-8 mb-4 text-sm bg-black/10 p-3 rounded-lg">
                  <span className="font-medium">
                    Extra servicii (neincluse)
                  </span>
                  <span className="font-bold text-lg">
                    {totalExtras.toFixed(0)} RON / jantă
                  </span>
                </div>

                <div className="mt-6 pt-2">
                  <a
                    href="tel:+40123456789"
                    className="block w-full bg-white text-orange-600 text-center py-4 rounded-xl font-extrabold text-xl hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 shadow-md"
                  >
                    Solicită Ofertă
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

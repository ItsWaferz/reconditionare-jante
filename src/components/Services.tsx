import { Paintbrush, Wrench, Disc, Sparkles, Shield, Zap } from "lucide-react";

const services = [
  {
    icon: Paintbrush,
    title: "Vopsire Jante",
    description:
      "Vopsire profesională în orice culoare dorită, cu finisaj mat, lucios sau metalic.",
    features: [
      "Pregătire suprafață",
      "Vopsire în cameră specială",
      "Finisaj protectiv",
    ],
  },
  {
    icon: Wrench,
    title: "Sudură Jante",
    description:
      "Reparații prin sudură pentru fisuri și deteriorări ale jantelor din aluminiu.",
    features: ["Sudură TIG", "Testare presiune", "Garanție lucrări"],
  },
  {
    icon: Disc,
    title: "Îndreptare Jante",
    description:
      "Îndreptare precision pentru jante îndoite sau deformate, fără compromisuri.",
    features: [
      "Echipament profesional",
      "Verificare geometrie",
      "Restaurare completă",
    ],
  },
  {
    icon: Sparkles,
    title: "Polisare Jante",
    description:
      "Polisare și finisare pentru un aspect premium și strălucitor.",
    features: [
      "Polisare mecanică",
      "Finisaj oglindă",
      "Protecție suplimentară",
    ],
  },
  {
    icon: Shield,
    title: "Tratament Protectiv",
    description:
      "Aplicare straturi protectoare împotriva coroziunii și deteriorării.",
    features: ["Lac protector", "Rezistență UV", "Durabilitate crescută"],
  },
  {
    icon: Zap,
    title: "Recondiționare Completă",
    description:
      "Pachet complet de recondiționare pentru rezultate impecabile.",
    features: ["Toate serviciile", "Preț avantajos", "Garanție extinsă"],
  },
];

export default function Services() {
  return (
    <section id="servicii" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Serviciile Noastre
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferim o gamă completă de servicii profesionale pentru
            recondiționarea jantelor auto
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="text-white" size={32} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

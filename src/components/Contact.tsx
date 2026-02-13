import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Instagram,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "486f37d9-914a-4a9c-8e21-8613e2f47674",
          subject: "Ofertă nouă: Recondiționări Jante",
          from_name: "Website Recondiționări",
          name: formData.name,
          email: formData.email,
          phone: formData.phone || "Nu a fost introdus",
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        setFormData({ name: "", email: "", phone: "", message: "" });

        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        throw new Error("Eroare la trimitere");
      }
    } catch (err) {
      console.error("Eroare:", err);
      setError(
        "A apărut o eroare la trimiterea mesajului. Vă rugăm să încercați din nou.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contactează-ne
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Suntem aici să răspundem tuturor întrebărilor tale
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">
                Informații Contact
              </h3>

              <div className="space-y-6">
                <a
                  href="tel:+40741625859"
                  className="flex items-start gap-4 text-gray-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Telefon</div>
                    <div>+40 741 625 859</div>
                  </div>
                </a>

                <a
                  href="mailto:contact@reconditionari-jante.ro"
                  className="flex items-start gap-4 text-gray-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Email</div>
                    <div>contact@reconditionari-jante.ro</div>
                  </div>
                </a>

                <a
                  href="https://www.google.com/maps/place/Reconditionari+jante+cluj/@46.7810963,23.6237487,17z/data=!3m1!4b1!4m6!3m5!1s0x47490d288af28eb1:0xec53439a8c720fb6!8m2!3d46.7810963!4d23.6237487!16s%2Fg%2F11hdzrypdn?entry=ttu&g_ep=EgoyMDI2MDIxMC4wIKXMDSoASAFQAw%3D%3D"
                  className="flex items-start gap-4 text-gray-300 hover:text-orange-500 transition-colors group"
                >
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Adresă</div>
                    <div>Strada Dâmboviței 48</div>
                    <div>Cluj-Napoca 400394</div>
                  </div>
                </a>

                <div className="flex items-start gap-4 text-gray-300">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-semibold text-white mb-1">Program</div>
                    <div>Luni - Vineri: 10:00 - 17:00</div>
                    <div>Sâmbătă: Închis</div>
                    <div>Duminică: Închis</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-700">
                <div className="font-semibold text-white mb-4">
                  Urmărește-ne
                </div>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/Reconditionarijantecluj13/?locale=ro_RO"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
                  >
                    <Facebook className="text-white" size={24} />
                  </a>
                  <a
                    href="https://www.instagram.com/reconditionari_jante_cluj/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center hover:bg-orange-500 transition-colors"
                  >
                    <Instagram className="text-white" size={24} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-8 relative overflow-hidden">
            <h3 className="text-2xl font-bold text-white mb-6">
              Trimite-ne un Mesaj
            </h3>

            {isSuccess && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800/95 p-8 text-center z-10 backdrop-blur-sm transition-all duration-300">
                <CheckCircle2 className="text-green-500 mb-4" size={64} />
                <h4 className="text-2xl font-bold text-white mb-2">
                  Mesaj Trimis!
                </h4>
                <p className="text-gray-300">
                  Îți mulțumim! Te vom contacta în cel mai scurt timp.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 relative z-0">
              {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-white font-semibold mb-2">
                  Nume Complet
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="Introduceți numele dvs."
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="exemplu@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition-colors"
                  placeholder="+40 123 456 789"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">
                  Mesaj
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white border border-gray-600 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                  placeholder="Descrieți cerința dvs..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Se trimite...
                  </>
                ) : (
                  "Trimite Mesaj"
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 pt-16 border-t border-gray-800 text-center text-gray-400">
          <p>© 2026 Recondiționare Jante. Toate drepturile rezervate.</p>
        </div>
      </div>
    </section>
  );
}

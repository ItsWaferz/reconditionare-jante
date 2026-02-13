import { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, Loader2 } from "lucide-react";
import { supabase, type GalleryImage } from "../lib/supabase";

export default function Gallery() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, galleryImages.length - itemsPerPage);

  useEffect(() => {
    loadGalleryImages();
  }, []);

  async function loadGalleryImages() {
    try {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      setGalleryImages(data || []);
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleImages = galleryImages.slice(
    currentIndex,
    currentIndex + itemsPerPage,
  );

  if (loading) {
    return (
      <section id="galerie" className="py-20 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="text-orange-500 animate-spin" size={48} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="galerie" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Galeria Noastră
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exemple din lucrările noastre recente
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-8">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className={`p-3 rounded-full transition-all ${
                currentIndex === 0
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-110"
              }`}
              aria-label="Previous images"
            >
              <ChevronUp size={32} />
            </button>

            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {visibleImages.map((image, index) => (
                  <div
                    key={image.id}
                    className="group relative overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="aspect-square">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {image.title}
                        </h3>
                        <p className="text-gray-300">{image.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center items-center gap-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${
                      idx === currentIndex
                        ? "w-8 bg-orange-500"
                        : "w-2 bg-gray-600 hover:bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`p-3 rounded-full transition-all ${
                currentIndex === maxIndex
                  ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 text-white hover:scale-110"
              }`}
              aria-label="Next images"
            >
              <ChevronDown size={32} />
            </button>
          </div>

          <p className="text-center text-gray-400 mt-8">
            Afișare {currentIndex + 1}-
            {Math.min(currentIndex + itemsPerPage, galleryImages.length)} din{" "}
            {galleryImages.length} imagini
          </p>
        </div>
      </div>
    </section>
  );
}

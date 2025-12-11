import { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { authService } from "../services/authService";

export default function RightPanel({ loadNextProfileRef }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandomProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await authService.getRandomProfile();
      setProfile(data);
      setCurrentIndex(0);
    } catch (err) {
      setError("Error al cargar perfil");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRandomProfile();
    
    // Asignar la función al ref para que MainScreen pueda llamarla
    if (loadNextProfileRef) {
      loadNextProfileRef.current = loadRandomProfile;
    }
  }, [loadNextProfileRef]);

  if (loading) {
    return (
      <div className="flex items-center justify-center max-w-[860px] w-full max-h-[720px] h-full bg-white rounded-xl">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex items-center justify-center max-w-[860px] w-full max-h-[720px] h-full bg-white rounded-xl">
        <p className="text-red-500">{error || "No se pudo cargar el perfil"}</p>
      </div>
    );
  }

  // Build slides from profile data
  const slides = [];
  
  // First slide: Basic info with first image
  if (profile.images && profile.images.length > 0) {
    slides.push({
      image: profile.images[0],
      type: "basic",
      name: profile.username,
      age: profile.age,
    });
  }

  // Description slide
  if (profile.introduction) {
    slides.push({
      image: profile.images && profile.images.length > 0 ? profile.images[0] : "/default.jpg",
      type: "description",
      description: profile.introduction,
    });
  }

  // Interests slide
  if (profile.interests && profile.interests.length > 0) {
    slides.push({
      image: profile.images && profile.images.length > 1 ? profile.images[1] : profile.images[0],
      type: "interests",
      interests: profile.interests,
    });
  }

  // Additional images as custom slides
  if (profile.images && profile.images.length > 2) {
    for (let i = 2; i < profile.images.length; i++) {
      slides.push({
        image: profile.images[i],
        type: "custom",
        title: profile.username,
        content: `Foto ${i + 1}`,
      });
    }
  }

  const totalSlides = slides.length;

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="flex relative max-w-[860px] w-full max-h-[720px] h-full bg-white rounded-xl p-6 overflow-hidden">
      
          {/* SLIDER VERTICAL DE IMÁGENES */}
    <div className="relative w-[60%] h-full p-3 overflow-hidden">
      {/* CONTENEDOR INTERNO QUE SE MUEVE */}
      <div
        className="h-full gap-4 transition-transform duration-500"
        style={{
          transform: `translateY(-${currentIndex * 105}%)`,
        }}
      >
          {/* STACK VERTICAL */}
        <div className="flex flex-col gap-8 h-full">
          
          {slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ height: "100%" }} // asegura altura igual
            >
              <img
                src={slide.image}
                className="rounded-lg w-full h-full object-cover "
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}

        </div>
      </div>
    </div>



      {/* PANEL DERECHO SINCRONIZADO */}
      <div className="flex flex-col justify-end text-center bg-white w-[40%] h-full p-6 transition-opacity duration-300">
        <div className="flex-1" />

        {/* Contenido dinámico según el tipo de slide */}
        {slides[currentIndex].type === "basic" && (
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {slides[currentIndex].name}, {slides[currentIndex].age}
            </h2>
          </div>
        )}

        {slides[currentIndex].type === "description" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Sobre mí</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {slides[currentIndex].description}
            </p>
          </div>
        )}

        {slides[currentIndex].type === "interests" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Mis intereses</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {slides[currentIndex].interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {slides[currentIndex].type === "custom" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              {slides[currentIndex].title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {slides[currentIndex].content}
            </p>
          </div>
        )}
      </div>

      <div className="absolute right-2 top-[50%] flex flex-col gap-4 -translate-y-1/2">
        <button
          onClick={goPrev}
          className="w-12 h-12 bg-[#D8E2DC] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl"
        >
          <ChevronUpIcon className="w-6 h-6 text-[#7D7D7D]"/>
        </button>

        <button
          onClick={goNext}
          className="w-12 h-12 bg-[#D8E2DC] rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-xl"
        >
          <ChevronDownIcon className="w-6 h-6 text-[#7D7D7D]"/>
        </button>
      </div>
    </div>
  );
}

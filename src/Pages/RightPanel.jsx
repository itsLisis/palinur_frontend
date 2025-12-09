import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

export default function RightPanel({ animation }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Datos sincronizados por slide
  const profileData = {
    slides: [
      {
        image: "/jero.jpg",
        type: "basic",
        name: "Jerónimo",
        age: 22,
      },
      {
        image: "/jero.jpg",
        type: "description",
        description: "Me encanta viajar y conocer gente nueva. Soy músico y amante del arte, toco guitarra desde los 12 años.",
      },
      {
        image: "/jero.jpg",
        type: "interests",
        interests: ["Música", "Viajes", "Senderismo", "Fotografía", "Arte"],
      },
      {
        image: "/jero.jpg",
        type: "custom",
        title: "Buscando conexiones reales",
        content: "Valoro la honestidad y las buenas conversaciones.",
      },
    ],
  };

  const totalSlides = profileData.slides.length;

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
          
          {profileData.slides.map((slide, index) => (
            <div
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ height: "100%" }} // asegura altura igual
            >
              <img
                src={slide.image}
                className="rounded-lg w-full h-full object-cover "
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
        {profileData.slides[currentIndex].type === "basic" && (
          <div>
            <h2 className="text-4xl font-bold mb-2">
              {profileData.slides[currentIndex].name}, {profileData.slides[currentIndex].age}
            </h2>
          </div>
        )}

        {profileData.slides[currentIndex].type === "description" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Sobre mí</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {profileData.slides[currentIndex].description}
            </p>
          </div>
        )}

        {profileData.slides[currentIndex].type === "interests" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">Mis intereses</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {profileData.slides[currentIndex].interests.map((interest, idx) => (
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

        {profileData.slides[currentIndex].type === "custom" && (
          <div className="mt-4 mb-4">
            <h3 className="text-xl font-semibold mb-3">
              {profileData.slides[currentIndex].title}
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {profileData.slides[currentIndex].content}
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

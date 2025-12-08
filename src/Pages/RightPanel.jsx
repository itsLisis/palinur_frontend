import { useState } from "react";


export default function RightPanel({animation}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showDescription, setShowDescription] = useState(false);

  // Simulación de imágenes y datos
  const profileData = {
    name: "Jerónimo",
    age: 22,
    images: ["/jero.jpg", "/jero.jpg", "/jero.jpg", "/jero.jpg"],
    description: "Amante de la música y las aventuras. Me encanta viajar y conocer gente nueva. ¡Espero encontrar a alguien con quien compartir risas!"
  };



  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  return (
    <div
      className={`flex relative w-[860px] h-[720px] bg-white rounded-xl p-6 transition-transform duration-500 ${animation} overflow-hidden`}
    >
      {/* Imagen */}
      <div 
        className={`relative w-[60%] h-full p-3 transition-transform duration-300 ${
          showDescription ? "-translate-y-[110%]" : "translate-y-0"
        }`}
      >
        <div className="relative w-full h-full shadow-2xl/30">
          <img
            src={profileData.images[currentImageIndex]}
            className="rounded-lg w-full h-full object-cover transition-all duration-300"
            alt={profileData.name}
          />
          <div className="h-[14%]"/>
          <img
            src={profileData.images[currentImageIndex]}
            className="rounded-lg w-full h-full object-cover transition-all duration-300"
            alt={profileData.name}
          />         



        </div>
      </div>

      {/* Panel derecho - Información y descripción */}
      <div
        className={`flex flex-col justify-end text-center bg-white w-[40%] h-full p-6 transition-transform duration-300 ${
          showDescription ? "-translate-y-[100%]" : "translate-y-0"
        }`}
        onClick={toggleDescription}
      >
        <div className="cursor-pointer">
          <h2 className="text-3xl font-semibold mb-2">
            {profileData.name}, {profileData.age}
          </h2>
          
            <p className="text-sm text-gray-500 animate-pulse"></p>
          
        </div>

        <div className="h-[100%]"/>

        
          <div className="mt-4 mb-4 max-h-[200px] overflow-y-auto">
            <p className="text-gray-700 text-sm leading-relaxed">
              {profileData.description}
            </p>
            <p className="text-xs text-gray-400 mt-4 animate-pulse">Desliza para cerrar ↑</p>
          </div>
        

      </div>
    </div>
  );
}

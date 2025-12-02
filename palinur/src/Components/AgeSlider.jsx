import { useState } from "react";

export default function AgeSlider({onAgeChange}) {
  const [min, setMin] = useState(18);
  const [max, setMax] = useState(99);

  const handleMinChange = (e) => {
    const newMin = parseInt(e.target.value);
    // El mínimo no puede ser mayor que el máximo
    if (newMin <= max) {
      setMin(newMin);
      if (onAgeChange) {
        onAgeChange({ min: newMin, max });
      }
    }
  };

  const handleMaxChange = (e) => {
    const newMax = parseInt(e.target.value);
    // El máximo no puede ser menor que el mínimo
    if (newMax >= min) {
      setMax(newMax);
      if (onAgeChange) {
        onAgeChange({ min, max: newMax });
      }
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto py-6">
      <div className="relative h-12">

        {/* TRACK de fondo */}
        <div className="absolute top-1/2 w-full h-2 bg-[#DEE7E2] rounded-full -translate-y-1/2"></div>

        {/* TRACK coloreado */}
        <div
          className="absolute top-1/2 h-2 bg-[#CE603E] rounded-full -translate-y-1/2"
          style={{
            left: `${((min - 18) / (99 - 18)) * 100}%`,
            width: `${((max - min) / (99 - 18)) * 100}%`,
          }}
        ></div>

        {/* Slider mínimo */}
        <input
          type="range"
          min="18"
          max="99"
          value={min}
          onChange={handleMinChange}
          className="absolute inset-0 w-full bg-transparent appearance-none pointer-events-auto range-thumb z-[30]"
        />

        {/* Slider máximo */}
        <input
          type="range"
          min="18"
          max="99"
          value={max}
          onChange={handleMaxChange}
          className="absolute inset-0 w-full bg-transparent appearance-none pointer-events-auto range-thumb z-[30]"
        />

        {/* Labels */}
        <span className="absolute left-0 -bottom-6 text-black font-semibold">{min}</span>
        <span className="absolute right-0 -bottom-6 text-black font-semibold">{max}</span>
      </div>
    </div>
  );
}

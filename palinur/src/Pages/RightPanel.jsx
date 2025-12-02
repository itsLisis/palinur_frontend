import { useState } from "react";
import { HeartIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function RightPanel() {
  const [animation, setAnimation] = useState("");

  const animateLeft = () => {
    setAnimation("animate-slide-left");
    setTimeout(() => setAnimation(""), 500); // limpiar animación
  };

  const animateRight = () => {
    setAnimation("animate-slide-right");
    setTimeout(() => setAnimation(""), 500);
  };

  return (
    <div
      className={`flex w-[860px] h-[720px] bg-white rounded-xl p-6 transition-transform duration-500 ${animation}`}
    >
      <div className="relative w-[60%] h-full p-3">
        <div className="relative w-full h-full shadow-2xl/30">
          <img
            src="/jero.jpg"
            className="rounded-lg w-full h-full object-cover"
            alt="hola"
          />

          <div className="absolute w-full h-full inset-0 rounded-lg bg-[linear-gradient(to_bottom,transparent_0%,transparent_54%,rgba(0,0,0,0.9)_100%)]"></div>

          <div className="absolute pb-2 bottom-7 left-1/2 -translate-x-1/2 flex gap-10">
            <button
              onClick={animateLeft}
              className="bg-white p-6 rounded-full shadow"
            >
              <XMarkIcon className="w-12 h-12 text-[#1A2E53] stroke-[4]" />
            </button>

            <button
              onClick={animateRight}
              className="bg-white p-6 rounded-full shadow"
            >
              <HeartIcon className="w-12 h-12 text-[#FF8269]" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-end text-center bg-white w-[40%] h-full p-6">
        <h2 className="bottom-4 text-3xl font-semibold">Jerónimo, 22</h2>
      </div>
    </div>
  );
}

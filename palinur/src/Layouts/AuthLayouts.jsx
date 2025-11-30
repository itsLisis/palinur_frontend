import { Outlet } from "react-router-dom";
import AnimatedImage from "../Components/AnimatedImage";
import { AnimatePresence } from "framer-motion";

export default function AuthLayout() {
  return (
    <div className="flex h-screen">

      {/* Columna izquierda con imagen persistente */}
      <div className="w-[55%] bg-[#FF8269] flex justify-center items-center overflow-hidden">
        <AnimatePresence mode="wait">
          <AnimatedImage />
        </AnimatePresence>
      </div>

      {/* Columna derecha que cambia según la pantalla */}
      <div className="w-[45%] flex justify-center items-center px-10">
        <Outlet />
      </div>

    </div>
  );
}

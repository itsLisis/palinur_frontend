import { Link } from "react-router-dom";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";

export default function LoginPage() {
  return (
    <PageTransition direction="left">
    <div className="flex h-screen font-albert">
      
      {/* Columna izquierda */}
      <div className="w-[55%] bg-[#FF8269] flex justify-center items-center">  <ImageSlider src="/pal.png" direction="left" /></div>

      {/* Columna derecha */}
      <div className="w-[45%] flex flex-col justify-center px-10">
        <h1 className="text-[32px] font-bold  justify-normal mb-5 -mt-20">¡Bienvenidx!</h1>

        <label className="mt-4 text-base">Correo electrónico</label>
        <input
          type="email"
          placeholder="Ingresa tu correo"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <label className="mt-4 text-base ">Contraseña</label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
        />

        <button className="mt-6 bg-[#CE603E] hover:bg-[#b14e32] text-white py-3 rounded-md transition">
          Inicia sesión
        </button>

        <p className="mt-3 text-sm text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/registro" className="underline text-blue-600">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
    </PageTransition>
  );
}

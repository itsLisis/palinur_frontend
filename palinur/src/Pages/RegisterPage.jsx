import {Link} from "react-router-dom";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";

export default function RegisterPage() {
    return (
        <PageTransition direction="right">
        <div className="flex h-screen font-albert">
            {/*Columna izquierda*/}
            <div className="w-[45%] flex-col justify-center flex px-10">
                <h1 className="text-[32px] font-bold mb-5 -mt-50">¡Regístrate!</h1>

                <label className="mt-4 text-base">Correo electrónico</label>
                <input 
                type="email"
                placeholder="Ingresa tu correo"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                ></input>

                <label className="mt-4 text-base ">Contraseña</label>
                <input
                type="password"
                placeholder="Ingresa tu contraseña"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                />

                <label className="mt-4 text-base">Fecha de nacimiento</label>
                <input 
                type="date"
                placeholder="gg/mm/aa"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
                ></input>

                <button className="mt-6 bg-[#CE603E] hover:bg-[#b14e32] text-white py-3 rounded-md transition">
                Regístrate 
                </button>
                <p className="mt-3 text-sm text-center">¿Ya tienes una cuenta? <Link to="/" className="underline text-blue-600">Incia sesión</Link></p>
            </div>

            <div className="flex  w-[55%] justify-center items-center bg-[#FF8269]"><ImageSlider src="/pal.png" direction="right" /></div>
            

            
        </div>
        </PageTransition>
    );
}

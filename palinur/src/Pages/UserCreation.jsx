import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";
import { useAuth } from "../context/AuthContext";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await register(email, password, birthday);
      // Redirigir a login después del registro exitoso
      navigate("/");
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en el registro";
      setError(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition direction="right">
      <div className="flex h-screen font-albert">
        {/*Columna izquierda*/}
        <div className="w-[45%] flex-col justify-center flex px-10">
          <h1 className="text-[32px] font-bold mb-5 -mt-50">Ingresa tus datos para iniciar</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <label className="mt-4 text-base">Nombre</label>
          <input
            type="string"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <label className="mt-4 text-base">Contraseña</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <label className="mt-4 text-base">Fecha de nacimiento</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-6 bg-[#CE603E] hover:bg-[#b14e32] disabled:bg-gray-400 text-white py-3 rounded-md transition"
          >
            {loading ? "Registrando..." : "Regístrate"}
          </button>
          <p className="mt-3 text-sm text-center">
            ¿Ya tienes una cuenta?{" "}
            <Link to="/" className="underline text-blue-600">
              Inicia sesión
            </Link>
          </p>
        </div>

        <div className="flex w-[55%] justify-center items-center bg-[#FF8269]">
          <ImageSlider src="/pal.png" direction="right" />
        </div>
      </div>
    </PageTransition>
  );
}

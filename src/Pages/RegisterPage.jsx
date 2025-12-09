import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";
import { useAuth } from "../context/AuthContext";
import TurnstileWidget from "../Components/Turnstile";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!turnstileToken) {
      setError("Por favor completa la verificación");
      setLoading(false);
      return;
    }

    try {
      const response = await register(email, password, turnstileToken);
      // Guardar el token
      if (response.access_token) {
        localStorage.setItem("token", response.access_token);
      }
      // Redirigir a creación de perfil después del registro exitoso
      navigate("/creacion");
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
          <h1 className="text-[32px] font-bold mb-5 -mt-50">¡Regístrate!</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <label className="mt-4 text-base">Correo electrónico</label>
          <input
            type="email"
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
          <div className="mt-4 flex justify-center">
            <TurnstileWidget onVerify={setTurnstileToken} />
          </div>


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

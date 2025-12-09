import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";
import { useAuth } from "../context/AuthContext";
import TurnstileWidget from "../Components/Turnstile";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!turnstileToken) {
      setError("Por favor completa la verificación");
      setLoading(false);
      return;
    }

    try {
      const response = await login(email, password, turnstileToken);
      if (response.complete_profile) {
        navigate("/principal");
      } else {
        navigate("/creacion");
      }
    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Error en el login";
      setError(typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition direction="left">
      <div className="flex h-screen font-albert">
        {/* Columna izquierda */}
        <div className="w-[55%] bg-[#FF8269] flex justify-center items-center">
          <ImageSlider src="/pal.png" direction="left" />
        </div>

        {/* Columna derecha */}
        <div className="w-[45%] flex flex-col justify-center px-10">
          <h1 className="text-[32px] font-bold justify-normal mb-5 -mt-20">
            ¡Bienvenidx!
          </h1>

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
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 bg-[#CE603E] hover:bg-[#b14e32] disabled:bg-gray-400 text-center text-white py-3 rounded-md transition"
          >
            {loading ? "Iniciando sesión..." : "Inicia sesión"}
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

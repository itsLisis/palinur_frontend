import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function UserCreation() {
  const [username, setUsername] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [birthday, setBirthday] = useState("");
  const [sexualOrientationId, setSexualOrientationId] = useState("");
  const [interestIds, setInterestIds] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8000/user/complete_profile",
        {
          username,
          introduction,
          birthday,
          sexual_orientation_id: parseInt(sexualOrientationId),
          interest_ids: interestIds,
          image_urls: imageUrls,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Guardar el nuevo token si es necesario
      if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
      }

      // Redirigir al home
      navigate("/principal");
    } catch (err) {
      const errorMsg =
        err.response?.data?.detail || "Error al completar perfil";
      setError(
        typeof errorMsg === "string" ? errorMsg : JSON.stringify(errorMsg)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition direction="right">
      <div className="flex h-screen font-albert">
        {/*Columna izquierda*/}
        <div className="w-[45%] flex-col justify-center flex px-10 overflow-y-auto">
          <h1 className="text-[32px] font-bold mb-5 -mt-20">Completa tu perfil</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <label className="mt-4 text-base">Nombre de usuario</label>
          <input
            type="text"
            placeholder="Ingresa tu nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <label className="mt-4 text-base">Presentación</label>
          <textarea
            placeholder="Cuéntanos sobre ti"
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300 h-24 resize-none"
          />

          <label className="mt-4 text-base">Fecha de nacimiento</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          />

          <label className="mt-4 text-base">Orientación sexual</label>
          <select
            value={sexualOrientationId}
            onChange={(e) => setSexualOrientationId(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Selecciona una opción</option>
            <option value="1">Heterosexual</option>
            <option value="2">Homosexual</option>
            <option value="3">Bisexual</option>
            <option value="4">Asexual</option>
            <option value="5">Otro</option>
          </select>

          <button
            onClick={handleCompleteProfile}
            disabled={loading}
            className="mt-6 bg-[#CE603E] hover:bg-[#b14e32] disabled:bg-gray-400 text-white py-3 rounded-md transition w-full"
          >
            {loading ? "Guardando perfil..." : "Completar perfil"}
          </button>
        </div>

        <div className="flex w-[55%] justify-center items-center bg-[#FF8269]">
          <ImageSlider src="/pal.png" direction="right" />
        </div>
      </div>
    </PageTransition>
  );
}

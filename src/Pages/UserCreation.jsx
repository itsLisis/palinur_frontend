import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageTransition from "../Components/PageTransitions";
import ImageSlider from "../Components/ImageSlider";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

export default function UserCreation() {
  const [username, setUsername] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [birthday, setBirthday] = useState("");
  const [genderId, setGenderId] = useState("");
  const [sexualOrientationId, setSexualOrientationId] = useState("");
  const [interestIds, setInterestIds] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Datos desde el backend
  const [genders, setGenders] = useState([]);
  const [sexualOrientations, setSexualOrientations] = useState([]);
  const [interests, setInterests] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  
  const { token, updateToken } = useAuth();
  const navigate = useNavigate();

  // Cargar opciones al montar el componente
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const response = await authService.api.get("/user/complete_profile");
        setGenders(response.data.genders || []);
        setSexualOrientations(response.data.sexual_orientations || []);
        setInterests(response.data.interests || []);
      } catch (err) {
        // Si el error es 403 o 400, significa que el perfil ya está completo
        if (err.response?.status === 403 || err.response?.status === 400) {
          console.log("Profile already complete, redirecting...");
          navigate("/principal");
          return;
        }
        setError("Error al cargar las opciones");
        console.error(err);
      } finally {
        setLoadingData(false);
      }
    };
    
    loadOptions();
  }, [navigate]);

  const toggleInterest = (interestId) => {
    setInterestIds(prev => 
      prev.includes(interestId) 
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleCompleteProfile = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.api.post(
        "/user/complete_profile",
        {
          username,
          introduction,
          birthday,
          gender_id: parseInt(genderId),
          sexual_orientation_id: parseInt(sexualOrientationId),
          interest_ids: interestIds,
          image_urls: imageUrls,
        }
      );

      // Actualizar el token y el estado de perfil completado
      if (response.data.access_token) {
        updateToken(response.data.access_token, response.data.complete_profile);
      }

      // Redirigir al home
      navigate("/principal");
    } catch (err) {
      // Si el perfil ya existe, redirigir en lugar de mostrar error
      const errorDetail = err.response?.data?.detail;
      const errorMessage = typeof errorDetail === 'string' ? errorDetail : JSON.stringify(errorDetail);
      
      if (err.response?.status === 400 && errorMessage.includes("already exists")) {
        console.log("Profile already exists, redirecting...");
        navigate("/principal");
        return;
      }
      
      const errorMsg = errorDetail || "Error al completar perfil";
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
        <div className="w-[45%] flex-col justify-center flex px-10 overflow-y-auto py-8">
          <h1 className="text-[32px] font-bold mb-5">Completa tu perfil</h1>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {loadingData && (
            <div className="text-center p-4">Cargando opciones...</div>
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

          <label className="mt-4 text-base">Género</label>
          <select
            value={genderId}
            onChange={(e) => setGenderId(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">Selecciona tu género</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.gender_name}
              </option>
            ))}
          </select>

          <label className="mt-4 text-base">Orientación sexual</label>
          <select
            value={sexualOrientationId}
            onChange={(e) => setSexualOrientationId(e.target.value)}
            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option value="">¿A quién quieres ver?</option>
            {sexualOrientations.map((orientation) => (
              <option key={orientation.id} value={orientation.id}>
                {orientation.orientation_name}
              </option>
            ))}
          </select>

          <label className="mt-4 text-base">Intereses (selecciona varios)</label>
          <div className="mt-2 flex flex-wrap gap-2 max-h-48 overflow-y-auto p-2 border border-gray-300 rounded-md">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`px-4 py-2 rounded-full text-sm transition ${
                  interestIds.includes(interest.id)
                    ? "bg-[#CE603E] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {interest.interest_name}
              </button>
            ))}
          </div>

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

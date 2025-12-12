import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import  AgeSlider  from "../../Components/AgeSlider"
import { authService } from "../../services/authService";

export default function Ajustes() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ageRange, setAgeRange] = useState({min:18, max:99});
  const [maxDistance, setMaxDistance] = useState(25);
  const [notifications, setNotifications] = useState(true);
  const [profileVisible, setProfileVisible] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Error al cargar perfil:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAgeChange = (newRange) => {
    setAgeRange(newRange);
    // TODO: Guardar preferencias en backend
    console.log("Rango de edad actualizado:", newRange);
  };

  const handleDistanceChange = (e) => {
    setMaxDistance(parseInt(e.target.value));
    // TODO: Guardar preferencias en backend
  };

  const handleNotificationsToggle = () => {
    setNotifications(!notifications);
    // TODO: Guardar preferencias en backend
  };

  const handleVisibilityToggle = () => {
    setProfileVisible(!profileVisible);
    // TODO: Guardar preferencias en backend
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <p className="text-gray-500">Cargando ajustes...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">

      <h2 className="font-semibold text-3xl mb-2">Ajustes</h2>

      {/* Información de cuenta */}
      {profile && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-lg mb-3">Cuenta</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Usuario:</span>
              <span className="font-medium">{profile.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Edad:</span>
              <span className="font-medium">{profile.age} años</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Género:</span>
              <span className="font-medium">
                {profile.gender_id === 1 ? 'Hombre' : profile.gender_id === 2 ? 'Mujer' : 'Otro'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Preferencias de notificación */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-lg mb-3">Notificaciones</h3>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Notificaciones push</p>
            <p className="text-sm text-gray-600">Recibir alertas de nuevos matches</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={notifications}
              onChange={handleNotificationsToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CE603E]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CE603E]"></div>
          </label>
        </div>
      </div>

      {/* Preferencias de privacidad */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-lg mb-3">Privacidad</h3>
        
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">Perfil visible</p>
            <p className="text-sm text-gray-600">Otros usuarios pueden ver tu perfil</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={profileVisible}
              onChange={handleVisibilityToggle}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#CE603E]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#CE603E]"></div>
          </label>
        </div>
      </div>

      {/* Preferencias de búsqueda */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-lg mb-4">Preferencias de búsqueda</h3>
        
        <div className="flex flex-col gap-4">
          <div>
            <label className="font-medium mb-2 block">Rango de edad</label>
            <AgeSlider onAgeChange={handleAgeChange}/>
            <p className="text-sm text-gray-600 mt-1">
              Buscando personas entre {ageRange.min} y {ageRange.max} años
            </p>
          </div>

          <div>
            <label className="font-medium mb-2 block">Distancia máxima</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="1" 
                max="100" 
                value={maxDistance}
                onChange={handleDistanceChange}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#CE603E]"
              />
              <span className="font-medium min-w-[60px] text-right">{maxDistance} km</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Mostrar perfiles dentro de {maxDistance} kilómetros
            </p>
          </div>
        </div>
      </div>

      {/* Acciones de cuenta */}
      <div className="border-t pt-4 space-y-3">


        <button 
          onClick={handleLogout} 
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-medium transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

    </div>
  );
}

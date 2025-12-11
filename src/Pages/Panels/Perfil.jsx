import { useState, useEffect } from "react";
import { authService } from "../../services/authService";

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await authService.getUserProfile();
      setProfile(data);
    } catch (err) {
      setError("Error al cargar el perfil");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB");
      return;
    }

    setUploading(true);
    try {
      await authService.uploadProfileImage(file);
      await fetchProfile();
      alert("Imagen subida exitosamente");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || "Error al subir la imagen";
      alert(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleImageDelete = async (imageId) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar esta imagen?")) {
      return;
    }

    try {
      await authService.deleteProfileImage(imageId);
      await fetchProfile();
      alert("Imagen eliminada exitosamente");
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.detail || "Error al eliminar la imagen";
      alert(errorMsg);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <p className="text-gray-500">Cargando perfil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex flex-col gap-6 items-center justify-center h-full">
        <p className="text-red-500">{error || "No se pudo cargar el perfil"}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Foto principal */}
      <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto overflow-hidden">
        {profile.images && profile.images.length > 0 ? (
          <img src={profile.images[0]} alt="Perfil" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            {profile.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Nombre */}
      <h2 className="text-center text-2xl font-semibold">{profile.username}, {profile.age}</h2>

      {/* Sección fotos */}
      <div className="flex flex-col items-center">
        <h3 className="font-semibold mb-2  self-start">Fotos</h3>

        <div className="grid grid-cols-3 gap-20 justify-items-center">
          {Array.from({ length: 6 }).map((_, idx) => {
            const hasImage = profile.images && profile.images[idx];
            const canUpload = (profile.images?.length || 0) < 6;
            const isFirstEmpty = idx === (profile.images?.length || 0);

            if (hasImage) {
              return (
                <div key={idx} className="relative w-20 h-20 bg-gray-200 rounded overflow-hidden group">
                  <img src={profile.images[idx]} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() => handleImageDelete(profile.image_ids?.[idx])}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                  >
                    ✕
                  </button>
                </div>
              );
            } else if (canUpload && isFirstEmpty) {
              return (
                <label key={idx} className={`w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-3xl ${uploading ? 'cursor-wait opacity-50' : 'cursor-pointer hover:bg-gray-300'}`}>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                  />
                  {uploading ? "..." : "+"}
                </label>
              );
            } else {
              return (
                <div key={`empty-${idx}`} className="w-20 h-20 bg-gray-200 rounded" />
              );
            }
          })}
        </div>
      </div>

      {/* Acerca de mí */}
      <div>
        <h3 className="font-semibold mb-2">Acerca de mí:</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {profile.introduction || "Sin descripción"}
        </p>
      </div>

      {/* Intereses */}
      {profile.interests && profile.interests.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2">Intereses:</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest, idx) => (
              <span key={idx} className="px-3 py-1 bg-[#CE603E] text-white rounded-full text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}

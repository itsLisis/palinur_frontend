import { useState, useEffect } from "react";
import { authService } from "../../services/authService";

export default function Perfil() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [options, setOptions] = useState(null);
  const [editIntroduction, setEditIntroduction] = useState("");
  const [selectedInterestIds, setSelectedInterestIds] = useState([]);

  const fetchProfile = async () => {
    try {
      const data = await authService.getUserProfile();
      setProfile(data);
      setEditIntroduction(data.introduction || "");
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

  const loadOptions = async () => {
    if (options) return;
    const data = await authService.getProfileOptions();
    setOptions(data);
    // Map current interests (names) -> ids
    const currentNames = new Set(profile?.interests || []);
    const ids = (data.interests || [])
      .filter((i) => currentNames.has(i.interest_name))
      .map((i) => i.id);
    setSelectedInterestIds(ids);
  };

  const toggleInterest = (id) => {
    setSelectedInterestIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const startEdit = async () => {
    try {
      await loadOptions();
      setEditing(true);
    } catch (e) {
      alert("No se pudieron cargar los intereses");
    }
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditIntroduction(profile?.introduction || "");
    // restore selected interests from profile names if options are loaded
    if (options) {
      const currentNames = new Set(profile?.interests || []);
      const ids = (options.interests || [])
        .filter((i) => currentNames.has(i.interest_name))
        .map((i) => i.id);
      setSelectedInterestIds(ids);
    }
  };

  const saveEdit = async () => {
    setSaving(true);
    try {
      await authService.updateUserProfile({
        introduction: editIntroduction,
        interest_ids: selectedInterestIds,
      });
      await fetchProfile();
      setEditing(false);
      alert("Perfil actualizado");
    } catch (e) {
      const msg = e.response?.data?.detail || "Error al actualizar perfil";
      alert(typeof msg === "string" ? msg : JSON.stringify(msg));
    } finally {
      setSaving(false);
    }
  };

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
      const errorMsg =
        err.response?.data?.detail || "Error al eliminar la imagen";
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
          <img
            src={profile.images[0]}
            alt="Perfil"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
            {profile.username.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Nombre */}
      <h2 className="text-center text-2xl font-semibold">
        {profile.username}, {profile.age}
      </h2>

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
                <div
                  key={idx}
                  className="relative w-20 h-20 bg-gray-200 rounded overflow-hidden group"
                >
                  <img
                    src={profile.images[idx]}
                    alt={`Foto ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
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
                <label
                  key={idx}
                  className={`w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-3xl ${
                    uploading
                      ? "cursor-wait opacity-50"
                      : "cursor-pointer hover:bg-gray-300"
                  }`}
                >
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
                <div
                  key={`empty-${idx}`}
                  className="w-20 h-20 bg-gray-200 rounded"
                />
              );
            }
          })}
        </div>
      </div>

      {/* Acerca de mí */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold">Acerca de mí:</h3>
          {!editing ? (
            <button
              onClick={startEdit}
              className="px-3 py-1 rounded-md bg-[#CE603E] hover:bg-[#b14e32] text-white text-sm transition-colors"
            >
              Editar
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={cancelEdit}
                disabled={saving}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-sm transition-colors disabled:opacity-60"
              >
                Cancelar
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="px-3 py-1 rounded-md bg-[#CE603E] hover:bg-[#b14e32] text-white text-sm transition-colors disabled:opacity-60"
              >
                {saving ? "Guardando..." : "Guardar"}
              </button>
            </div>
          )}
        </div>

        {!editing ? (
          <p className="text-sm text-gray-700 leading-relaxed">
            {profile.introduction || "Sin descripción"}
          </p>
        ) : (
          <textarea
            value={editIntroduction}
            onChange={(e) => setEditIntroduction(e.target.value)}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            placeholder="Escribe tu descripción..."
          />
        )}
      </div>

      {/* Intereses */}
      <div>
        <h3 className="font-semibold mb-2">Intereses:</h3>
        {!editing ? (
          <div className="flex flex-wrap gap-2">
            {(profile.interests || []).length > 0 ? (
              profile.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[#CE603E] text-white rounded-full text-sm"
                >
                  {interest}
                </span>
              ))
            ) : (
              <span className="text-sm text-gray-500">Sin intereses</span>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {(options?.interests || []).map((i) => (
              <label
                key={i.id}
                className="flex items-center gap-2 p-2 border rounded-md cursor-pointer hover:bg-gray-50"
              >
                <input
                  type="checkbox"
                  checked={selectedInterestIds.includes(i.id)}
                  onChange={() => toggleInterest(i.id)}
                  className="accent-[#CE603E]"
                />
                <span className="text-sm">{i.interest_name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

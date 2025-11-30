export default function Ajustes() {
  return (
    <div className="flex flex-col gap-6">

      <h2 className="font-semibold text-xl">Ajustes</h2>

      <div className="flex items-center justify-between">
        <span>Notificaciones</span>
        <input type="checkbox" />
      </div>

      <div className="flex items-center justify-between">
        <span>Visibilidad del perfil</span>
        <input type="checkbox" />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Rango de edad</label>
        <input type="range" min="18" max="50" />
      </div>

      <div className="flex flex-col">
        <label className="mb-1">Distancia máxima (km)</label>
        <input type="range" min="1" max="50" />
      </div>

      <button className="bg-red-500 text-white py-2 rounded">
        Cerrar sesión
      </button>

    </div>
  );
}

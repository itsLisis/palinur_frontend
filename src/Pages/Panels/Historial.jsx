import { useEffect, useState } from "react";
import { authService } from "../../services/authService";

export default function Historial() {
  const [loading, setLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await authService.getConnectionsHistory();
        setConnections(data.connections || []);
      } catch (e) {
        setError("No se pudo cargar el historial");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-semibold text-3xl">
        Historial de <br />
        conexiones
      </h2>

      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && connections.length === 0 && (
        <p className="text-gray-500">Aún no tienes conexiones</p>
      )}

      <div className="flex flex-col gap-3">
        {connections.map((c) => (
          <div
            key={c.user_id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
              {c.photo_url ? (
                <img
                  src={c.photo_url}
                  alt={c.username || `Usuario ${c.user_id}`}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
            <div className="font-medium text-[#1A2E53]">
              {c.username || `Usuario ${c.user_id}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

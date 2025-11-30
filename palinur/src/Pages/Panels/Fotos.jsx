export default function Fotos() {
  return (
    <div className="p-2">

      <h2 className="font-semibold text-xl mb-4">Mis fotos</h2>

      <div className="grid grid-cols-3 gap-3">

        {/* Botón para agregar */}
        <label className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center text-3xl cursor-pointer">
          +
          <input type="file" className="hidden" />
        </label>

        {/* Fotos simuladas */}
        <div className="w-24 h-24 bg-gray-300 rounded" />
        <div className="w-24 h-24 bg-gray-300 rounded" />
        <div className="w-24 h-24 bg-gray-300 rounded" />
      </div>

    </div>
  );
}

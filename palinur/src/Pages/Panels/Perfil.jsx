export default function Perfil() {
  return (
    <div className="flex flex-col gap-6">

      {/* Foto principal */}
      <div className="w-40 h-40 bg-gray-200 rounded-full mx-auto" />

      {/* Nombre */}
      <h2 className="text-center text-2xl font-semibold">Felipe, 22</h2>

      {/* Sección fotos */}
      <div>
        <h3 className="font-semibold mb-2">Fotos</h3>

        <div className="grid grid-cols-3 gap-3">
          <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-3xl">+</div>
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="w-20 h-20 bg-gray-200 rounded" />
          <div className="w-20 h-20 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Acerca de mí */}
      <div>
        <h3 className="font-semibold mb-2">Acerca de mí:</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat.
        </p>
      </div>

    </div>
  );
}

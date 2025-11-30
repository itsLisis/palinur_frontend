export default function RightPanel() {
  return (
    <div className="w-[450px] bg-white rounded-xl shadow-2xl p-6">
      <img
        src="/jero.jpg"
        className="rounded-lg w-full h-[350px] object-cover"
        alt="hola"
      />

      <div className="flex justify-center gap-6 mt-4">
        <button className="bg-white p-4 rounded-full shadow">❌</button>
        <button className="bg-white p-4 rounded-full shadow">❤️</button>
      </div>

      <p className="text-center mt-4 text-xl font-semibold">Jerónimo, 22</p>
    </div>
  );
}

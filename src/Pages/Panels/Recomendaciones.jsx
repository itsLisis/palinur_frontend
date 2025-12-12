import { 
  UserCircleIcon, 
  ClockIcon, 
  ShieldCheckIcon, 
  ExclamationTriangleIcon 
} from "@heroicons/react/24/outline";

export default function Recomendaciones() {
    const recomendaciones = [
        {
            icono: <UserCircleIcon className="w-8 h-8" />,
            titulo: "Información y consejos",
            contenido: "Completa tu perfil con información honesta y actualizada. Añade varias fotos que muestren tu personalidad y escribe una descripción auténtica de ti mismo. Los perfiles completos tienen un 60% más de probabilidades de recibir matches. Mantén tu información de contacto privada hasta que establezcas confianza con alguien."
        },
        {
            icono: <ShieldCheckIcon className="w-8 h-8" />,
            titulo: "Prioriza tu seguridad",
            contenido: "Nunca compartas información personal sensible como tu dirección, detalles financieros o lugar de trabajo en las primeras conversaciones. Utiliza las funciones de chat de la aplicación antes de dar tu número personal. Si decides conocer a alguien en persona, elige un lugar público y avisa a un amigo o familiar sobre tus planes."
        },
        {
            icono: <ClockIcon className="w-8 h-8" />,
            titulo: "Sé tú mismo",
            contenido: "La autenticidad es clave para encontrar conexiones genuinas. No pretendas ser alguien que no eres solo para impresionar. Comparte tus verdaderos intereses y pasatiempos. Las mejores relaciones se construyen sobre la honestidad desde el principio. Recuerda que el objetivo es encontrar a alguien que te aprecie por quien realmente eres."
        },
        {
            icono: <ExclamationTriangleIcon className="w-8 h-8" />,
            titulo: "Reporta comportamientos inapropiados",
            contenido: "Tu seguridad es nuestra prioridad. Si alguien te hace sentir incómodo, acosa, solicita dinero o muestra comportamiento sospechoso, repórtalo inmediatamente. Utiliza la función de bloqueo si es necesario. Nunca envíes dinero a personas que conoces en línea. Confía en tu instinto: si algo no se siente bien, probablemente no lo está."
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-semibold mb-2">Recomendaciones</h2>

            {recomendaciones.map((item, index) => (
                <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#CE603E] rounded-full flex items-center justify-center text-white">
                        {item.icono}
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{item.titulo}</h3>
                        <p className="text-sm text-gray-700 leading-relaxed text-justify">
                            {item.contenido}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}
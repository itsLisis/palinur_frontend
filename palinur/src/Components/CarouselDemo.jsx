// CarouselFixedImage.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function CarouselDemo() {
  // 0 = mostrar LOGIN, 1 = mostrar CENTRO (imagen), 2 = mostrar REGISTER
  const [index, setIndex] = useState(1);

  // ancho del viewport del carrusel (el "frame" visible). Ajusta según necesites.
  const FRAME_W = 420;
  const FRAME_H = 320;

  // Cuando el wrapper se mueve queremos que:
  // index=0 -> mostrar panel izquierdo (login) -> wrapper x = 0
  // index=1 -> mostrar "centro" -> wrapper x = -FRAME_W/2  (desplaza el panel izquierdo parcialmente)
  // index=2 -> mostrar panel derecho (register) -> wrapper x = -FRAME_W
  // Para que la imagen quede siempre centrada visualmente, el wrapper cubrirá:
  // [LOGIN][ESPACIO_CENTRO][REGISTER] con anchura = FRAME_W * 2 (solo paneles laterales)
  //
  // Aquí simplificamos y calculamos el desplazamiento para que la parte del panel que
  // entra en el frame haga el efecto de empujar.
  const computeX = (i) => {
    // queremos que:
    // i=0 -> x = 0
    // i=1 -> x = -FRAME_W / 2
    // i=2 -> x = -FRAME_W
    if (i === 0) return 0;
    if (i === 1) return -FRAME_W / 2;
    return -FRAME_W;
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div
        className="relative"
        style={{ width: FRAME_W, height: FRAME_H }}
      >
        {/* FRAME visible */}
        <div
          className="absolute inset-0 overflow-hidden rounded-lg shadow-lg bg-white"
          style={{ width: FRAME_W, height: FRAME_H }}
        >
          {/* Wrapper deslizable: contiene los dos paneles laterales (LOGIN y REGISTER).
              Ocupamos 2*FRAME_W porque mostramos sólo las mitades necesarias para el empuje. */}
          <motion.div
            className="flex h-full"
            style={{ width: FRAME_W * 2 }}
            animate={{ x: computeX(index) }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            {/* PANEL LOGIN (izquierda) */}
            <div
              className="flex  w-[45%] items-center justify-center"
              style={{ width: FRAME_W, height: FRAME_H }}
            >
              <div className="w-11/12">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                <input className="w-full p-2 border rounded mb-3" placeholder="Correo" />
                <input className="w-full p-2 border rounded mb-3" placeholder="Contraseña" />
                <button className="w-full p-2 bg-orange-400 text-white rounded">Entrar</button>
              </div>
            </div>
            <div
            className="flex items-center justify-center"
            style={{ width: FRAME_W * 0.7, height: FRAME_H * 0.9, zIndex: 20 }}
            >
            <img
                src="/pal.png"
                alt="imagen central"
                className="w-full h-full object-contain"
                style={{ display: "block" }}
            />
            </div>

            {/* PANEL REGISTER (derecha) */}
            <div
              className="flex w-[45%] items-center justify-center bg-white"
              style={{ width: FRAME_W, height: FRAME_H }}
            >
              <div className="w-11/12">
                <h2 className="text-2xl font-bold mb-4">Registro</h2>
                <input className="w-full p-2 border rounded mb-3" placeholder="Correo" />
                <input className="w-full p-2 border rounded mb-3" placeholder="Nombre" />
                <button className="w-full p-2 bg-orange-400 text-white rounded">Crear cuenta</button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* IMAGEN CENTRAL fija (encima del frame).
           Notar: usamos position absolute con transform para centrar,
           y z-index mayor para que quede por encima del wrapper deslizable. */}

      </div>

      {/* Controles */}
      <div className="absolute bottom-10 flex gap-3">
        <button
          onClick={() => setIndex(0)}
          className="px-4 py-2 bg-white rounded shadow"
        >
          Login
        </button>
        <button
          onClick={() => setIndex(1)}
          className="px-4 py-2 bg-white rounded shadow"
        >
          Centro
        </button>
        <button
          onClick={() => setIndex(2)}
          className="px-4 py-2 bg-white rounded shadow"
        >
          Registro
        </button>
      </div>
    </div>
  );
}

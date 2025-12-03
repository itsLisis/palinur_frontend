import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function AnimatedImage() {
  const location = useLocation();

  // Detecta si estamos en login o registro
  const isLogin = location.pathname === "/";

  return (
    <motion.img
      src="/pal.png"
      className="w-[70%]"
      key={location.pathname}
      initial={{
        x: isLogin ? 200 : -200, // desde fuera
        opacity: 1
      }}
      animate={{
        x: 0, // centro
        opacity: 1
      }}
      exit={{
        x: isLogin ? -200 : 200, // sale hacia el otro lado
        opacity: 1
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    />
  );
}

import { motion } from "framer-motion";

export default function ImageSlider({ direction = "left", src }) {
  return (
    <motion.img
      src={src}
      className="w-[70%]"
      initial={{
        x: direction === "left" ? "-100%" : "100%", // entra desde fuera
      }}
      animate={{
        x: "0%", // se posiciona
      }}
      exit={{
        x: direction === "left" ? "-100%" : "100%", // sale hacia afuera
      }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
      }}
    />
  );
}

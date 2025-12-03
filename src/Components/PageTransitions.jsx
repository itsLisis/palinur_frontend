import { motion } from "framer-motion";

export default function PageTransition({ children, direction = "left" }) {
  const variants = {
    enter: {
      x: direction === "left" ? -200 : 200,
      opacity: 0,
    },
    center: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: direction === "left" ? -200 : 200,
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: 0.35 }}
      variants={variants}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

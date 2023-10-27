import { motion } from "framer-motion";
import { Fredoka_One } from "next/font/google";

const fredoka_One = Fredoka_One({ subsets: ["latin"], weight: "400" });

function Banner() {
  const text = "Críticas Sobre A Cultura Pop";
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      x: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <div
      aria-hidden={true}
      className="bg-stars h-[500px] w-full flex justify-center items-center "
    >
      <motion.div
        className={"h-[100px] text-center text-5xl text-emerald-500"}
        style={fredoka_One.style}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {words.map((word: string, index) => (
          <motion.p
            className="pl-3 text-left sm:inline"
            variants={child}
            key={index}
          >
            {word}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
}

export default Banner;

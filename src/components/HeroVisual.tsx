import { motion } from "framer-motion";
import {
  ReactIcon,
  NodeIcon,
  TypeScriptIcon,
  GoIcon,
  PythonIcon,
  DatabaseIcon,
  APIIcon,
} from "./TechIcons";

const floating = [
  { icon: <GoIcon />, label: "Go", x: "2%", y: "8%", delay: 0.15, duration: 4.2 },
  { icon: <PythonIcon />, label: "Python", x: "68%", y: "4%", delay: 0.25, duration: 4.8 },
  { icon: <ReactIcon />, label: "React", x: "78%", y: "38%", delay: 0.35, duration: 5.1 },
  { icon: <NodeIcon />, label: "Node", x: "0%", y: "48%", delay: 0.45, duration: 4.5 },
  { icon: <TypeScriptIcon />, label: "TS", x: "72%", y: "72%", delay: 0.55, duration: 5.4 },
  { icon: <DatabaseIcon />, label: "DB", x: "8%", y: "78%", delay: 0.65, duration: 4.7 },
  { icon: <APIIcon />, label: "API", x: "42%", y: "88%", delay: 0.75, duration: 5.0 },
];

const HeroVisual = () => {
  return (
    <motion.div
      className="relative mx-auto aspect-square w-full max-w-[440px] lg:max-w-none"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.25 }}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="absolute inset-[12%] rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute inset-[28%] rounded-full bg-accent/20 blur-2xl" />

      {/* Orbit rings */}
      <motion.div
        className="absolute inset-[8%] rounded-full border border-primary/25"
        animate={{ rotate: 360 }}
        transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-[18%] rounded-full border border-dashed border-accent/30"
        animate={{ rotate: -360 }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      <div className="absolute inset-[30%] rounded-full border border-white/10" />

      {/* Center core */}
      <motion.div
        className="absolute left-1/2 top-1/2 z-10 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-primary/40 bg-card/80 shadow-[0_0_50px_hsl(187_94%_48%/0.35)] backdrop-blur-md md:h-44 md:w-44"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-bold text-white md:h-16 md:w-16"
          style={{ background: "var(--gradient-primary)" }}
        >
          AI
        </div>
        <span className="font-display text-sm font-semibold text-white">Express</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-primary">
          GenAI Core
        </span>
      </motion.div>

      {/* Floating stack icons */}
      {floating.map((item) => (
        <motion.div
          key={item.label}
          className="absolute z-20 flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-card/75 px-3 py-2.5 shadow-lg backdrop-blur-md"
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: item.delay, type: "spring", stiffness: 180 }}
          whileHover={{ scale: 1.12, borderColor: "hsl(187 94% 48% / 0.5)" }}
        >
          <motion.div
            className="text-primary"
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay,
            }}
          >
            {item.icon}
          </motion.div>
          <span className="text-[10px] font-semibold text-white/80">{item.label}</span>
        </motion.div>
      ))}

      {/* Small accent chips */}
      <motion.span
        className="absolute left-[38%] top-[6%] z-20 rounded-md bg-accent px-2.5 py-1 text-[10px] font-bold text-white shadow-lg"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
      >
        RAG
      </motion.span>
      <motion.span
        className="absolute bottom-[18%] right-[6%] z-20 rounded-md border border-primary/40 bg-primary/20 px-2.5 py-1 text-[10px] font-bold text-primary backdrop-blur"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        n8n
      </motion.span>
    </motion.div>
  );
};

export default HeroVisual;

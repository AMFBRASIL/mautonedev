import { motion } from "framer-motion";

interface FloatingTechIconProps {
  icon: React.ReactNode;
  label: string;
  delay?: number;
  x: number;
  y: number;
}

const FloatingTechIcon = ({ icon, label, delay = 0, x, y }: FloatingTechIconProps) => {
  return (
    <motion.div
      className="absolute glass rounded-xl p-3 flex flex-col items-center gap-1 cursor-pointer group"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: delay,
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      whileHover={{ 
        scale: 1.15, 
        boxShadow: "0 0 30px hsl(199 89% 48% / 0.4)",
      }}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-primary text-2xl md:text-3xl"
      >
        {icon}
      </motion.div>
      <span className="text-[10px] md:text-xs text-muted-foreground group-hover:text-foreground transition-colors font-medium">
        {label}
      </span>
    </motion.div>
  );
};

export default FloatingTechIcon;

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import FloatingTechIcon from "./FloatingTechIcon";
import {
  ReactIcon,
  NodeIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  PHPIcon,
  SQLIcon,
  HTMLIcon,
  CSSIcon,
  DatabaseIcon,
  APIIcon,
} from "./TechIcons";
import profileImage from "@/assets/profile-anderson.jpg";

const techIcons = [
  { icon: <ReactIcon />, label: "React", x: 5, y: 15, delay: 0.2 },
  { icon: <NodeIcon />, label: "Node.js", x: 85, y: 10, delay: 0.3 },
  { icon: <TypeScriptIcon />, label: "TypeScript", x: 0, y: 50, delay: 0.4 },
  { icon: <JavaScriptIcon />, label: "JavaScript", x: 88, y: 45, delay: 0.5 },
  { icon: <PHPIcon />, label: "PHP", x: 8, y: 80, delay: 0.6 },
  { icon: <SQLIcon />, label: "SQL", x: 82, y: 75, delay: 0.7 },
  { icon: <HTMLIcon />, label: "HTML5", x: 20, y: 5, delay: 0.8 },
  { icon: <CSSIcon />, label: "CSS3", x: 72, y: 5, delay: 0.9 },
  { icon: <DatabaseIcon />, label: "Database", x: 75, y: 88, delay: 1.0 },
  { icon: <APIIcon />, label: "API", x: 18, y: 92, delay: 1.1 },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Profile Image with Floating Icons */}
          <div className="relative w-full max-w-lg mb-8">
            {/* Floating Tech Icons */}
            {techIcons.map((tech, index) => (
              <FloatingTechIcon
                key={index}
                icon={tech.icon}
                label={tech.label}
                x={tech.x}
                y={tech.y}
                delay={tech.delay}
              />
            ))}

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="relative mx-auto w-48 h-48 md:w-64 md:h-64 my-16"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent p-1 animate-glow-pulse">
                <div className="w-full h-full rounded-full overflow-hidden bg-background">
                  <img
                    src={profileImage}
                    alt="Anderson Mautone"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-foreground">Anderson</span>{" "}
              <span className="gradient-text">Mautone</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-6 font-medium">
              Desenvolvedor Avançado de Softwares Web
            </p>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl">
              Especialista em{" "}
              <span className="text-primary">Arquitetura de Sistemas</span>,{" "}
              <span className="text-primary">Banco de Dados</span> e{" "}
              <span className="text-primary">Business Intelligence</span> com{" "}
              <span className="text-accent font-semibold">28 anos</span> de
              experiência transformando ideias em soluções tecnológicas
              robustas.
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[
                { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
                { icon: <Github size={20} />, href: "#", label: "GitHub" },
                { icon: <Mail size={20} />, href: "#contato", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="glass p-3 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href="#projetos"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold text-primary-foreground transition-all glow-primary"
              style={{ background: "var(--gradient-primary)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Projetos
              <ArrowDown size={18} />
            </motion.a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="text-muted-foreground" size={24} />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import ExpressDevLogo from "./ExpressDevLogo";
import HeroVisual from "./HeroVisual";
import heroImage from "@/assets/hero-express-dev.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <img
        src={heroImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-45"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-8">
          {/* Left: copy */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7"
            >
              <ExpressDevLogo light className="scale-110 origin-left" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.08] text-white text-balance mb-5"
            >
              Software e GenAI que{" "}
              <span className="gradient-text">aceleram</span> a sua empresa.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed mb-9"
            >
              Sistemas corporativos, APIs, automação e Inteligência Artificial
              aplicada ao negócio — do diagnóstico à entrega em produção.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#contato"
                className="cta-hot inline-flex items-center gap-2 rounded-md px-7 py-3.5 text-sm font-bold transition"
              >
                Solicitar proposta
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicos"
                className="inline-flex items-center gap-2 rounded-md border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Ver serviços
              </a>
              <Link
                to="/conhecimentos"
                className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium text-white/75 transition hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                Base técnica
              </Link>
            </motion.div>
          </div>

          {/* Right: floating icons visual */}
          <div className="relative min-h-[340px] md:min-h-[420px] lg:min-h-[480px] flex items-center justify-center">
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

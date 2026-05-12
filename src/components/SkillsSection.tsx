import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const webSkills = [
  { name: "React", level: 95 },
  { name: "Node.js", level: 90 },
  { name: "TypeScript", level: 92 },
  { name: "JavaScript", level: 98 },
  { name: "PHP", level: 95 },
  { name: "HTML5/CSS3", level: 98 },
  { name: "Express.js", level: 88 },
  { name: "REST APIs", level: 95 },
];

const advancedSkills = [
  { name: "SQL Server", level: 95 },
  { name: "PostgreSQL", level: 90 },
  { name: "MySQL", level: 92 },
  { name: "MongoDB", level: 85 },
  { name: "Data Warehouse", level: 90 },
  { name: "ETL", level: 88 },
  { name: "Power BI", level: 85 },
  { name: "Arquitetura de Sistemas", level: 95 },
];

const SkillBar = ({
  name,
  level,
  delay,
  isInView,
}: {
  name: string;
  level: number;
  delay: number;
  isInView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.5, delay }}
    className="mb-4"
  >
    <div className="flex justify-between mb-2">
      <span className="text-sm font-medium text-foreground">{name}</span>
      <span className="text-sm text-muted-foreground">{level}%</span>
    </div>
    <div className="h-2 bg-secondary rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={isInView ? { width: `${level}%` } : {}}
        transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{ background: "var(--gradient-primary)" }}
      />
    </div>
  </motion.div>
);

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Skills</span> & Tecnologias
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full" style={{ background: "var(--gradient-primary)" }} />
          <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
            Domínio completo do stack de desenvolvimento web moderno, combinado
            com expertise em bancos de dados e Business Intelligence.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Web Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-primary" />
              Desenvolvimento Web
            </h3>
            {webSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.3 + index * 0.05}
                isInView={isInView}
              />
            ))}
          </motion.div>

          {/* Advanced Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass rounded-2xl p-8"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-accent" />
              Banco de Dados & BI
            </h3>
            {advancedSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                delay={0.5 + index * 0.05}
                isInView={isInView}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

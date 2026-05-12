import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-sm text-muted-foreground">
            © {currentYear} Anderson Mautone. Todos os direitos reservados.
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Desenvolvido com</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>e muito</span>
            <span className="text-primary">código</span>
          </div>

          <nav className="flex gap-6">
            {["Home", "Sobre", "Skills", "Projetos", "Contato"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

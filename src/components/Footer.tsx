import { Link } from "react-router-dom";
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

          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              to="/conhecimentos"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Conhecimentos
            </Link>
            <Link
              to="/curriculo"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Currículo
            </Link>
            <a
              href="/#contato"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contato
            </a>
          </nav>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

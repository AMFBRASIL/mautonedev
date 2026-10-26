import { Link } from "react-router-dom";
import ExpressDevLogo from "./ExpressDevLogo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/40 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <div>
            <ExpressDevLogo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Desenvolvimento de software, arquitetura e GenAI para empresas.
              Liderado por Anderson Mautone.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href="/#servicos" className="text-muted-foreground hover:text-primary">
              Serviços
            </a>
            <a href="/#projetos" className="text-muted-foreground hover:text-primary">
              Projetos
            </a>
            <Link to="/conhecimentos" className="text-muted-foreground hover:text-primary">
              Conhecimentos
            </Link>
            <Link to="/curriculo" className="text-muted-foreground hover:text-primary">
              Currículo
            </Link>
            <a href="/#contato" className="text-muted-foreground hover:text-primary">
              Contato
            </a>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
          © {currentYear} Express Dev · Anderson Mautone. Todos os direitos
          reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

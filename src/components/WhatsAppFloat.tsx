import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { getArticle } from "@/data/knowledge";

const PHONE = "5511984401158";

function messageForPath(pathname: string): string {
  if (pathname === "/") {
    return "Olá Express Dev! Vim pelo site e gostaria de falar sobre um projeto de software / GenAI.";
  }

  if (pathname === "/curriculo") {
    return "Olá Express Dev! Estou vendo o currículo do Anderson Mautone e gostaria de conversar sobre uma oportunidade ou projeto.";
  }

  if (pathname === "/conhecimentos") {
    return "Olá Express Dev! Estou no hub de conhecimentos e quero tirar dúvidas sobre GenAI, RAG ou arquitetura.";
  }

  if (pathname.startsWith("/conhecimentos/")) {
    const slug = pathname.split("/")[2];
    const article = getArticle(slug);
    if (article) {
      return `Olá Express Dev! Li o artigo “${article.title}” e gostaria de conversar sobre aplicar isso na minha empresa.`;
    }
    return "Olá Express Dev! Estou nos artigos de GenAI do site e quero falar sobre um projeto.";
  }

  if (pathname === "/contato/enviado") {
    return "Olá Express Dev! Acabei de enviar uma mensagem pelo formulário do site e gostaria de adiantar a conversa no WhatsApp.";
  }

  return "Olá Express Dev! Vim pelo site mautone.com.br e gostaria de mais informações.";
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden
  >
    <path d="M16.04 3C9.4 3 4 8.37 4 14.97c0 2.1.55 4.15 1.6 5.96L4 29l8.28-1.55a12.1 12.1 0 0 0 3.76.6h.01c6.64 0 12.04-5.37 12.04-11.97C28.09 8.37 22.69 3 16.04 3zm0 21.85h-.01a10 10 0 0 1-5.1-1.4l-.36-.21-4.91.92.93-4.78-.24-.38a9.9 9.9 0 0 1-1.52-5.27c0-5.47 4.48-9.92 10-9.92 2.67 0 5.18 1.04 7.07 2.92a9.86 9.86 0 0 1 2.92 7.04c0 5.48-4.48 9.93-9.99 9.93zm5.48-7.43c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.49s1.07 2.89 1.22 3.09c.15.2 2.11 3.22 5.11 4.51.71.31 1.27.49 1.7.63.72.23 1.37.2 1.89.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
  </svg>
);

const WhatsAppFloat = () => {
  const { pathname } = useLocation();

  const href = useMemo(() => {
    const text = encodeURIComponent(messageForPath(pathname));
    return `https://wa.me/${PHONE}?text=${text}`;
  }, [pathname]);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com a Express Dev"
      title="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-105 hover:bg-[#1ebe57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366] md:bottom-7 md:right-7"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.4 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.4s]" />
      <WhatsAppIcon className="relative z-10 h-7 w-7" />
    </motion.a>
  );
};

export default WhatsAppFloat;

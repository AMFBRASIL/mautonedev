import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Send, MapPin, Phone, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Em produção, usar URL relativa. Em desenvolvimento, usar variável de ambiente ou localhost
const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? "" : "http://localhost:3011");

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/email/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const raw = await response.text();
      let data: { success?: boolean; message?: string } = {};
      try {
        data = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error(
          response.status === 404
            ? "Serviço de e-mail indisponível (API não encontrada)."
            : "Resposta inválida do servidor de e-mail."
        );
      }

      if (response.ok && data.success) {
        toast({
          title: "Mensagem enviada!",
          description:
            "Recebemos seu contato. Você também receberá um e-mail de confirmação.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(data.message || "Erro ao enviar mensagem");
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contato" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary mb-3">
            Contato
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Vamos falar do projeto da sua empresa
          </h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto text-lg">
            Conte o desafio — sistema, integração, GenAI ou produto. Retornamos
            com uma proposta objetiva.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold mb-4">
                Express Dev — atendimento comercial
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Projetos sob demanda, consultoria de arquitetura e desenvolvimento
                contínuo. Ideal para empresas que precisam de um parceiro técnico
                com visão de negócio e entrega em produção.
              </p>
            </div>

            <div className="space-y-4">
              <motion.div
                className="flex items-center gap-4 p-4 surface-card rounded-lg"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-secondary text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">E-mail</p>
                  <p className="font-medium">contato@mautone.com.br</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 surface-card rounded-lg"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-secondary text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p className="font-medium">+55 (11) 9.8440-1158</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 p-4 surface-card rounded-lg"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-secondary text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Localização</p>
                  <p className="font-medium">São Paulo, Brasil</p>
                </div>
              </motion.div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/anderson-mautone-a005b9a/", label: "LinkedIn" },
                { icon: <Mail className="w-5 h-5" />, href: "mailto:contato@mautone.com.br", label: "Email" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="surface-card p-4 rounded-lg text-muted-foreground hover:text-primary transition-colors"
                  whileHover={{ scale: 1.1, y: -3 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="surface-card rounded-xl p-8 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2 text-foreground"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all text-foreground placeholder:text-muted-foreground"
                  placeholder="Como posso ajudar?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all resize-none text-foreground placeholder:text-muted-foreground"
                  placeholder="Descreva seu projeto ou ideia..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="cta-hot w-full py-4 rounded-md font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={!isSubmitting ? { scale: 1.01 } : {}}
                whileTap={!isSubmitting ? { scale: 0.99 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Solicitar proposta
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

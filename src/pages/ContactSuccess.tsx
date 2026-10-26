import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Linkedin,
  Mail,
  MessageCircle,
  Phone,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LocationState = {
  name?: string;
  email?: string;
};

const nextSteps = [
  {
    icon: Mail,
    title: "Confirmação no e-mail",
    text: "Você recebe um aviso de que a mensagem chegou à Express Dev.",
  },
  {
    icon: Clock,
    title: "Análise do pedido",
    text: "Lemos o contexto e montamos uma resposta objetiva sobre o próximo passo.",
  },
  {
    icon: MessageCircle,
    title: "Retorno em até 24h úteis",
    text: "Entramos em contato pelo e-mail informado para alinhar escopo e proposta.",
  },
];

const reading = [
  {
    to: "/conhecimentos/rag",
    title: "RAG em produção",
    text: "Como ligar LLMs ao conhecimento da sua empresa com segurança.",
  },
  {
    to: "/conhecimentos/ai-agents",
    title: "AI Agents",
    text: "Tool calling e agentes que operam em sistemas corporativos.",
  },
  {
    to: "/conhecimentos/golang-producao",
    title: "Go em produção",
    text: "Como entrar em um projeto Go sem gerar prejuízo operacional.",
  },
];

const ContactSuccess = () => {
  const location = useLocation();
  const state = (location.state as LocationState | null) ?? {};
  const firstName = state.name?.trim().split(/\s+/)[0];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(8,145,178,0.18),_transparent_55%),radial-gradient(ellipse_at_bottom_right,_rgba(249,115,22,0.12),_transparent_45%)]"
          />
          <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <CheckCircle2 className="h-9 w-9" />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-primary"
            >
              Express Dev
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="font-display text-3xl font-bold md:text-5xl"
            >
              {firstName
                ? `${firstName}, mensagem enviada com sucesso`
                : "Mensagem enviada com sucesso"}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground"
            >
              Obrigado pelo contato. Já recebemos sua solicitação e entraremos em
              contato em até{" "}
              <span className="text-foreground font-medium">24 horas úteis</span>
              {state.email ? (
                <>
                  {" "}
                  pelo e-mail{" "}
                  <span className="text-foreground font-medium">{state.email}</span>
                </>
              ) : null}
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                to="/"
                className="cta-hot inline-flex items-center gap-2 rounded-md px-5 py-3 text-sm font-bold"
              >
                Voltar ao início
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="https://wa.me/5511984401158?text=Ol%C3%A1%20Express%20Dev%2C%20acabei%20de%20enviar%20uma%20mensagem%20pelo%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
              >
                <Phone className="h-4 w-4" />
                Preferir WhatsApp agora
              </a>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-10 max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                Próximos passos
              </p>
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                O que acontece a partir de agora
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {nextSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: index * 0.08 }}
                  className="rounded-xl border border-border/70 bg-secondary/30 p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Passo {index + 1}
                  </p>
                  <h3 className="font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 md:py-20">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  <Sparkles className="h-4 w-4" />
                  Enquanto isso
                </p>
                <h2 className="font-display text-2xl font-bold md:text-3xl">
                  Conteúdo útil sobre GenAI e engenharia
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Materiais do hub de conhecimentos da Express Dev — úteis para
                  alinhar conversa técnica na proposta.
                </p>
              </div>
              <Link
                to="/conhecimentos"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                <BookOpen className="h-4 w-4" />
                Ver hub completo
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {reading.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  <Link
                    to={item.to}
                    className="group block h-full rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-primary/40 hover:bg-secondary/40"
                  >
                    <h3 className="font-display text-lg font-bold group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {item.text}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Ler artigo
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border/60 py-16 md:pb-24">
          <div className="container mx-auto max-w-5xl px-4">
            <div className="rounded-2xl border border-border/70 bg-gradient-to-br from-cyan-500/10 via-background to-orange-500/10 p-8 md:p-10">
              <h2 className="font-display text-2xl font-bold md:text-3xl">
                Prefere outro canal?
              </h2>
              <p className="mt-2 max-w-2xl text-muted-foreground">
                Se a urgência for alta, fale direto. Também vale acompanhar o
                perfil no LinkedIn para cases e atualizações técnicas.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <a
                  href="mailto:contato@mautone.com.br"
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition hover:border-primary/40"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">E-mail</p>
                    <p className="text-sm font-medium">contato@mautone.com.br</p>
                  </div>
                </a>
                <a
                  href="tel:+5511984401158"
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition hover:border-primary/40"
                >
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Telefone</p>
                    <p className="text-sm font-medium">+55 (11) 9.8440-1158</p>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/anderson-mautone-a005b9a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/50 p-4 transition hover:border-primary/40"
                >
                  <Linkedin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">LinkedIn</p>
                    <p className="text-sm font-medium">Anderson Mautone</p>
                  </div>
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/#servicos"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/40 hover:text-primary"
                >
                  Ver serviços
                </Link>
                <Link
                  to="/curriculo"
                  className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-semibold hover:border-primary/40 hover:text-primary"
                >
                  Ver currículo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactSuccess;

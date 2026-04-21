"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    business: "",
    goal: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [formMessage, setFormMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappNumber = "5511999999999";
  const appsScriptUrl =
    "https://script.google.com/macros/s/AKfycbwuwbtCIHtyrMjMkGxh9lwssRcCfvrk3wiEO08GfjZuBAtOXrVg-5emXUBHTM1JaHKtgQ/exec";

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);

    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    }

    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(
      7
    )}`;
  };

  const isValidWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.length >= 10 && numbers.length <= 11;
  };

  const handleLeadInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setLeadForm((prev) => ({
      ...prev,
      [name]: name === "whatsapp" ? formatWhatsApp(value) : value,
    }));
  };

  const handleLeadSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("idle");
    setFormMessage("");

    if (!leadForm.name.trim()) {
      setFormStatus("error");
      setFormMessage("Preencha seu nome.");
      setIsSubmitting(false);
      return;
    }

    if (!isValidWhatsApp(leadForm.whatsapp)) {
      setFormStatus("error");
      setFormMessage("Digite um WhatsApp válido com DDD.");
      setIsSubmitting(false);
      return;
    }

    if (!leadForm.business.trim()) {
      setFormStatus("error");
      setFormMessage("Selecione o tipo de negócio.");
      setIsSubmitting(false);
      return;
    }

    if (!leadForm.goal.trim() || leadForm.goal.trim().length < 10) {
      setFormStatus("error");
      setFormMessage(
        "Descreva melhor seu objetivo em pelo menos 10 caracteres."
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("name", leadForm.name);
      formData.append("whatsapp", leadForm.whatsapp);
      formData.append("business", leadForm.business);
      formData.append("goal", leadForm.goal);

      await fetch(appsScriptUrl, {
        method: "POST",
        body: formData,
      });

      const whatsappMessage = `Olá! Quero uma demonstração da Zayntor.

Nome: ${leadForm.name || "-"}
WhatsApp: ${leadForm.whatsapp || "-"}
Tipo de negócio: ${leadForm.business || "-"}
Objetivo: ${leadForm.goal || "-"}`;

      setFormStatus("success");
      setFormMessage("Lead enviado com sucesso. Abrindo WhatsApp...");

      setLeadForm({
        name: "",
        whatsapp: "",
        business: "",
        goal: "",
      });

      setTimeout(() => {
        openWhatsApp(whatsappMessage);
      }, 500);
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        "Não foi possível enviar agora. Tente novamente em instantes."
      );
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const niches = [
    "Clínicas",
    "Estética",
    "Restaurantes",
    "Advogados",
    "Imobiliárias",
    "Academias",
  ];

  const plans = [
    {
      name: "Starter",
      price: "R$ 97,00",
      description:
        "✔ Site profissional completo ✔ Design moderno ✔ Integração com WhatsApp ✔ Estrutura pronta para conversão",
      featured: false,
      whatsappMessage:
        "Olá! Quero começar com o plano Starter e ter meu site profissional.",
    },
    {
      name: "Pro",
      price: "R$ 197,00",
      description:
        "✔ Tudo do Starter ✔ IA de atendimento ✔ Automação no WhatsApp ✔ Captação de leads ✔ Estrutura para vendas",
      featured: true,
      whatsappMessage:
        "Olá! Quero o plano Pro com site + IA + automação.",
    },
    {
      name: "Business",
      price: "R$ 397,00",
      description:
        "✔ Tudo do Pro ✔ IA avançada ✔ Automações completas ✔ Estratégia de conversão ✔ Suporte prioritário",
      featured: false,
      whatsappMessage:
        "Olá! Quero o plano Business completo.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Você nos chama",
      description:
        "Explique seu negócio, seu objetivo e o que você quer melhorar no seu atendimento e na sua presença online.",
    },
    {
      number: "02",
      title: "Criamos seu site",
      description:
        "Desenvolvemos um site profissional, moderno e focado em conversão para apresentar sua empresa do jeito certo.",
    },
    {
      number: "03",
      title: "Ativamos a inteligência artificial",
      description:
        "Automatizamos seu atendimento, integramos com WhatsApp e organizamos seus leads para vender mais.",
    },
  ];

  const benefits = [
    "Mais clientes entrando todos os dias",
    "Atendimento automático 24h",
    "Mais profissionalismo na sua marca",
    "Mais vendas sem depender só de você",
  ];

  const faqs = [
    {
      question: "A Zayntor funciona apenas para clínicas?",
      answer:
        "Não. A Zayntor pode atender diversos nichos e criar a estrutura ideal de site e automação para cada negócio.",
    },
    {
      question: "Vocês criam o site também?",
      answer:
        "Sim. Criamos seu site profissional completo e integramos inteligência artificial para automatizar seu atendimento e gerar mais clientes.",
    },
    {
      question: "Preciso já ter um site pronto?",
      answer:
        "Não. Se você ainda não tem site, nós criamos para você e já deixamos preparado para captar e atender clientes.",
    },
    {
      question: "Funciona no WhatsApp?",
      answer:
        "Sim. A estrutura é preparada para operar com atendimento inteligente em canais como WhatsApp.",
    },
  ];

  const trustItems = [
    "Criação de sites profissionais",
    "IA de atendimento",
    "Integração com WhatsApp",
    "Automação comercial",
  ];

  const stats = [
    { value: "Site + IA", label: "estrutura completa para vender mais" },
    { value: "24/7", label: "atendimento ativo no site e no WhatsApp" },
    { value: "+ conversão", label: "mais oportunidades aproveitadas" },
  ];

  const proofCards = [
    {
      title: "Site que transmite confiança",
      text: "Sua empresa passa mais profissionalismo com um site moderno, rápido e pensado para converter visitantes em oportunidades.",
    },
    {
      title: "Atendimento que não para",
      text: "A IA responde com rapidez, melhora a experiência do cliente e evita perda de contatos por demora no atendimento.",
    },
    {
      title: "Mais conversão com menos esforço",
      text: "Você ganha uma estrutura mais organizada para captar, qualificar e encaminhar leads com mais eficiência.",
    },
  ];

  return (
    <main
      onMouseMove={(e) => setMouse({ x: e.clientX, y: e.clientY })}
      className="relative overflow-hidden bg-[#071120] text-white"
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 transition duration-300"
        style={{
          background: `
            radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(34,211,238,0.12), transparent 40%),
            radial-gradient(400px at ${mouse.x * 0.6}px ${mouse.y * 0.6}px, rgba(168,85,247,0.10), transparent 50%)
          `,
        }}
      />

      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.10),transparent_28%),radial-gradient(circle_at_top_right,rgba(168,85,247,0.10),transparent_25%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_30%)]" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_20%,transparent_80%,rgba(255,255,255,0.02))]" />

      <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-[0_0_24px_rgba(34,211,238,0.14)]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 via-transparent to-violet-500/20" />
              <div className="absolute h-8 w-8 rounded-full bg-cyan-400/20 blur-xl" />
              <div className="relative flex items-center justify-center">
                <div className="h-[2px] w-5 rotate-[-28deg] bg-gradient-to-r from-cyan-300 to-violet-400 shadow-[0_0_14px_rgba(34,211,238,0.7)]" />
                <div className="absolute h-[2px] w-5 rotate-[28deg] bg-gradient-to-r from-violet-400 to-cyan-300 shadow-[0_0_14px_rgba(168,85,247,0.7)]" />
                <div className="absolute h-2 w-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.85)]" />
              </div>
            </div>

            <div className="leading-none">
              <p className="bg-gradient-to-r from-white via-cyan-200 to-violet-300 bg-clip-text text-base font-semibold tracking-[-0.04em] text-transparent">
                Zayntor AI
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-white/45">
                Sites e inteligência para negócios
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
            <a href="#solucoes" className="transition hover:text-white">
              Soluções
            </a>
            <a href="#nichos" className="transition hover:text-white">
              Nichos
            </a>
            <a href="#planos" className="transition hover:text-white">
              Planos
            </a>
            <a href="#contato" className="transition hover:text-white">
              Contato
            </a>
          </nav>

          <button
            onClick={() =>
              openWhatsApp(
                "Olá! Quero entender como a Zayntor pode criar meu site profissional e automatizar meu atendimento no WhatsApp."
              )
            }
            className="rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 px-5 py-2 text-sm font-medium text-black shadow-[0_12px_30px_rgba(34,211,238,0.22)] transition duration-300 hover:scale-[1.02] hover:opacity-95"
          >
            Falar com especialista
          </button>
        </div>
      </header>

      <section className="mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-12 pt-32 md:px-10">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal>
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
                Criamos seu site e automatizamos seu atendimento
              </div>

              <div className="relative">
                <div className="absolute -left-40 top-0 h-[500px] w-[500px] bg-cyan-400/20 blur-[160px]" />
                <div className="absolute left-20 top-20 h-[400px] w-[400px] bg-violet-500/20 blur-[160px]" />
                <div className="absolute left-40 top-40 h-[300px] w-[300px] bg-blue-500/10 blur-[120px]" />

                <h1 className="relative max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
                  Criamos seu site do zero
                  <br />
                  e automatizamos seu atendimento
                  <br />
                  no WhatsApp com um{" "}
                  <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                    funcionário virtual
                  </span>{" "}
                  que atende seus clientes 24h
                </h1>
              </div>

              <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 md:text-lg">
                Criamos seu site profissional e automatizamos seu atendimento
                no WhatsApp para responder clientes, iniciar conversas e ajudar
                sua empresa a vender todos os dias.
              </p>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
                Ideal para empresas que querem presença online profissional,
                captar mais clientes e automatizar o atendimento sem
                complicação.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() =>
                    openWhatsApp(
                      "Olá! Quero um site profissional e automatizar meu atendimento no WhatsApp com IA."
                    )
                  }
                  className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-8 py-4 text-sm font-semibold text-black shadow-[0_20px_60px_rgba(34,211,238,0.35)] transition duration-300 hover:scale-[1.04] hover:shadow-[0_30px_80px_rgba(34,211,238,0.5)]"
                >
                  Quero meu site com IA
                </button>

                <a
                  href="#solucoes"
                  className="rounded-2xl border border-white/12 bg-white/[0.03] px-7 py-4 text-center text-sm font-medium text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.08]"
                >
                  Ver soluções
                </a>
              </div>

              <div className="mt-12 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_60px_rgba(34,211,238,0.2)]">
                  <p className="text-3xl font-semibold tracking-[-0.03em]">
                    Site + IA
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Estrutura completa para sua presença digital.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_60px_rgba(34,211,238,0.2)]">
                  <p className="text-3xl font-semibold tracking-[-0.03em]">
                    24/7
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Atendimento automático sem parar.
                  </p>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_60px_rgba(34,211,238,0.2)]">
                  <p className="text-3xl font-semibold tracking-[-0.03em]">
                    + Leads
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    Mais oportunidades vindas do seu site.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

              <div className="rounded-[32px] border border-white/10 bg-white/[0.055] p-5 shadow-[0_35px_100px_rgba(0,0,0,0.50)] backdrop-blur-2xl">
                <div className="mb-5 flex items-start justify-between">
                  <div>
                    <p className="text-sm text-white/50">Demonstração</p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      Assistente Zayntor
                    </h2>
                  </div>

                  <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                    Online
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/10 bg-[#0A1630]/85 p-4 shadow-inner">
                  <div className="space-y-4">
                    <div className="flex justify-start">
                      <div className="max-w-[78%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm leading-6 text-white/90">
                        Oi, vocês criam site também?
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-2xl rounded-br-md bg-cyan-400 px-4 py-3 text-sm leading-6 text-black shadow-[0_10px_25px_rgba(34,211,238,0.22)]">
                        Sim. Criamos seu site profissional e podemos integrar
                        atendimento inteligente para responder seus clientes.
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="max-w-[72%] rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 text-sm leading-6 text-white/90">
                        Quero site e automação.
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="max-w-[82%] rounded-2xl rounded-br-md bg-cyan-400 px-4 py-3 text-sm leading-6 text-black shadow-[0_10px_25px_rgba(34,211,238,0.22)]">
                        Perfeito. Posso te fazer 2 perguntas rápidas para te
                        indicar a melhor estrutura para seu negócio?
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm leading-6 text-white/45">
                  Site, WhatsApp e operação comercial em uma única estrutura.
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAIXA DE CONFIANÇA */}
      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <Reveal>
          <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              {trustItems.map((item) => (
                <div
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-4 py-2 text-sm text-white/70"
                >
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.7)]" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      {/* NÚMEROS DE CONFIANÇA */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.08}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 text-center shadow-[0_20px_80px_rgba(0,0,0,0.25)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20">
                <p className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-3xl font-semibold tracking-[-0.04em] text-transparent">
                  {item.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-white/60">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section className="mx-auto max-w-6xl px-6 py-20" id="solucoes">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.24em] text-cyan-300/70">
          Processo
        </p>

        <Reveal>
          <h2 className="mb-14 text-center text-3xl font-bold md:text-4xl">
            Como funciona
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.30)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <span className="text-sm font-semibold text-cyan-400">
                  {step.number}
                </span>

                <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section className="mx-auto max-w-5xl px-6 py-20 text-center md:py-20">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.24em] text-violet-300/70">
          Vantagens
        </p>

        <Reveal>
          <h2 className="mb-12 text-3xl font-bold md:text-4xl">
            O que você ganha com a Zayntor
          </h2>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-2">
          {benefits.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.30)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-cyan-400" />
                  <p className="text-sm text-white/80">{item}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section
        id="nichos"
        className="mx-auto max-w-7xl px-6 py-24 md:px-10"
      >
        <Reveal>
          <h2 className="mb-8 text-4xl font-semibold">Para quem é</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="flex flex-wrap gap-4">
            {niches.map((item) => (
              <div
                key={item}
                className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
              >
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-white/60">
            Esses são apenas alguns exemplos. A Zayntor se adapta a qualquer
            tipo de empresa que queira ter um site profissional e automatizar
            atendimento para aumentar vendas.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            Adaptável para qualquer tipo de negócio
          </div>
        </Reveal>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section id="planos" className="mx-auto max-w-7xl px-6 py-24 md:px-10">
        <Reveal>
          <h2 className="mb-3 text-4xl font-semibold tracking-[-0.04em]">
            Planos para empresas que querem vender mais
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mb-10 max-w-2xl text-white/60">
            Escolha a estrutura ideal para criar seu site, automatizar
            atendimento e transformar visitantes em clientes.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <div
                className={`relative rounded-[28px] border p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:scale-[1.015] ${
                  plan.featured
                    ? "border-cyan-400/50 bg-gradient-to-b from-cyan-400/12 to-violet-500/8 shadow-[0_0_50px_rgba(34,211,238,0.10)]"
                    : "border-white/10 bg-white/[0.045] hover:border-white/20"
                }`}
              >
                {plan.featured && (
                  <div className="absolute right-4 top-4 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-black">
                    Mais escolhido
                  </div>
                )}

                <p className="text-sm text-white/50">{plan.name}</p>

                <h3 className="mt-4 text-3xl font-semibold">{plan.price}</h3>

                <p className="mt-3 text-sm leading-7 text-white/60">
                  {plan.description}
                </p>

                <button
                  onClick={() => openWhatsApp(plan.whatsappMessage)}
                  className="mt-6 w-full rounded-xl bg-white py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
                >
                  Escolher plano
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      {/* FORMULÁRIO DE LEAD */}
      <section className="mx-auto max-w-5xl px-6 py-24" id="contato">
        <Reveal>
          <div className="overflow-hidden rounded-[36px] border border-white/10 bg-white/[0.04] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.30)] backdrop-blur-xl md:p-10">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-300/70">
                  Contato
                </p>

                <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">
                  Quero meu site com inteligência artificial
                </h2>

                <p className="mt-5 max-w-md leading-8 text-white/60">
                  Preencha abaixo e nossa equipe entra em contato para iniciar
                  seu projeto.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/70">
                    Resposta mais rápida e direcionada
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/70">
                    Site profissional + atendimento inteligente
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/70">
                    Estrutura pensada para negócios reais
                  </div>
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Seu nome
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={leadForm.name}
                    onChange={handleLeadInputChange}
                    placeholder="Ex: João Silva"
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1528] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/50"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={leadForm.whatsapp}
                    onChange={handleLeadInputChange}
                    placeholder="Ex: (11) 91234-5678"
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1528] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/50"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Tipo de negócio
                  </label>
                  <select
                    name="business"
                    value={leadForm.business}
                    onChange={handleLeadInputChange}
                    className="w-full rounded-2xl border border-white/10 bg-[#0B1528] px-4 py-4 text-white outline-none transition focus:border-cyan-400/50"
                    required
                  >
                    <option value="" className="bg-[#0B1528]">
                      Selecione
                    </option>
                    <option value="Clínica" className="bg-[#0B1528]">
                      Clínica
                    </option>
                    <option value="Estética" className="bg-[#0B1528]">
                      Estética
                    </option>
                    <option value="Restaurante" className="bg-[#0B1528]">
                      Restaurante
                    </option>
                    <option value="Advocacia" className="bg-[#0B1528]">
                      Advocacia
                    </option>
                    <option value="Imobiliária" className="bg-[#0B1528]">
                      Imobiliária
                    </option>
                    <option value="Academia" className="bg-[#0B1528]">
                      Academia
                    </option>
                    <option value="Outro" className="bg-[#0B1528]">
                      Outro
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/70">
                    Objetivo principal
                  </label>
                  <textarea
                    name="goal"
                    value={leadForm.goal}
                    onChange={handleLeadInputChange}
                    rows={5}
                    placeholder="Ex: Quero um site profissional com atendimento automatizado."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-[#0B1528] px-4 py-4 text-white outline-none transition placeholder:text-white/30 focus:border-cyan-400/50"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-6 py-4 font-medium text-black shadow-[0_12px_30px_rgba(34,211,238,0.22)] transition duration-300 hover:scale-[1.02] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Enviando..." : "Quero começar agora"}
                </button>

                {formMessage && (
                  <div
                    className={`rounded-2xl border px-4 py-3 text-sm ${
                      formStatus === "success"
                        ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                        : "border-red-400/20 bg-red-400/10 text-red-300"
                    }`}
                  >
                    {formMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      {/* PROVA SOCIAL */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.24em] text-cyan-300/70">
          Confiança
        </p>

        <Reveal>
          <h2 className="mx-auto mb-12 max-w-4xl text-center text-3xl font-bold md:text-4xl">
            Site profissional, atendimento inteligente e operação mais organizada
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {proofCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <div className="rounded-[24px] border border-white/10 bg-white/[0.045] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.30)] backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_0_40px_rgba(34,211,238,0.12)]">
                <div className="mb-4 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-300">
                  Resultado esperado
                </div>

                <h3 className="text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-white/60">
                  {card.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section className="mx-auto max-w-4xl px-6 py-24">
        <p className="mb-3 text-center text-sm uppercase tracking-[0.24em] text-cyan-300/70">
          FAQ
        </p>

        <Reveal>
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Perguntas frequentes
          </h2>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;

            return (
              <Reveal key={i} delay={i * 0.08}>
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.30)] backdrop-blur-md transition duration-300 hover:border-white/20">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left"
                  >
                    <span className="text-lg font-semibold text-white">
                      {faq.question}
                    </span>

                    <span
                      className={`ml-4 text-2xl leading-none text-cyan-300 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-0 text-sm leading-7 text-white/60">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />

      <section className="px-6 py-24 md:py-28">
        <Reveal>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-12 text-center shadow-[0_30px_100px_rgba(0,0,0,0.35)] md:p-14">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl opacity-60" />

            <div className="relative z-10">
              <h2 className="mx-auto mb-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white">
                Criamos seu site do zero e automatizamos seu atendimento no
                WhatsApp com um funcionário virtual que atende seus clientes 24h
              </h2>

              <p className="mx-auto mb-8 max-w-2xl leading-8 text-white/60">
                Tenha presença profissional, mais clientes entrando e
                atendimento funcionando todos os dias.
              </p>

              <button
                onClick={() =>
                  openWhatsApp(
                    "Olá! Quero começar agora com a Zayntor e ter um site profissional com atendimento automatizado no WhatsApp."
                  )
                }
                className="rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 px-10 py-4 font-medium text-black shadow-[0_12px_30px_rgba(34,211,238,0.22)] transition duration-300 hover:scale-[1.02] hover:opacity-95"
              >
                Quero meu site com IA
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mx-auto h-px max-w-6xl bg-white/5" />
    </main>
  );
}
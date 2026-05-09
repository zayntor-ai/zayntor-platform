"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [leadForm, setLeadForm] = useState({
    name: "",
    whatsapp: "",
    business: "",
    goal: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const whatsappNumber = "553197511487";
  const appsScriptUrl =
    "https://script.google.com/macros/s/AKfycbwuwbtCIHtyrMjMkGxh9lwssRcCfvrk3wiEO08GfjZuBAtOXrVg-5emXUBHTM1JaHKtgQ/exec";

  const openWhatsApp = (message: string) => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  const formatWhatsApp = (value: string) => {
    const numbers = value.replace(/\D/g, "").slice(0, 11);
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 7) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
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
    if (!leadForm.goal.trim()) {
      setFormStatus("error");
      setFormMessage("Selecione seu objetivo principal.");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new URLSearchParams();
      formData.append("name", leadForm.name);
      formData.append("whatsapp", leadForm.whatsapp);
      formData.append("business", leadForm.business);
      formData.append("goal", leadForm.goal);

      await fetch(appsScriptUrl, { method: "POST", body: formData });

      const whatsappMessage = `Olá! Quero uma demonstração da Zayntor.\n\nNome: ${leadForm.name || "-"}\nWhatsApp: ${leadForm.whatsapp || "-"}\nTipo de negócio: ${leadForm.business || "-"}\nObjetivo: ${leadForm.goal || "-"}`;

      setFormStatus("success");
      setFormMessage("Lead enviado com sucesso. Abrindo WhatsApp...");
      setLeadForm({ name: "", whatsapp: "", business: "", goal: "" });

      setTimeout(() => { openWhatsApp(whatsappMessage); }, 500);
    } catch (error) {
      setFormStatus("error");
      setFormMessage("Não foi possível enviar agora. Tente novamente em instantes.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const niches = ["Clínicas", "Estética", "Restaurantes", "Advogados", "Imobiliárias", "Academias"];

  const plans = [
    {
      name: "Site",
      price: "R$ 397",
      period: "/mês",
      description: "Site profissional completo · Design moderno e responsivo · Integração com WhatsApp · Manutenção inclusa · Suporte contínuo",
      featured: false,
      whatsappMessage: "Olá! Tenho interesse no plano Site da Zayntor (R$397/mês). Quero um site profissional com manutenção e suporte.",
    },
    {
      name: "IA",
      price: "R$ 397",
      period: "/mês",
      description: "Agente de IA de atendimento · Respostas automáticas inteligentes · Integração com WhatsApp · Atendimento 24h · Captação de leads",
      featured: false,
      whatsappMessage: "Olá! Tenho interesse no plano IA da Zayntor (R$397/mês). Quero um agente de inteligência artificial para automatizar meu atendimento.",
    },
    {
      name: "Pro",
      price: "R$ 597",
      period: "/mês",
      description: "Site profissional completo · Agente de IA de atendimento · Automação no WhatsApp · Captação de leads · Estrutura para vendas",
      featured: true,
      whatsappMessage: "Olá! Tenho interesse no plano Pro da Zayntor (R$597/mês). Quero site + IA + automação no WhatsApp.",
    },
    {
      name: "Business",
      price: "R$ 997",
      period: "/mês",
      description: "Tudo do Pro · IA avançada personalizada · Automações completas · Estratégia de conversão · Suporte prioritário",
      featured: false,
      whatsappMessage: "Olá! Tenho interesse no plano Business da Zayntor (R$997/mês). Quero a estrutura completa com IA avançada e suporte prioritário.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Você nos chama",
      description: "Explique seu negócio, seu objetivo e o que você quer melhorar no seu atendimento e na sua presença online.",
    },
    {
      number: "02",
      title: "Criamos seu site",
      description: "Desenvolvemos um site profissional, moderno e focado em conversão para apresentar sua empresa do jeito certo.",
    },
    {
      number: "03",
      title: "Ativamos a inteligência artificial",
      description: "Automatizamos seu atendimento, integramos com WhatsApp e organizamos seus leads para vender mais.",
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
      answer: "Não. A Zayntor pode atender diversos nichos e criar a estrutura ideal de site e automação para cada negócio.",
    },
    {
      question: "Vocês criam o site também?",
      answer: "Sim. Criamos seu site profissional completo e integramos inteligência artificial para automatizar seu atendimento e gerar mais clientes.",
    },
    {
      question: "Preciso já ter um site pronto?",
      answer: "Não. Se você ainda não tem site, nós criamos para você e já deixamos preparado para captar e atender clientes.",
    },
    {
      question: "Funciona no WhatsApp?",
      answer: "Sim. A estrutura é preparada para operar com atendimento inteligente em canais como WhatsApp.",
    },
    {
      question: "Já tenho um site, posso contratar só a IA?",
      answer: "Sim! Temos o plano IA exclusivo para quem já possui site e quer adicionar um agente de atendimento inteligente no WhatsApp.",
    },
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

  /* ─── TOKENS ─── */
  const C = {
    cream:  "#F7F3EE",
    cream2: "#EDE8E0",
    cream3: "#E2D9CF",
    sand:   "#C8BAA8",
    earth:  "#8C7B68",
    ebony:  "#1A1208",
    ebony2: "#2C2015",
    fire:   "#D4680A",
    fire2:  "#B85A08",
    white:  "#FFFFFF",
  } as const;

  return (
    <main style={{ background: C.cream, color: C.ebony, overflowX: "hidden" }}>

      {/* ── BOTÃO FLUTUANTE WHATSAPP ── */}
      <button
        onClick={() => openWhatsApp("Olá! Vim pelo site da Zayntor e quero saber mais sobre os serviços.")}
        aria-label="Falar no WhatsApp"
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 50,
          width: 56, height: 56, borderRadius: "50%",
          background: "#25D366", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 28px rgba(37,211,102,0.40)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 36px rgba(37,211,102,0.55)";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(37,211,102,0.40)";
        }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" style={{ width: 28, height: 28 }}>
          <path d="M16 0C7.164 0 0 7.163 0 16c0 2.822.736 5.469 2.027 7.773L0 32l8.437-2.01A15.93 15.93 0 0 0 16 32c8.836 0 16-7.163 16-16S24.836 0 16 0zm0 29.333a13.27 13.27 0 0 1-6.771-1.854l-.485-.287-5.01 1.194 1.258-4.874-.316-.5A13.243 13.243 0 0 1 2.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.27-9.77c-.398-.199-2.354-1.162-2.719-1.294-.365-.133-.631-.199-.897.199-.265.398-1.029 1.294-1.261 1.56-.232.266-.464.299-.863.1-.398-.2-1.683-.62-3.204-1.977-1.184-1.057-1.983-2.362-2.215-2.76-.232-.398-.025-.613.174-.811.179-.178.398-.464.597-.696.2-.232.266-.398.398-.664.133-.265.067-.498-.033-.697-.1-.198-.897-2.163-1.229-2.96-.324-.778-.652-.673-.897-.686l-.764-.013c-.265 0-.696.1-1.061.498-.365.398-1.394 1.362-1.394 3.322s1.427 3.853 1.626 4.119c.199.265 2.808 4.287 6.804 6.014.951.41 1.693.655 2.271.839.954.304 1.823.261 2.51.158.765-.114 2.354-.962 2.687-1.892.332-.93.332-1.727.232-1.893-.099-.165-.365-.265-.763-.464z" />
        </svg>
      </button>

      {/* ── HEADER ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, width: "100%", zIndex: 40,
        background: "rgba(247,243,238,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${C.cream3}`,
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 32px",
          height: 68,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: C.ebony,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 18, fontWeight: 800,
                color: C.cream,
                letterSpacing: "-0.06em",
              }}>Z</span>
            </div>
            <div>
              <p style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 16, fontWeight: 700,
                color: C.ebony, letterSpacing: "-0.04em",
                lineHeight: 1,
              }}>Zayntor</p>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10, color: C.earth,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginTop: 2,
              }}>Sites & IA para negócios</p>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ display: "flex", gap: 32 }}>
            {[["#solucoes","Soluções"],["#nichos","Nichos"],["#planos","Planos"],["#contato","Contato"]].map(([href, label]) => (
              <a key={href} href={href} style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14, color: C.earth,
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = C.ebony)}
              onMouseLeave={e => (e.currentTarget.style.color = C.earth)}
              >{label}</a>
            ))}
          </nav>

          <button
            onClick={() => openWhatsApp("Olá! Quero entender como a Zayntor pode criar meu site profissional e automatizar meu atendimento no WhatsApp.")}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13, fontWeight: 600,
              background: C.ebony, color: C.cream,
              border: "none", borderRadius: 8,
              padding: "10px 20px", cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.fire)}
            onMouseLeave={e => (e.currentTarget.style.background = C.ebony)}
          >
            Falar com especialista
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "140px 32px 80px",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        gap: 60,
        alignItems: "start",
      }}>
        <Reveal>
          <div>
            {/* Eyebrow */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              marginBottom: 28,
            }}>
              <span style={{ display: "inline-block", width: 28, height: 1, background: C.fire }} />
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, fontWeight: 500,
                letterSpacing: "0.22em", textTransform: "uppercase",
                color: C.fire,
              }}>Site profissional + IA de atendimento</span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(38px, 4.5vw, 60px)",
              fontWeight: 800,
              color: C.ebony,
              lineHeight: 1.06,
              letterSpacing: "-0.04em",
              marginBottom: 28,
            }}>
              Seu negócio com um site que vende e um{" "}
              <em style={{ fontStyle: "italic", color: C.fire }}>funcionário virtual</em>{" "}
              que atende seus clientes 24h
            </h1>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 17, lineHeight: 1.8,
              color: C.earth,
              maxWidth: 480, marginBottom: 16,
            }}>
              Criamos seu site profissional do zero e ativamos uma IA de atendimento no WhatsApp — para responder clientes, captar leads e vender todos os dias.
            </p>

            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14, lineHeight: 1.7,
              color: C.sand,
              maxWidth: 440, marginBottom: 40,
            }}>
              Ideal para empresas que querem presença online profissional, captar mais clientes e automatizar o atendimento sem complicação.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
              <button
                onClick={() => openWhatsApp("Olá! Quero um site profissional e automatizar meu atendimento no WhatsApp com IA.")}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 600,
                  background: C.fire, color: C.white,
                  border: "none", borderRadius: 10,
                  padding: "15px 28px", cursor: "pointer",
                  transition: "background 0.2s, transform 0.15s",
                  boxShadow: "0 6px 24px rgba(212,104,10,0.30)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.fire2; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.fire; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Quero meu site com IA
              </button>
              <a
                href="#solucoes"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, fontWeight: 500,
                  color: C.ebony,
                  border: `1.5px solid ${C.cream3}`,
                  borderRadius: 10,
                  padding: "14px 24px",
                  textDecoration: "none",
                  transition: "border-color 0.2s, background 0.2s",
                  background: "transparent",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.sand; e.currentTarget.style.background = C.cream2; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.cream3; e.currentTarget.style.background = "transparent"; }}
              >
                Ver soluções →
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, maxWidth: 480 }}>
              {[
                { val: "Site + IA", label: "Estrutura completa" },
                { val: "24/7", label: "Atendimento ativo" },
                { val: "+ Leads", label: "Mais conversão" },
              ].map((s) => (
                <div key={s.val} style={{
                  background: C.white,
                  border: `1px solid ${C.cream3}`,
                  borderRadius: 12, padding: "18px 16px",
                  boxShadow: "0 2px 12px rgba(26,18,8,0.05)",
                }}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 22, fontWeight: 700,
                    color: C.ebony, letterSpacing: "-0.03em",
                  }}>{s.val}</p>
                  <p style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 12, color: C.earth,
                    marginTop: 5, lineHeight: 1.4,
                  }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Chat Demo */}
        <Reveal delay={0.15}>
          <div style={{
            background: C.white,
            border: `1px solid ${C.cream3}`,
            borderRadius: 20,
            overflow: "hidden",
            boxShadow: "0 4px 40px rgba(26,18,8,0.09)",
          }}>
            <div style={{
              background: C.ebony, padding: "16px 20px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: C.earth, letterSpacing: "0.1em", textTransform: "uppercase" }}>Demonstração</p>
                <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 17, fontWeight: 700, color: C.cream, marginTop: 2 }}>Assistente Zayntor</p>
              </div>
              <div style={{
                fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500,
                color: "#5EBC6A",
                background: "rgba(94,188,106,0.12)",
                border: "1px solid rgba(94,188,106,0.22)",
                borderRadius: 100, padding: "3px 10px",
                display: "flex", alignItems: "center", gap: 5,
              }}>
                <span style={{ width: 6, height: 6, background: "#5EBC6A", borderRadius: "50%", display: "inline-block" }} />
                Online
              </div>
            </div>

            <div style={{ background: C.cream2, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ alignSelf: "flex-start", maxWidth: "78%" }}>
                <div style={{
                  background: C.white, border: `1px solid ${C.cream3}`,
                  borderRadius: "14px 14px 14px 4px",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.ebony, lineHeight: 1.55,
                }}>Oi, vocês criam site também?</div>
              </div>
              <div style={{ alignSelf: "flex-end", maxWidth: "82%" }}>
                <div style={{
                  background: C.fire,
                  borderRadius: "14px 14px 4px 14px",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.white, lineHeight: 1.55,
                }}>Sim! Criamos seu site profissional e podemos integrar atendimento inteligente para responder seus clientes.</div>
              </div>
              <div style={{ alignSelf: "flex-start", maxWidth: "72%" }}>
                <div style={{
                  background: C.white, border: `1px solid ${C.cream3}`,
                  borderRadius: "14px 14px 14px 4px",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.ebony, lineHeight: 1.55,
                }}>Quero site e automação.</div>
              </div>
              <div style={{ alignSelf: "flex-end", maxWidth: "82%" }}>
                <div style={{
                  background: C.fire,
                  borderRadius: "14px 14px 4px 14px",
                  padding: "10px 14px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.white, lineHeight: 1.55,
                }}>Perfeito. Me conta sobre seu negócio para eu indicar a melhor estrutura?</div>
              </div>
            </div>

            <div style={{
              padding: "14px 20px",
              fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: C.earth,
              borderTop: `1px solid ${C.cream3}`,
              background: C.white,
            }}>
              Site, WhatsApp e operação comercial em uma única estrutura.
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── FAIXA DE CONFIANÇA ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 32px" }}>
        <Reveal>
          <div style={{
            display: "flex", flexWrap: "wrap",
            alignItems: "center", justifyContent: "center", gap: 12,
          }}>
            {["Criação de sites profissionais", "IA de atendimento", "Integração com WhatsApp", "Automação comercial"].map((item) => (
              <div key={item} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: C.white,
                border: `1px solid ${C.cream3}`,
                borderRadius: 100, padding: "8px 18px",
                fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.earth,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.fire, display: "inline-block", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── COMO FUNCIONA ── */}
      <section id="solucoes" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>Processo</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 3vw, 40px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em",
            marginBottom: 48,
          }}>Como funciona</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08}>
              <div style={{
                background: C.white,
                border: `1px solid ${C.cream3}`,
                borderRadius: 16, padding: 28,
                boxShadow: "0 2px 16px rgba(26,18,8,0.05)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(26,18,8,0.09)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(26,18,8,0.05)"; }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 32, fontWeight: 800, color: C.cream3,
                  letterSpacing: "-0.05em", display: "block", marginBottom: 14,
                }}>{step.number}</span>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 20, fontWeight: 700, color: C.ebony,
                  letterSpacing: "-0.03em", marginBottom: 10,
                }}>{step.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, lineHeight: 1.75, color: C.earth,
                }}>{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── VANTAGENS ── */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 32px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, justifyContent: "center" }}>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>Vantagens</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em", marginBottom: 40,
          }}>O que você ganha com a Zayntor</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {benefits.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div style={{
                background: C.white,
                border: `1px solid ${C.cream3}`,
                borderRadius: 14, padding: "18px 22px",
                display: "flex", alignItems: "center", gap: 14,
                transition: "box-shadow 0.2s",
                textAlign: "left",
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,104,10,0.08)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: C.fire, flexShrink: 0 }} />
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: C.ebony }}>{item}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── NICHOS ── */}
      <section id="nichos" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>Segmentos</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em", marginBottom: 24,
          }}>Para quem é</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 24 }}>
            {niches.map((item) => (
              <div key={item} style={{
                background: C.white,
                border: `1px solid ${C.cream3}`,
                borderRadius: 8, padding: "10px 20px",
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, color: C.ebony,
                transition: "border-color 0.2s, background 0.2s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.fire; e.currentTarget.style.background = "#FFF7F0"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.cream3; e.currentTarget.style.background = C.white; }}
              >{item}</div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.earth, lineHeight: 1.75, maxWidth: 520 }}>
            Esses são apenas alguns exemplos. A Zayntor se adapta a qualquer tipo de empresa que queira ter um site profissional e automatizar atendimento para aumentar vendas.
          </p>
        </Reveal>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── PLANOS ── */}
      <section id="planos" style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>Investimento</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em", marginBottom: 10,
          }}>Planos para empresas que querem vender mais</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p style={{
            fontFamily: "'DM Sans', sans-serif", fontSize: 15,
            color: C.earth, lineHeight: 1.7, maxWidth: 520, marginBottom: 40,
          }}>
            Escolha a estrutura ideal para criar seu site, automatizar atendimento e transformar visitantes em clientes.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 0.08}>
              <div style={{
                position: "relative",
                background: plan.featured ? C.ebony : C.white,
                border: `1px solid ${plan.featured ? C.ebony : C.cream3}`,
                borderRadius: 18, padding: 24,
                display: "flex", flexDirection: "column",
                height: "100%",
                boxShadow: plan.featured ? "0 8px 40px rgba(26,18,8,0.14)" : "0 2px 12px rgba(26,18,8,0.05)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {plan.featured && (
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: C.fire, color: C.white,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 10, fontWeight: 700,
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    borderRadius: 6, padding: "3px 10px",
                  }}>Mais escolhido</div>
                )}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: "0.16em", textTransform: "uppercase",
                  color: plan.featured ? C.earth : C.earth,
                  marginBottom: 14,
                }}>{plan.name}</p>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 32, fontWeight: 800,
                  color: plan.featured ? C.cream : C.ebony,
                  letterSpacing: "-0.04em", lineHeight: 1,
                }}>
                  {plan.price}
                  <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, fontWeight: 400,
                    color: plan.featured ? C.earth : C.sand,
                  }}>{plan.period}</span>
                </h3>
                <div style={{ margin: "16px 0", flex: 1 }}>
                  {plan.description.split(" · ").map((line, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      marginBottom: 8,
                    }}>
                      <span style={{
                        width: 5, height: 5, borderRadius: "50%",
                        background: plan.featured ? C.fire : C.cream3,
                        flexShrink: 0, marginTop: 6,
                      }} />
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13, lineHeight: 1.5,
                        color: plan.featured ? "rgba(247,243,238,0.65)" : C.earth,
                      }}>{line}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => openWhatsApp(plan.whatsappMessage)}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13, fontWeight: 600,
                    background: plan.featured ? C.fire : "transparent",
                    color: plan.featured ? C.white : C.ebony,
                    border: plan.featured ? "none" : `1.5px solid ${C.cream3}`,
                    borderRadius: 10, padding: "12px",
                    width: "100%", cursor: "pointer",
                    transition: "background 0.2s",
                    marginTop: "auto",
                  }}
                  onMouseEnter={e => {
                    if (plan.featured) e.currentTarget.style.background = C.fire2;
                    else { e.currentTarget.style.background = C.cream2; e.currentTarget.style.borderColor = C.sand; }
                  }}
                  onMouseLeave={e => {
                    if (plan.featured) e.currentTarget.style.background = C.fire;
                    else { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = C.cream3; }
                  }}
                >
                  Escolher plano
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── FORMULÁRIO ── */}
      <section id="contato" style={{ maxWidth: 1000, margin: "0 auto", padding: "80px 32px" }}>
        <Reveal>
          <div style={{
            background: C.white,
            border: `1px solid ${C.cream3}`,
            borderRadius: 24, padding: "52px 48px",
            boxShadow: "0 4px 40px rgba(26,18,8,0.07)",
          }}>
            <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 52 }}>
              <div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                  color: C.fire, marginBottom: 14,
                }}>Contato</p>
                <h2 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 700,
                  color: C.ebony, letterSpacing: "-0.04em", marginBottom: 16,
                }}>Quero meu site com inteligência artificial</h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14, lineHeight: 1.75, color: C.earth, marginBottom: 32,
                }}>
                  Preencha abaixo e nossa equipe entra em contato para iniciar seu projeto.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["Resposta mais rápida e direcionada", "Site profissional + atendimento inteligente", "Estrutura pensada para negócios reais"].map((t) => (
                    <div key={t} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      background: C.cream, border: `1px solid ${C.cream3}`,
                      borderRadius: 10, padding: "12px 16px",
                    }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.fire, flexShrink: 0 }} />
                      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: C.earth }}>{t}</p>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleLeadSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                {[
                  { label: "Seu nome", name: "name", type: "text", placeholder: "Ex: João Silva", value: leadForm.name },
                  { label: "WhatsApp", name: "whatsapp", type: "text", placeholder: "Ex: (31) 91234-5678", value: leadForm.whatsapp },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={{
                      display: "block", marginBottom: 6,
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: C.ebony,
                    }}>{f.label}</label>
                    <input
                      type={f.type} name={f.name} value={f.value}
                      onChange={handleLeadInputChange}
                      placeholder={f.placeholder}
                      style={{
                        width: "100%", padding: "13px 16px",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.ebony,
                        background: C.cream, border: `1.5px solid ${C.cream3}`,
                        borderRadius: 10, outline: "none",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.fire)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.cream3)}
                    />
                  </div>
                ))}

                {[
                  {
                    label: "Tipo de negócio", name: "business", value: leadForm.business,
                    options: [
                      { value: "", label: "Selecione" },
                      { value: "Clínica", label: "Clínica" },
                      { value: "Estética", label: "Estética" },
                      { value: "Restaurante", label: "Restaurante" },
                      { value: "Advocacia", label: "Advocacia" },
                      { value: "Imobiliária", label: "Imobiliária" },
                      { value: "Academia", label: "Academia" },
                      { value: "Outro", label: "Outro" },
                    ],
                  },
                  {
                    label: "Objetivo principal", name: "goal", value: leadForm.goal,
                    options: [
                      { value: "", label: "Selecione seu objetivo" },
                      { value: "Quero site + IA de atendimento completo", label: "Quero site + IA de atendimento completo" },
                      { value: "Quero apenas um site profissional", label: "Quero apenas um site profissional" },
                      { value: "Já tenho site, quero apenas a IA de atendimento", label: "Já tenho site, quero apenas a IA de atendimento" },
                      { value: "Ainda não sei, quero entender melhor", label: "Ainda não sei, quero entender melhor" },
                    ],
                  },
                ].map((f) => (
                  <div key={f.name}>
                    <label style={{
                      display: "block", marginBottom: 6,
                      fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, color: C.ebony,
                    }}>{f.label}</label>
                    <select
                      name={f.name} value={f.value}
                      onChange={handleLeadInputChange}
                      style={{
                        width: "100%", padding: "13px 16px",
                        fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: C.ebony,
                        background: C.cream, border: `1.5px solid ${C.cream3}`,
                        borderRadius: 10, outline: "none",
                        transition: "border-color 0.2s",
                        appearance: "none",
                      }}
                      onFocus={e => (e.currentTarget.style.borderColor = C.fire)}
                      onBlur={e => (e.currentTarget.style.borderColor = C.cream3)}
                    >
                      {f.options.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                ))}

                <button
                  type="submit" disabled={isSubmitting}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 14, fontWeight: 600,
                    background: isSubmitting ? C.sand : C.fire,
                    color: C.white, border: "none",
                    borderRadius: 10, padding: "15px",
                    cursor: isSubmitting ? "not-allowed" : "pointer",
                    transition: "background 0.2s",
                    boxShadow: "0 4px 18px rgba(212,104,10,0.25)",
                  }}
                  onMouseEnter={e => { if (!isSubmitting) e.currentTarget.style.background = C.fire2; }}
                  onMouseLeave={e => { if (!isSubmitting) e.currentTarget.style.background = C.fire; }}
                >
                  {isSubmitting ? "Enviando..." : "Quero começar agora"}
                </button>

                {formMessage && (
                  <div style={{
                    padding: "12px 16px", borderRadius: 10,
                    fontFamily: "'DM Sans', sans-serif", fontSize: 13,
                    background: formStatus === "success" ? "rgba(94,188,106,0.1)" : "rgba(212,60,60,0.08)",
                    border: `1px solid ${formStatus === "success" ? "rgba(94,188,106,0.25)" : "rgba(212,60,60,0.2)"}`,
                    color: formStatus === "success" ? "#2D7D38" : "#A03030",
                  }}>
                    {formMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── PROVA SOCIAL ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, justifyContent: "center" }}>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>Resultados</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em", textAlign: "center",
            maxWidth: 600, margin: "0 auto 48px",
          }}>Site profissional, atendimento inteligente e operação mais organizada</h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {proofCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 0.08}>
              <div style={{
                background: C.white, border: `1px solid ${C.cream3}`,
                borderRadius: 16, padding: 28,
                boxShadow: "0 2px 16px rgba(26,18,8,0.05)",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,104,10,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(26,18,8,0.05)"; }}
              >
                <div style={{
                  display: "inline-flex", alignItems: "center",
                  background: "#FFF3E8", border: "1px solid rgba(212,104,10,0.18)",
                  borderRadius: 6, padding: "3px 10px",
                  fontFamily: "'DM Sans', sans-serif", fontSize: 10, fontWeight: 600,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: C.fire, marginBottom: 16,
                }}>Resultado esperado</div>
                <h3 style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 19, fontWeight: 700, color: C.ebony,
                  letterSpacing: "-0.03em", marginBottom: 12,
                }}>{card.title}</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13, lineHeight: 1.75, color: C.earth,
                }}>{card.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, justifyContent: "center" }}>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.earth }}>FAQ</span>
          <span style={{ flex: 1, height: 1, background: C.cream3 }} />
        </div>
        <Reveal>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(24px, 2.5vw, 36px)", fontWeight: 700,
            color: C.ebony, letterSpacing: "-0.04em",
            textAlign: "center", marginBottom: 40,
          }}>Perguntas frequentes</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <Reveal key={i} delay={i * 0.06}>
                <div style={{
                  background: C.white, border: `1px solid ${isOpen ? C.sand : C.cream3}`,
                  borderRadius: 14, overflow: "hidden",
                  transition: "border-color 0.2s",
                }}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      width: "100%", padding: "20px 24px",
                      background: "transparent", border: "none", cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 17, fontWeight: 700, color: C.ebony,
                      letterSpacing: "-0.02em",
                    }}>{faq.question}</span>
                    <span style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 22, color: C.fire, lineHeight: 1, flexShrink: 0, marginLeft: 16,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s",
                      display: "inline-block",
                    }}>+</span>
                  </button>
                  <div style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                    transition: "grid-template-rows 0.3s, opacity 0.25s",
                  }}>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14, lineHeight: 1.75, color: C.earth,
                        padding: "0 24px 20px",
                      }}>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ height: 1, background: C.cream3 }} />
      </div>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "80px 32px" }}>
        <Reveal>
          <div style={{
            maxWidth: 900, margin: "0 auto",
            background: C.ebony, borderRadius: 24,
            padding: "64px 52px",
            textAlign: "center",
            boxShadow: "0 8px 60px rgba(26,18,8,0.18)",
            position: "relative", overflow: "hidden",
          }}>
            {/* Subtle texture */}
            <div style={{
              position: "absolute", top: -80, right: -80,
              width: 280, height: 280,
              background: `radial-gradient(circle, rgba(212,104,10,0.18) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: -60, left: -60,
              width: 200, height: 200,
              background: `radial-gradient(circle, rgba(212,104,10,0.12) 0%, transparent 70%)`,
              pointerEvents: "none",
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase",
                color: C.fire, marginBottom: 20,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              }}>
                <span style={{ display: "inline-block", width: 24, height: 1, background: C.fire }} />
                Comece agora
                <span style={{ display: "inline-block", width: 24, height: 1, background: C.fire }} />
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(26px, 3vw, 42px)", fontWeight: 800,
                color: C.cream, letterSpacing: "-0.04em",
                maxWidth: 640, margin: "0 auto 20px", lineHeight: 1.1,
              }}>
                Criamos seu site do zero e automatizamos seu atendimento com um{" "}
                <em style={{ fontStyle: "italic", color: C.fire }}>funcionário virtual</em>{" "}
                que atende 24h
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15, color: C.earth, lineHeight: 1.75,
                maxWidth: 480, margin: "0 auto 36px",
              }}>
                Tenha presença profissional, mais clientes entrando e atendimento funcionando todos os dias.
              </p>
              <button
                onClick={() => openWhatsApp("Olá! Quero começar agora com a Zayntor e ter um site profissional com atendimento automatizado no WhatsApp.")}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15, fontWeight: 600,
                  background: C.fire, color: C.white,
                  border: "none", borderRadius: 12,
                  padding: "16px 36px", cursor: "pointer",
                  transition: "background 0.2s, transform 0.15s",
                  boxShadow: "0 6px 28px rgba(212,104,10,0.40)",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.fire2; e.currentTarget.style.transform = "translateY(-1px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = C.fire; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                Quero meu site com IA
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: `1px solid ${C.cream3}`,
        padding: "28px 32px",
        textAlign: "center",
      }}>
        <p style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12, color: C.sand,
        }}>
          © {new Date().getFullYear()} Zayntor · Tecnologia para empresas que querem crescer
        </p>
      </footer>

    </main>
  );
}

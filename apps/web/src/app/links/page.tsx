"use client";

export default function Links() {
  const whatsappUrl = "https://wa.me/5531975114875?text=Ol%C3%A1!%20Vim%20pelo%20Instagram%20da%20Zayntor%20e%20quero%20saber%20mais%20sobre%20os%20servi%C3%A7os.";

  const links = [
    {
      label: "Conheça nossos planos",
      sublabel: "Sites + IA a partir de R$397/mês",
      href: "https://zayntor.com/#planos",
      primary: false,
    },
    {
      label: "Falar no WhatsApp",
      sublabel: "Resposta rápida · Atendimento humano",
      href: whatsappUrl,
      primary: true,
    },
    {
      label: "Ver o site completo",
      sublabel: "zayntor.com",
      href: "https://zayntor.com",
      primary: false,
    },
  ];

  const C = {
    cream:  "#F7F3EE",
    cream2: "#EDE8E0",
    cream3: "#E2D9CF",
    earth:  "#8C7B68",
    ebony:  "#1A1208",
    fire:   "#D4680A",
    fire2:  "#B85A08",
    white:  "#FFFFFF",
  } as const;

  return (
    <main style={{
      minHeight: "100vh",
      background: C.ebony,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      {/* Glow de fundo */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        background: "radial-gradient(ellipse at 20% 50%, rgba(212,104,10,0.12) 0%, transparent 60%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{
        position: "relative", zIndex: 1,
        width: "100%", maxWidth: 440,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 0,
      }}>

        {/* Logo */}
        <div style={{ marginBottom: 8 }}>
          <svg width="72" height="72" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 14 H18 L34 38 H48" stroke="#F7F3EE" strokeWidth="1.2" strokeLinecap="round" opacity="0.1" fill="none"/>
            <path d="M8 13 H40"     stroke="#D4680A" strokeWidth="3.4" strokeLinecap="round" fill="none"/>
            <path d="M40 13 L12 39" stroke="#D4680A" strokeWidth="3.4" strokeLinecap="round" fill="none"/>
            <path d="M12 39 H44"    stroke="#D4680A" strokeWidth="3.4" strokeLinecap="round" fill="none"/>
            <rect x="5"  y="10" width="6" height="6" rx="1.5" fill="#F7F3EE" opacity="0.9"/>
            <rect x="41" y="10" width="6" height="6" rx="1.5" fill="#F7F3EE" opacity="0.4"/>
            <rect x="9"  y="36" width="6" height="6" rx="1.5" fill="#F7F3EE" opacity="0.4"/>
            <rect x="41" y="36" width="6" height="6" rx="1.5" fill="#F7F3EE" opacity="0.9"/>
            <path d="M17 26 Q26 17 35 26 Q26 35 17 26 Z" fill="none" stroke="#F7F3EE" strokeWidth="1.5" opacity="0.85"/>
            <line x1="22" y1="20.5" x2="21" y2="18.5" stroke="#F7F3EE" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <line x1="26" y1="19"   x2="26" y2="17"   stroke="#F7F3EE" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <line x1="30" y1="20.5" x2="31" y2="18.5" stroke="#F7F3EE" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
            <circle cx="26" cy="26" r="5.5" fill="none" stroke="#D4680A" strokeWidth="1.6"/>
            <circle cx="26" cy="26" r="3"   fill="none" stroke="#D4680A" strokeWidth="0.9" opacity="0.5"/>
            <circle cx="26" cy="26" r="1.8" fill="#D4680A"/>
            <circle cx="28" cy="24" r="0.8" fill="#F7F3EE" opacity="0.7"/>
          </svg>
        </div>

        {/* Nome */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 28, fontWeight: 700,
          color: C.cream, letterSpacing: "-0.04em",
          margin: "0 0 6px",
        }}>Zayntor</h1>

        {/* Tagline */}
        <p style={{
          fontSize: 13, color: C.earth,
          letterSpacing: "0.16em", textTransform: "uppercase",
          margin: "0 0 36px",
        }}>Sites & IA para negócios</p>

        {/* Links */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 22px",
                borderRadius: 14,
                background: link.primary ? C.fire : "rgba(247,243,238,0.05)",
                border: link.primary ? "none" : "1px solid rgba(247,243,238,0.1)",
                textDecoration: "none",
                transition: "transform 0.15s, background 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                if (!link.primary) e.currentTarget.style.background = "rgba(247,243,238,0.09)";
                else e.currentTarget.style.background = C.fire2;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "translateY(0)";
                if (!link.primary) e.currentTarget.style.background = "rgba(247,243,238,0.05)";
                else e.currentTarget.style.background = C.fire;
              }}
            >
              <div>
                <p style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 16, fontWeight: 700,
                  color: link.primary ? C.white : C.cream,
                  letterSpacing: "-0.02em",
                  margin: 0, lineHeight: 1.2,
                }}>{link.label}</p>
                <p style={{
                  fontSize: 12, color: link.primary ? "rgba(255,255,255,0.7)" : C.earth,
                  margin: "4px 0 0", lineHeight: 1,
                }}>{link.sublabel}</p>
              </div>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9 H14 M10 5 L14 9 L10 13" stroke={link.primary ? C.white : C.earth} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          ))}
        </div>

        {/* Rodapé */}
        <p style={{
          fontSize: 11, color: "rgba(140,123,104,0.5)",
          marginTop: 36, letterSpacing: "0.08em",
        }}>© {new Date().getFullYear()} Zayntor</p>

      </div>
    </main>
  );
}

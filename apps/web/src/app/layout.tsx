import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zayntor | Sites profissionais com inteligência artificial",
  description:
    "A Zayntor cria sites profissionais e integra inteligência artificial para automatizar atendimento, captar leads e ajudar empresas a vender mais.",
  keywords: [
    "site profissional",
    "criação de sites",
    "inteligência artificial",
    "automação de atendimento",
    "site com IA",
    "WhatsApp com IA",
    "landing page",
    "captação de leads",
    "Zayntor",
  ],
  authors: [{ name: "Zayntor" }],
  creator: "Zayntor",
  publisher: "Zayntor",
  metadataBase: new URL("https://zayntor.com"),
  openGraph: {
    title: "Zayntor | Sites profissionais com inteligência artificial",
    description:
      "Criamos seu site profissional e integramos IA para automatizar atendimento, organizar leads e acelerar vendas.",
    url: "https://zayntor.com",
    siteName: "Zayntor",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zayntor | Sites profissionais com inteligência artificial",
    description:
      "Criamos sites profissionais e automatizamos atendimento com IA para empresas venderem mais.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <head>
        <meta name="theme-color" content="#F7F3EE" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta name="msapplication-TileImage" content="/favicon.svg" />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DN64Y329DX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DN64Y329DX');
          `}
        </Script>
      </head>

      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

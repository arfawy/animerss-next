import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// 1. CONFIGURATION MOBILE (Viewport)
// En Next.js 16, c'est séparé des metadata pour l'optimisation
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Empêche le zoom "pincement" (sensation app native)
  themeColor: "#111827", // La couleur de la barre de statut Android (gris foncé)
};

// 2. METADONNÉES PWA & SEO
export const metadata: Metadata = {
  title: "Nyaa RSS",
  description: "Gestionnaire de flux RSS Anime personnel",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon-100.png", // Favicon standard
    apple: "/icon-100.png", // Icône pour iPhone
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nyaa RSS",
  },
  applicationName: "Nyaa RSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        {/* On peut ajouter ici un composant <Navbar /> global plus tard */}
        {children}
      </body>
    </html>
  );
}
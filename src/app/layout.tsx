import Menu from "@/components/Menu/Menu";
import { Dosis } from "next/font/google";
import styles from "./layout.module.css";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

const inter = Dosis({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simulador Must",
  description: "Simulador do Must desenvolvido pela equipe de Estudos de Mercado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <header className={styles.header}>
          <Link href="/">
            <img
              className={styles.imageIcon}
              src="./favicon.ico"
            />
            <p className={styles.iconName}>
              edp
            </p>
          </Link>
          <div className={styles.info}>
            <Menu/>
          </div>
          <p className={styles.info}>
            Info
          </p>
        </header>
        {children}
      </body>
    </html>
  );
}

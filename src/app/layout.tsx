import { getTarifaPath } from "@/components/pages/tarifa/TarifaPath";
import Menu from "@/components/Menu/Menu";
import { Dosis } from "next/font/google";
import styles from "./layout.module.css";
import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
          <Link href={getTarifaPath("Todas", "Todos", "Todos", "Todos")}>
            <p className={styles.info}>
              Tarifa
            </p>
          </Link>         
          <Link href="/">
            <p className={styles.info}>
              Home
            </p>
          </Link>
        </header>
        {children}
      </body>
    </html>
  );
}

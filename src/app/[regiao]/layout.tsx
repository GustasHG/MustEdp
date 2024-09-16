import style from "./layout.module.css";
import { Region } from "@/types/Region";
import Link from "next/link";

export default function Layout(
    {
        params,
        children
    }: { params: { regiao: Region }, children: React.ReactNode }
) {
    return (
        <>
            <section className={style.HeaderContainer} id="header-container">
                <div className={style.HeaderContent}>
                    <Link
                        className={style.Link}
                        href={`/${params.regiao.toLowerCase()}?cenario=Escolha%20um%20Cenario&ponto=Todos&posto=Todos&ano=Todos&penalidade=Todas&contrato=Escolha%20um%20Cenario`}
                        // style={{ textDecoration: !(url.includes("/resumo")) ? "underline" : "none" }}
                    >
                        Custos
                    </Link>

                    <Link
                        className={style.Link}
                        href={`/${params.regiao.toLowerCase()}/resumo?demanda=Escolha um Cenario&contrato=Escolha um Cenario`}
                        // style={{ textDecoration: !(url.includes("/resumo")) ? "none" : "underline" }}
                    >
                        Resumo
                    </Link>
                </div>
            </section>
            {children}
        </>
    );
}

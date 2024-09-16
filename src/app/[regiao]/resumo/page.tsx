import { ParcelaABAdapter } from "@/api/SimuladorAdapter/ParcelaABAdapter/ParcelaABAdapter";
import MonthlyChartSection from "@/components/pages/regiao/resumo/MonthlyChartSection";
import SummaryChartSection from "@/components/pages/regiao/resumo/SummaryChartSection";
import SummaryTableSection from "@/components/pages/regiao/resumo/SummaryTableSection";
import { SummaryAdapter } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryAdapter";
import Filter from "@/components/pages/regiao/resumo/Filter";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { Region } from "@/types/Region";
import styles from "./page.module.css";

const contratos = [
    'ArquivoMust',
    'Conservador',
    'Conservador_2',
    'Extremo',
    'Orçado',
    'R07',
];

export default async function Page(
    context: {
        params: { regiao: Region },
        searchParams: { demanda: string, contrato: string }
    }
) {
    const { regiao } = context.params;
    const { demanda, contrato } = context.searchParams;
    const adapter = new ApiAdapter();
    const summaryAdapter = new SummaryAdapter(adapter);
    const parcelaAbAdapter = new ParcelaABAdapter(adapter);
    
    const data = await summaryAdapter.get({
        Empresa: regiao,
        TipoContrato: contrato,
        TipoDemanda: demanda
    });

    const parcelaAb = await parcelaAbAdapter.get({
        Empresa: regiao,
        TipoContrato: contrato,
        TipoDemanda: demanda
    });

    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
                <section className={styles.section} style={{ marginTop: "5px" }}>
                    <Filter contratos={contratos} />
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <SummaryChartSection data={data}/>
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <SummaryTableSection data={data}/>
                </section>
                <section className={styles.section} style={{ marginBottom: "20px", marginTop: "10px" }}>
                    <MonthlyChartSection data={parcelaAb}/>
                </section>
            </section>
        </main>
    );
}
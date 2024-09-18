import { ParcelaABAdapter } from "@/api/SimuladorAdapter/ParcelaABAdapter/ParcelaABAdapter";
import MonthlyChartSection from "@/components/pages/regiao/resumo/MonthlyChartSection";
import SummaryChartSection from "@/components/pages/regiao/resumo/SummaryChartSection";
import SummaryTableSection from "@/components/pages/regiao/resumo/SummaryTableSection";
import { SummaryAdapter } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryAdapter";
import { CicloAdapter } from "@/api/SimuladorAdapter/CicloAdapter/CicloAdapter";
import Filter from "@/components/pages/regiao/resumo/Filter";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { Region } from "@/types/Region";
import styles from "./page.module.css";
import { SummaryData } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryData";

const contratos = [
    'ArquivoMust',
    'Conservador',
    'Conservador_2',
    'Extremo',
    'Orçado',
    'R07',
    'R08',
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
    const cicloAdapter = new CicloAdapter(adapter);

    const payload = {
        Empresa: regiao,
        TipoContrato: contrato,
        TipoDemanda: demanda
    }
    
    const data = await summaryAdapter.get(payload);
    const parcelaAb = await parcelaAbAdapter.get(payload);
    const ciclo = await cicloAdapter.get(payload);

    const getTableData = (): SummaryData[] => {
        const cicloData: SummaryData[] = [];

        ciclo.forEach(
            (value) => cicloData.push({
                ...value,
                Ano: value.Ciclo,
                Contrato: 0,
                Eust: 0
            })
        );

        return [
            ...cicloData,
            ...data.filter(
                (value) => value.Ano >= 2023
            )
        ];
    }

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
                    <SummaryTableSection data={getTableData()}/>
                </section>
                <section className={styles.section} style={{ marginBottom: "20px", marginTop: "10px" }}>
                    <MonthlyChartSection data={parcelaAb}/>
                </section>
            </section>
        </main>
    );
}
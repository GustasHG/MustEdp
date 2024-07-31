import PenalidadeChartSection from "@/components/pages/regiao/PenalidadeChartSection";
import DemandaChartSection from "@/components/pages/regiao/DemandaChartSection";
import { ContractAdapter } from "@/api/ContractAdapter/ContractAdapter";
import { Contract } from "@/api/ContractAdapter/Contract";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import Filter from "@/components/pages/regiao/Filter";
import Card from "@/components/pages/regiao/Card";
import { Region } from "@/types/Region";
import styles from "./page.module.css";

export default async function Page(
    context: {
        params: { regiao: Region },
        searchParams: { cenario: string, ponto: string, posto: string, ano: string, penalidade: string }
    }
) {
    const { regiao } = context.params;
    const { cenario, ponto, posto, ano } = context.searchParams;
    const adapter = new ApiAdapter();
    const contractAdapter = new ContractAdapter(adapter);
    
    let data = await contractAdapter.get(cenario, ponto, posto, ano, regiao);
    data = data.filter((value: Contract) => value.TipoDemanda === cenario);
    if (ponto !== 'Todos') {
        data = data.filter((value: Contract) => value.Ponto === ponto);
    }
    if (posto !== 'Todos') {
        data = data.filter((value: Contract) => value.Posto === posto);
    }
    if (ano !== 'Todos') {
        data = data.filter((value: Contract) => value.Data.slice(0, 4) === ano);
    }
    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
                <section className={styles.section} style={{ marginTop: "5px" }}>
                    <Filter />
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <Card title="Pontos" value="50"/>
                    <Card title="Pontos" value="50" style={{ marginLeft: "10px" }}/>
                    <Card title="Pontos" value="50" style={{ marginLeft: "10px" }}/>
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <PenalidadeChartSection data={data}/>
                </section>
                <section className={styles.section} style={{ marginBottom: "10px", marginTop: "10px" }}>
                    <DemandaChartSection data={data}/>
                </section>
            </section>
        </main>
    );
}
import Filter from "@/components/pages/regiao/Filter";
import styles from "./page.module.css";
import Card from "@/components/pages/regiao/Card";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { ContractAdapter } from "@/api/ContractAdapter/ContractAdapter";
import { Region } from "@/types/Region";
import PenalidadeBarChart from "@/components/pages/regiao/BarChart";


export default async function Page(
    context: { params: { regiao: Region }, searchParams: { cenario: string, ponto: string, posto: string } }
) {
    const { regiao } = context.params;
    const { cenario, ponto, posto } = context.searchParams;
    const adapter = new ApiAdapter();
    const contractAdapter = new ContractAdapter(adapter);

    const data = await contractAdapter.get(cenario, regiao);
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
                <section className={styles.section} style={{ marginBottom: "10px", marginTop: "10px" }}>
                    <div className={styles.chartContainer}>
                        <PenalidadeBarChart data={data} />
                    </div>
                </section>
            </section>
        </main>
    );
}
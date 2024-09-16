import Filter from "@/components/pages/regiao/resumo/Filter";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { Region } from "@/types/Region";
import styles from "./page.module.css";


export default async function Page(
    context: {
        params: { regiao: Region }
    }
) {
    const { regiao } = context.params;
    const adapter = new ApiAdapter();
    
    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
                <section className={styles.section} style={{ marginTop: "5px" }}>
                    <Filter />
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    {/* <PenalidadeChartSection pizzaChartData={getPizzaChartData()} barChartData={getBarChartData()} /> */}
                </section>
            </section>
        </main>
    );
}
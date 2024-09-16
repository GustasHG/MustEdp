import { ParcelaAB } from "@/api/SimuladorAdapter/ParcelaABAdapter/ParcelaAB";
import styles from "./MonthlyChartSection.module.css";
import MonthlyChart from "./MonthlyChart";

interface MonthlyChartSectionProps {
    data: ParcelaAB[]
}

export default function MonthlyChartSection(
    {
        data
    }: MonthlyChartSectionProps
) {
    return (
        <>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    Gráfico Mensal
                </div>
                <div className={styles.chartContainer}>
                    <MonthlyChart data={data} />
                </div>
            </div>
        </>
    );
}
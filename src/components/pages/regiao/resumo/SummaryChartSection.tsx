import { SummaryData } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryData";
import styles from "./SummaryChartSection.module.css";
import SummaryChart from "./SummaryChart";

interface PenalidadeChartSectionProps {
    data: SummaryData[]
}

export default function SummaryChartSection(
    {
        data
    }: PenalidadeChartSectionProps
) {
    return (
        <>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    Gráfico de Resumo
                </div>
                <div className={styles.chartContainer}>
                    <SummaryChart data={data} />
                </div>
            </div>
        </>
    );
}
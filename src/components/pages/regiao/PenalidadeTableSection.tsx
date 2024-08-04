import styles from "./PenalidadeTableSection.module.css";
import { PenalidadeBarChartData } from "./BarChart";
import PenalidadeTable from "./PenalidadeTable";
import PenalidadeTable1 from "./PenalidadeTable1";

interface PenalidadeTableSectionProps {
    data: PenalidadeBarChartData[]
}

export default function PenalidadeTableSection(
    {
        data
    }: PenalidadeTableSectionProps
) {
    return (
        <>
            <div className={styles.tableBlankContainer}>
                <div className={styles.tableTitleContainer}>
                    Tabela de Penalidades
                </div>
                <div className={styles.tableContainer}>
                    <PenalidadeTable1 data={data} />
                </div>
            </div>
        </>
    );
}
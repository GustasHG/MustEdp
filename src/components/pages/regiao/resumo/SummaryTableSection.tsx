
import { SummaryData } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryData";
import styles from "./SummaryTableSection.module.css";
import SummaryTable from "./SummaryTable";

interface SummaryTableSectionProps {
    data: SummaryData[]
}

export default function SummaryTableSection(
    {
        data
    }: SummaryTableSectionProps
) {
    return (
        <>
            <div className={styles.tableBlankContainer}>
                <div className={styles.tableTitleContainer}>
                    Tabela de Resumo
                </div>
                <div className={styles.tableContainer}>
                    <SummaryTable data={data} />
                </div>
            </div>
        </>
    );
}
import { SummaryData } from "@/api/SimuladorAdapter/SummaryAdapter/SummaryData";
import styles from "./SummaryTable.module.css";
import { uuid } from "uuidv4";

export interface SummaryTableProps {
    data: SummaryData[];
}

const Cell = (
    {
        bold,
        color,
        children,
        key,
        style
    }: { bold?: boolean, color?: string, children?: React.ReactNode, key?: React.Key, style?: React.CSSProperties }
) => {
    return (
        <div className={styles.cell} key={key} style={style}>
            <p
                style={{
                    color: color,
                    fontWeight: bold ? "bold" : "normal",
                    marginTop: "9px"
                }}
            >
                {children}</p>
        </div>
    )
}

export default function SummaryTable(
    {
        data
    }: SummaryTableProps
) {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerContainer}>
                <Cell color="#fff" >
                    Contrato
                </Cell>
                <Cell color="#fff" >
                    Ciclo
                </Cell>
                {/* <Cell color="#fff" >
                    Total Contratado
                </Cell> */}
                {/* <Cell color="#fff" >
                    Eust
                </Cell> */}
                <Cell color="#fff" >
                    Parcela A
                </Cell>
                <Cell color="#fff" >
                    Parcela B
                </Cell>
                <Cell color="#fff" >
                    Penalidades
                </Cell>
                <Cell color="#fff" >
                    Total
                </Cell>
            </div>
            <div className={styles.bodyContainer}>
                {
                    data.map((value) => (
                        <div className={styles.rowContainer}>
                            <Cell bold={true} key={uuid()}>
                                {value.TipoContrato}
                            </Cell>
                            <Cell>
                                {value.Ano}
                            </Cell>
                            {/* <Cell>
                                {(value.Contrato || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Eust || 0).toFixed(2)}
                            </Cell> */}
                            <Cell>
                                {(value.ParcelaA || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.ParcelaB || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.CustoTotal || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Total || 0).toFixed(2)}
                            </Cell>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
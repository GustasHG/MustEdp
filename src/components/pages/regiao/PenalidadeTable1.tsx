import { PenalidadeBarChartData } from "./BarChart";
import styles from "./PenalidadeTable1.module.css";
import { uuid } from "uuidv4";

export interface PenalidadeTableProps {
    data: PenalidadeBarChartData[];
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

export default function PenalidadeTable1(
    {
        data
    }: PenalidadeTableProps
) {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerContainer}>
                <Cell color="#fff" >
                    Contrato
                </Cell>
                <Cell color="#fff" >
                    Total Contratado
                </Cell>
                <Cell color="#fff" >
                    Eust
                </Cell>
                <Cell color="#fff" >
                    Add
                </Cell>
                <Cell color="#fff" >
                    Piu
                </Cell>
                <Cell color="#fff" >
                    Pis
                </Cell>
                <Cell color="#fff" >
                    Total Penalidades
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
                                {(value.Contrato || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Eust || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Add || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Piu || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {(value.Pis || 0).toFixed(2)}
                            </Cell>
                            <Cell>
                                {((value.Eust || 0) + (value.Add || 0) + (value.Piu || 0) + (value.Pis || 0)).toFixed(2)}
                            </Cell>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
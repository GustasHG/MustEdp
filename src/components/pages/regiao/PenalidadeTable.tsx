import { PenalidadeBarChartData } from "./BarChart";
import styles from "./PenalidadeTable.module.css";
import { uuid } from "uuidv4";

export interface PenalidadeTableProps {
    data: PenalidadeBarChartData[];
}

const Cell = (
    {
        bold,
        children,
        key,
        style
    }: { bold?: boolean, children?: React.ReactNode, key?: React.Key, style?: React.CSSProperties }
) => {
    return (
        <div className={styles.cell} key={key} style={style}>
            <p style={{
                fontWeight: bold ? "bold" : "normal",
                marginTop: "7px"
            }}>{children}</p>
        </div>
    )
}

export default function PenalidadeTable(
    {
        data
    }: PenalidadeTableProps
) {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.headerContainer}>
                <Cell style={{ borderRight: "solid 2px black" }}>
                </Cell>
                <Cell bold={true}>
                    Total Contratado
                </Cell>
                <Cell bold={true}>
                    Eust
                </Cell>
                <Cell bold={true}>
                    Add
                </Cell>
                <Cell bold={true}>
                    Piu
                </Cell>
                <Cell bold={true}>
                    Pis
                </Cell>
                <Cell bold={true}>
                    Total Penalidades
                </Cell>
            </div>
            <div className={styles.bodyContainer}>
                {
                    data.map((value) => (
                        <div className={styles.rowContainer}>
                            <Cell bold={true} key={uuid()} style={{ borderRight: "solid 2px black" }}>
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
import styles from "./contrato-table-row.module.css";
import { DemandaName } from "./demanda-name";
import { ResultRow } from "./result-row";

interface ContratoTableRowProps {
    style?: React.CSSProperties
}

export const ContratoTableRow: React.FC<ContratoTableRowProps> = ({
    style
}) => {
    return (
        <div className={styles["container"]} style={style}>
            <div className={styles["field-container"]} style={{ marginLeft: "4%" }}>
                <p className={styles["contrato-otimo-field"]} style={{ color: "#3A6C72" }}>
                    <strong>Base</strong>
                </p>
            </div>

            <div className={styles["field-container"]}>
                <p className={styles["contrato-otimo-field"]}>
                    <strong>5.680 MW​</strong><br/>
                    Ponta: 2.834 MW​<br/>
                    Fora Ponta: 2.846 MW
                </p>
            </div>

            <div className={styles["field-container"]}>
                <DemandaName color="green" name="Base" />
                <DemandaName color="yellow" name="Conservador" />
                <DemandaName color="orange" name="Adverso" />
            </div>
            
            <div className={styles["result-container"]}>
                <ResultRow />
                <ResultRow />
                <ResultRow />
            </div>
        </div>
    );
}
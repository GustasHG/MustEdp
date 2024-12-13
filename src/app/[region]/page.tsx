import { ContratoTableRow } from "./component/contrato-table-row";
import { InformationField } from "./component/info-field";
import styles from "./page.module.css";


export default function RegionPage(
    {

    }
) {
    return (
        <main className={styles["main-container"]}>
            <div className={styles["header-container"]}>
                <h1 className={styles["main-title"]}>MUST 2025:</h1>
                <h2 className={styles["sub-title"]}> Resultados (EDP SP)</h2>
            </div>

            <div className={styles["contrato-orcado-container"]} style={{ marginTop: "20px" }}>
                <div className={styles["contrato-orcado-title"]}>
                    Orçado
                </div>
                <div className={styles["contrato-orcado-title"]} style={{ color: "#000", marginLeft: "6.8%" }}>
                    6.128 MW​
                </div>
                <InformationField title="TOTAL" value="R$ 698,5 MM" style={{ float: "right", marginRight: "11%" }} />
                <InformationField title="PENALIDADES" value="R$ 21,1 MM" style={{ float: "right", marginRight: "10px" }} />
                <InformationField title="EUST" value="R$ 677,4 MM" style={{ float: "right", marginRight: "10px" }} />
            </div>
            <div className={styles["contrato-orcado-container"]}>
                <div className={styles["contrato-orcado-title"]}>
                    R02
                </div>
                <div className={styles["contrato-orcado-title"]} style={{ color: "#000", marginLeft: "6.8%" }}>
                    6.128 MW​
                </div>
                <InformationField title="TOTAL" value="R$ 701,5 MM" style={{ float: "right", marginRight: "11%" }} />
                <InformationField title="PENALIDADES" value="R$ 24,1 MM" style={{ float: "right", marginRight: "10px" }} />
                <InformationField title="EUST" value="R$ 677,4 MM" style={{ float: "right", marginRight: "10px" }} />
            </div>

            <div className={styles["table-container"]}>
                <div className={styles["table-header-container"]}>
                    <div className={styles["table-header-cell"]} style={{ marginLeft: "4%" }}>
                        Cenário de Demanda
                    </div>
                    <div className={styles["table-header-cell"]}>
                        Contrato Ótimo
                    </div>
                    <div className={styles["table-header-cell"]}>
                        Demandas
                    </div>
                    <div className={styles["table-header-cell"]} style={{ marginRight: "4%", width: "41%" }}>
                        Resultado Financeiro
                    </div>
                </div>
                <div className={styles["table-body"]}>
                    <ContratoTableRow />
                    <ContratoTableRow style={{ backgroundColor: "#fff" }} />
                    <ContratoTableRow />
                </div>
            </div>

            <div className={styles["header-container"]} style={{ marginTop: "20px" }}>
                <h1 className={styles["main-title"]}>Penalidades:</h1>
            </div>
        </main>
    );
}
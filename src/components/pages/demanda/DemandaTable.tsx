import styles from "./DemandaTable.module.css";
import { GrUpdate } from "react-icons/gr";

export default function DemandaTable() {
    return (
        <>
            <section className={styles.inputSection}>
                <button
                    className={styles.uploadButton}
                >
                    <GrUpdate style={{ fontSize: "11px", marginRight: "10px" }} /> Atualizar Dados
                </button>
            </section>
        </>
    );
}
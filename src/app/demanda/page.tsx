import FilterDemanda from "@/components/pages/demanda/Filter";
import UploadCsv from "@/components/pages/demanda/UploadCsv";
import { IoMdCloudDownload } from "react-icons/io";
import styles from "./page.module.css";

export default function Page(
    context: {
        searchParams: {  }
    }
) {
    return (
        <>
            <main className={styles.whiteBg}>
                <section className={styles.main}>
                    <p className={styles.region}>
                        ALTERAR DEMANDA
                        <IoMdCloudDownload className={styles.downloadIcon}/>
                    </p>
                    <p className={styles.subtitle}>ENVIAR CSV</p>
                    <section className={styles.section} style={{ marginTop: "5px" }}>
                        <UploadCsv />
                    </section>
                </section>
            </main>
            <main className={styles.bg}>
                <section className={styles.main}>
                    <p className={styles.subtitle}>BASE</p>
                    <section className={styles.section} style={{ marginBottom: "calc(100vh - 530px)", marginTop: "5px" }}>
                        <FilterDemanda/>
                    </section>
                </section>
                <section className={styles.main}>
                    <section className={styles.section} style={{ marginTop: "10px" }}>
                        {/* <TarifaTable/> */}
                    </section>
                </section>
            </main>
        </>
        
    );
}
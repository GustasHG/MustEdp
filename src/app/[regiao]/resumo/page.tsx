import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { Region } from "@/types/Region";
import styles from "./page.module.css";


export default async function Page(
    context: {
        params: { regiao: Region }
    }
) {
    const { regiao } = context.params;
    const adapter = new ApiAdapter();
    
    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
                
                <section className={styles.section}>
                    
                </section>
                
            </section>
        </main>
    );
}
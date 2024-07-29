import styles from "./page.module.css"

export default function Page(
    context: { params: { regiao: string } }
) {
    const { regiao } = context.params;
    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
            </section>
        </main>
    );
}
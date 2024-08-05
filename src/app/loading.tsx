import { AiOutlineLoading } from "react-icons/ai";
import styles from "./page.module.css";

export default function Loading() {
    return (
        <AiOutlineLoading className={styles.loading} />
    );
}
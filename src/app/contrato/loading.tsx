import styles from "./page.module.css";
import { AiOutlineLoading } from "react-icons/ai";

export default function Loading() {
    return (
        <AiOutlineLoading className={styles.loading} />
    );
}
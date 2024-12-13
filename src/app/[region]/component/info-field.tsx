import styles from "./info-field.module.css";

interface InformationFieldProps {
    style?: React.CSSProperties;
    title?: React.ReactNode;
    value?: React.ReactNode;
}

export const InformationField: React.FC<InformationFieldProps> = ({
    style,
    title,
    value
}) => {
    return (
        <div className={styles["container"]} style={style}>
            <div className={styles["bar"]}></div>
            <p className={styles["title"]}>
                {title}
            </p>

            <p className={`${styles["title"]} ${styles["value"]}`}>
                {value}
            </p>
        </div>
    );
}
import styles from "./Card.module.css";

interface CardProps {
    style?: React.CSSProperties
    title?: string
    value?: string
}

export default function Card(
    {
        style,
        title,
        value
    }: CardProps
) {
    return (
        <div className={styles.container} style={style}>
            <p className={styles.title}>{title}</p>
            <p className={styles.valor}>{value}</p>
        </div>
    );
}
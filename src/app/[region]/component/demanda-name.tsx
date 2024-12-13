import styles from "./demanda-name.module.css";

const Color = {
    green: "#48757A",
    yellow: "#E49230",
    orange: "#DF6A41", 
}

export interface DemandaNameProps {
    color?: keyof typeof Color
    name: string;
    style?: React.CSSProperties;
}

export const DemandaName: React.FC<DemandaNameProps> = ({
    color="green",
    name,
    style
}) => {
    return (
        <div className={styles["container"]} style={style}>
            <div className={styles["arrow-box"]}></div>

            <div className={styles["demanda-name-container"]} style={{ backgroundColor: Color[color] }}>
                <p>{name}</p>
            </div>
        </div>
    );
}
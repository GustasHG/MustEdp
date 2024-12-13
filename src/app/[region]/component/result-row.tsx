import { InformationField } from "./info-field";
import styles from "./result-row.module.css";


interface ResultRowProps {

}

export const ResultRow: React.FC<ResultRowProps> = ({

}) => {
    return (
        <div className={styles["container"]}>
            <InformationField title="EUST" value="R$ 653,5 MM​" style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="ADD" value="R$ 10,1 MM​" style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="PENALIDADES" value="R$ 5,5 MM​" style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
            <InformationField title="TOTAL" value="R$ 669,0 MM​" style={{ float: "left", height: "27px", marginLeft: "30px", width: "80px" }}/>
        </div>
    );
}
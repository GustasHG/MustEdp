"use client"
import { useParams, useSearchParams } from "next/navigation";
import { Contract } from "@/api/ContractAdapter/Contract";
import styles from "./DemandaChartSection.module.css";
import Dropdown from "@/components/Input/Dropdown";
import DemandaChart from "./DemandaChart";

interface DemandaChartSectionProps {
    data: Contract[]
    options: string[]
}

export default function DemandaChartSection(
    {
        data,
        options
    }: DemandaChartSectionProps
) {
    const params = useSearchParams();
    const { regiao } = useParams();
    
    const changeContratoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${value}`);
    }
    return (
        <>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    <p className={styles.titleText}>
                        Demanda (mW) x Penalidade (R$ Milhões) x Data
                    </p>
                    <Dropdown
                        title="Contrato"
                        defaultValue={params.get("contrato")}
                        onChange={changeContratoEventHandler}
                        options={options}
                        style={{ border: "solid 1px black", float: "right", marginRight: "32px" }}
                    />
                </div>
                <div className={styles.chartContainer}>
                    <DemandaChart data={data} />
                </div>
            </div>
        </>
    );
}
"use client"
import PenalidadeFilterChart, { PieChatData } from "./PenalidadeFilterChart";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PenalidadeBarChart, { PenalidadeBarChartData } from "./BarChart";
import styles from "./PenalidadeChartSection.module.css";

interface PenalidadeChartSectionProps {
    pizzaChartData: PieChatData[];
    barChartData: PenalidadeBarChartData[]
}

export default function PenalidadeChartSection(
    {
        pizzaChartData,
        barChartData
    }: PenalidadeChartSectionProps
) {
    const { regiao } = useParams();
    const params = useSearchParams();

    const changePenalidadeEventHandler = (data: any) => {
        if (data.name === params.get("penalidade")) {
            window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=Todas&contrato=${params.get("contrato")}`);
        }
        else {
            window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${data.name}&contrato=${params.get("contrato")}`);
        }
    }
    return (
        <>
            <div className={styles.blankLeftChartContainer}>
                <div className={styles.chartTitleContainer}>
                    Filtro de Penalidade
                </div>
                <div className={styles.chartContainer}>
                    <PenalidadeFilterChart data={pizzaChartData} onClick={changePenalidadeEventHandler} selected={params.get("penalidade")} />
                </div>
            </div>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    Penalidade por Cenário em milhões
                </div>
                <div className={styles.chartContainer}>
                    <PenalidadeBarChart data={barChartData} />
                </div>
            </div>
        </>
    );
}
"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import PenalidadeBarChart, { PenalidadeBarChartData } from "./BarChart";
import PenalidadeFilterChart from "./PenalidadeFilterChart";
import { Contract } from "@/api/ContractAdapter/Contract";
import styles from "./PenalidadeChartSection.module.css";

interface PenalidadeChartSectionProps {
    data: Contract[];
}

export default function PenalidadeChartSection(
    {
        data
    }: PenalidadeChartSectionProps
) {
    const { regiao } = useParams();
    const params = useSearchParams();
    const router = useRouter();

    const changePenalidadeEventHandler = (data: any) => {
        if (data.name === params.get("penalidade")) {
            router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=Todas&contrato=${params.get("contrato")}`);
        }
        else {
            router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${data.name}&contrato=${params.get("contrato")}`);
        }
    }

    const getChartData = () => {
        const fields = [
            { name: "Piu", value: 0, fill: "#6D32FF" },
            { name: "Pis", value: 0, fill: "#28FF52" },
            { name: "Add", value: 0, fill: "#7C9599" },
            { name: "Eust", value: 0, fill: "#212E3E" },
        ];

        data.forEach((value: Contract) => {
            fields[0].value += value.Piu;
            fields[1].value += value.Pis;
            fields[2].value += value.Add;
            fields[3].value += value.Eust;
        });
        return fields;
    }

    const getBarChartData = () => {
        const contractTypes: string[] = [];
        data.forEach((value: Contract) => {
            if (!contractTypes.includes(value.TipoContrato)) {
                contractTypes.push(value.TipoContrato)
            }
        });

        const result: PenalidadeBarChartData[] = [];
        let penalidade = params.get("penalidade") || "Todas";
        let defaultObject: Partial<Contract> = {  };

        if (params.get("penalidade") === "Todas") {
            defaultObject = { Piu: 0, Pis: 0, Add: 0, Eust: 0 };
        }
        else {
            defaultObject = {
                [penalidade]: 0
            };
        }

        contractTypes.forEach((contrato: string) => {
            const record: any = {
                TipoContrato: contrato,
                ...defaultObject
            };
            data.forEach((value: Contract) => {
                if (value.TipoContrato === contrato) {
                    const arr = Object.keys(defaultObject) as (keyof PenalidadeBarChartData)[];
                    arr.forEach((key: keyof Contract) => {
                        record[key] += value[key];
                    });
                }
            });
            result.push(record);
        });
        
        return result;
    }
    return (
        <>
            <div className={styles.blankLeftChartContainer}>
                <div className={styles.chartTitleContainer}>
                    Filtro de Penalidade
                </div>
                <div className={styles.chartContainer}>
                    <PenalidadeFilterChart data={getChartData()} onClick={changePenalidadeEventHandler} selected={params.get("penalidade")} />
                </div>
            </div>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    Penalidade por Cenário em milhões
                </div>
                <div className={styles.chartContainer}>
                    <PenalidadeBarChart data={getBarChartData()} />
                </div>
            </div>
        </>
    );
}
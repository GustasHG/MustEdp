"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Contract } from "@/api/ContractAdapter/Contract";
import styles from "./DemandaChartSection.module.css";
import Dropdown from "@/components/Input/Dropdown";
import DemandaChart from "./DemandaChart";

const options = [
    'Otimo',
    'Otimista',
    'Conservador',
    'Extremo',
]

interface DemandaChartSectionProps {
    data: Contract[]
}

interface DemandaChartData {
    Data: string;
    Demanda: number;
    Piu: number;
    Pis: number;
    Eust: number;
    Add: number;
}

export default function DemandaChartSection(
    {
        data
    }: DemandaChartSectionProps
) {
    const router = useRouter();
    const params = useSearchParams();
    const { regiao } = useParams();
    
    const setupData = (data: Contract[]) => {
        let filteredData = data.filter(
            (value: Contract) => value.TipoContrato === params.get("contrato")
        );
        let dateSet: string[] = [];
        filteredData.forEach((value: Contract) => {
            if (!dateSet.includes(value.Data)) {
                dateSet.push(value.Data);
            }
        });        
        dateSet = dateSet.sort(
            (a: string, b: string) => new Date(a) > new Date(b) ? 1 : -1
        );
        const finalData: DemandaChartData[] = [];
        dateSet.forEach((value: string) => {
            const data = {
                Data: value,
                Demanda: 0,
                Piu: 0,
                Pis: 0,
                Eust: 0,
                Add: 0,
            };
            filteredData.forEach((record: Contract) => {
                if (record.Data == value) {
                    data.Demanda += record.Demanda;
                    data.Piu += record.Piu;
                    data.Pis += record.Pis;
                    data.Eust += record.Eust;
                    data.Add += record.Add;
                }
            });
            finalData.push(data);
        });
        return finalData;
    }
    
    const changeContratoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${value}`);
    }
    return (
        <>
            <div className={styles.chartBlankContainer}>
                <div className={styles.chartTitleContainer}>
                    <p className={styles.titleText}>
                        Filtro de Penalidade
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
                    <DemandaChart data={setupData(data)} />
                </div>
            </div>
        </>
    );
}
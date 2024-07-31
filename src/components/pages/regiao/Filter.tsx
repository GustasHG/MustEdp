"use client"
import Dropdown from "@/components/Input/Dropdown";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const posto = [
    "Todos",
    "Ponta",
    "Fora Ponta"
];

const cenario = [
    "Otimista",
    "Conservador",
    "Extremo"
];

const ponto = [
    "Todos",
    "São José dos Campos"
];

const periodo = [
    "Todos",
    "2024",
    "2025",
    "2026",
    "2027"
]

export default function Filter() {
    const router = useRouter();
    const params = useSearchParams();
    const { regiao } = useParams();
    const changeCenarioEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${value}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }

    const changePontoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${value}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }

    const changePostoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${value}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }
    const changeAnoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${value}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }
    
    return (
        <>
            <Dropdown
                title="Demanda"
                defaultValue={params.get("cenario")}
                onChange={changeCenarioEventHandler}
                options={cenario}
            />
            <Dropdown
                title="Ponto"
                defaultValue={params.get("ponto")}
                onChange={changePontoEventHandler}
                options={ponto}
                style={{ marginLeft: "10px" }}
            />
            <Dropdown
                title="Posto"
                defaultValue={params.get("posto")}
                onChange={changePostoEventHandler}
                options={posto}
                style={{ marginLeft: "10px" }}
            />
            <Dropdown
                title="Período"
                defaultValue={params.get("ano")}
                onChange={changeAnoEventHandler}
                options={periodo}
                style={{ marginLeft: "10px" }}
            />
        </>
    );
}
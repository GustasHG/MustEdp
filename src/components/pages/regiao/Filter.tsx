"use client"
import { useParams, useSearchParams } from "next/navigation";
import Dropdown from "@/components/Input/Dropdown";

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

const periodo = [
    "Todos",
    "2024",
    "2025",
    "2026",
    "2027",
]

interface FilterProps {
    dateOptions: string[]
    pontos: string[]
}

export default function Filter(
    {
        dateOptions,
        pontos
    }: FilterProps
) {
    const params = useSearchParams();
    const { regiao } = useParams();
    const changeCenarioEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?cenario=${value}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }

    const changePontoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${value}&posto=${params.get("posto")}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }

    const changePostoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${value}&ano=${params.get("ano")}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
    }
    const changeAnoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${params.get("posto")}&ano=${value}&penalidade=${params.get("penalidade")}&contrato=${params.get("contrato")}`);
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
                options={pontos}
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
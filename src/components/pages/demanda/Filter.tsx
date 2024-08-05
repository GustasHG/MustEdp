"use client"
import Dropdown from "@/components/Input/Dropdown";
import { useSearchParams } from "next/navigation";
import { getDemandaPath } from "./DemandaPath";

const posto = [
    "Todas",
    "Ponta",
    "Fora Ponta"
];

const regiaoList = [
    "Todos",
    "SP",
    "ES"
];

const pontos = [
    "Todos"
]

const periodo = [
    "Todos",
    "2024",
    "2025",
    "2026",
    "2027",
]

interface FilterDemandaProps {
}

export default function FilterDemanda(
    {

    }: FilterDemandaProps
) {
    const params = useSearchParams();
    const changeRegiaoEventHandler = (value: string) => {
        window.location.replace(
            getDemandaPath(value, params.get("ponto"), params.get("posto"), params.get("ano"))
        );
    }

    const changePontoEventHandler = (value: string) => {
        window.location.replace(
            getDemandaPath(params.get("regiao"), value, params.get("posto"), params.get("ano"))
        );
    }

    const changePostoEventHandler = (value: string) => {
        window.location.replace(
            getDemandaPath(params.get("regiao"), params.get("ponto"), value, params.get("ano"))
        );
    }
    const changeAnoEventHandler = (value: string) => {
        window.location.replace(
            getDemandaPath(params.get("regiao"), params.get("ponto"), params.get("posto"), value)
        );
    }
    
    return (
        <>
            <Dropdown
                title="Região"
                defaultValue={params.get("regiao")}
                onChange={changeRegiaoEventHandler}
                options={regiaoList}
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
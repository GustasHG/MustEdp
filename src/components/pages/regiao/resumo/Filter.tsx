"use client"
import { useParams, useSearchParams } from "next/navigation";
import Dropdown from "@/components/Input/Dropdown";

const posto = [
    "Todos",
    "Ponta",
    "Fora Ponta"
];

const cenario = [
    "Base",
    "Conservador",
    "Conservador_2",
    "Extremo",
    "Arquivo_MUST",
];

const periodo = [
    "Todos",
    "2024",
    "2025",
    "2026",
    "2027",
]

interface FilterProps {
    // dateOptions: string[]
    // pontos: string[]
}

export default function Filter(
    {
        // dateOptions,
        // pontos
    }: FilterProps
) {
    const params = useSearchParams();
    const { regiao } = useParams();
    const changeDemandaEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?demanda=${value}&contrato=${params.get("contrato")}`);
    }


    const changeContratoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}?demanda=${params.get("cenario")}&contrato=${value}`);
    }
    
    return (
        <>
            <Dropdown
                title="Demanda"
                defaultValue={params.get("demanda")}
                onChange={changeDemandaEventHandler}
                options={cenario}
            />
            <Dropdown
                title="Contrato"
                defaultValue={params.get("contrato")}
                onChange={changeContratoEventHandler}
                options={posto}
                style={{ marginLeft: "10px" }}
            />
        </>
    );
}
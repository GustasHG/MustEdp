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
    contratos: string[]
    // pontos: string[]
}

export default function Filter(
    {
        contratos,
        // pontos
    }: FilterProps
) {
    const params = useSearchParams();
    const { regiao } = useParams();
    const changeDemandaEventHandler = (value: string) => {
        window.location.replace(`/${regiao}/resumo?demanda=${value}&contrato=${params.get("contrato")}`);
    }


    const changeContratoEventHandler = (value: string) => {
        window.location.replace(`/${regiao}/resumo?demanda=${params.get("demanda")}&contrato=${value}`);
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
                options={contratos}
                style={{ marginLeft: "10px" }}
            />
        </>
    );
}
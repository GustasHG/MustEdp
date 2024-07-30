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

export default function Filter() {
    const router = useRouter();
    const params = useSearchParams();
    const { regiao } = useParams();
    const changeCenarioEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${value}&ponto=${params.get("ponto")}&posto=${params.get("posto")}`);
    }

    const changePontoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${value}&posto=${params.get("posto")}`);
    }

    const changePostoEventHandler = (value: string) => {
        router.push(`/${regiao}?cenario=${params.get("cenario")}&ponto=${params.get("ponto")}&posto=${value}`);
    }
    return (
        <>
            <Dropdown
                title="Cenário"
                onChange={changeCenarioEventHandler}
                options={cenario}
            />
            <Dropdown
                title="Ponto"
                onChange={changePontoEventHandler}
                options={ponto}
                style={{ marginLeft: "10px" }}
            />
            <Dropdown
                title="Posto"
                onChange={changePostoEventHandler}
                options={posto}
                style={{ marginLeft: "10px" }}
            />
        </>
    );
}
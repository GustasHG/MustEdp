import { Contrato } from "../contrato/contrato.entity";
import { Ponto } from "../ponto/ponto.entity";
import { DataType } from "./data-type";
import { Posto } from "@/types/posto";

export interface Param {
    id: number;
    ponto: Ponto;
    posto: Posto;
    data: Date;
    tipoDado: DataType;
    cenario: string;
    valor: number;
    contrato: Contrato | null;
}
import { DataType } from "../data-type";
import { Posto } from "@/types/posto";

export interface CreateParamDto {
    ponto: string;
    posto: Posto;
    data: Date;
    tipoDado: DataType;
    cenario: string;
    valor: number;
}
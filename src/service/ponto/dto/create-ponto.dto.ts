import { Region } from "@/types/region";

export interface CreatePontoDto {
    id: string;
    nome: string;
    empresa: Region;
}
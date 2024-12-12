import { Region } from "@/types/region";

export interface Ponto {
    id: string;
    nome: string;
    empresa: Region;
    createdAt: Date;
}
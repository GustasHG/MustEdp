export const getDemandaPath = (
    regiao: string | null,
    ponto: string | null,
    posto: string | null,
    ano: string | null
) => {
    return `/demanda?regiao=${regiao}&ponto=${ponto}&posto=${posto}&ano=${ano}`;
}
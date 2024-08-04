export const getTarifaPath = (
    regiao: string | null,
    ponto: string | null,
    posto: string | null,
    ano: string | null
) => {
    return `/tarifa?regiao=${regiao}&ponto=${ponto}&posto=${posto}&ano=${ano}`;
}
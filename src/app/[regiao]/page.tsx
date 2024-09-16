import { DemandaChartAdapter, IDemandaChartAdapter } from "@/api/SimuladorAdapter/DemandaChartAdapter/DemandaChartAdapter";
import { CustosAdapter, ICustosAdapter } from "@/api/SimuladorAdapter/CustosAdapter/CustosAdapter";
import PenalidadeChartSection from "@/components/pages/regiao/PenalidadeChartSection";
import PenalidadeTableSection from "@/components/pages/regiao/PenalidadeTableSection";
import DemandaChartSection from "@/components/pages/regiao/DemandaChartSection";
import { CustosChart } from "@/api/SimuladorAdapter/CustosAdapter/CustosChart";
import { PenalidadeBarChartData } from "@/components/pages/regiao/BarChart";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import Filter from "@/components/pages/regiao/Filter";
import Card from "@/components/pages/regiao/Card";
import { Region } from "@/types/Region";
import styles from "./page.module.css";

export default async function Page(
    context: {
        params: { regiao: Region },
        searchParams: { cenario: string, ponto: string, posto: string, ano: string, penalidade: string, contrato: string }
    }
) {
    const { regiao } = context.params;
    const { cenario, ponto, posto, ano, penalidade, contrato } = context.searchParams;
    const adapter = new ApiAdapter();
    const custosAdapter: ICustosAdapter = new CustosAdapter(adapter);
    const demandaAdapter: IDemandaChartAdapter = new DemandaChartAdapter(adapter);
    
    let data = await custosAdapter.get({
        Ponto: ponto,
        Posto: posto,
        Ano: ano,
        Empresa: regiao.toUpperCase() as Region,
        TipoDemanda: cenario
    }, penalidade);
    const demandaData = await demandaAdapter.get({
        Ponto: ponto,
        Posto: posto,
        Ano: ano,
        Empresa: regiao.toUpperCase() as Region,
        TipoContrato: contrato,
        TipoDemanda: cenario
    });

    const getPizzaChartData = () => {
        const fields = [
            { name: "Piu", value: 5, fill: "#E32C2C" },
            { name: "Pis", value: 5, fill: "#28FF52" },
            { name: "Add", value: 5, fill: "#6D32FF" },
            { name: "Eust", value: 5, fill: "#212E3E" },
            { name: "Todas", value: 5, fill: "#222222" },
        ];
        return fields;
    }

    const getBarChartData = () => {
        const contractTypes: string[] = [];
        data.forEach((value: CustosChart) => {
            if (!contractTypes.includes(value.TipoContrato)) {
                contractTypes.push(value.TipoContrato)
            }
        });

        const result: PenalidadeBarChartData[] = [];
        let tempPenalidade = penalidade || "Todas";
        let defaultObject: Partial<CustosChart> = {  };

        if (penalidade === "Todas") {
            defaultObject = { Piu: 0, Pis: 0, Add: 0, Eust: 0, Contrato: 0 };
        }
        else {
            defaultObject = {
                [tempPenalidade]: 0
            };
        }


        contractTypes.forEach((contrato: string) => {
            let total: number = 0;
            let id = 0;
            if (contrato === 'Contrato Ótimo') {
                id = 1;
            }
            else if (contrato === 'Contrato Extremo') {
                id = 2;
            }
            const record: any = {
                TipoContrato: contrato,
                ...defaultObject,
                Id: id
            };
            data.forEach((value: CustosChart) => {
                if (value.TipoContrato === contrato) {
                    const arr = Object.keys(defaultObject) as (keyof PenalidadeBarChartData)[];
                    arr.forEach((key: keyof CustosChart) => {
                        if (key === 'Contrato') {
                            record[key] += (value[key] as number);    
                        }
                        else {
                            record[key] += (value[key] as number);
                            total += (value[key] as number);
                        }
                    });
                }
            });
            result.push({ ...record, Total: total});
        });
        result.sort((a, b) => {
            if (a.Id > b.Id) return 1;
            return -1;
        })
        return result;
    }

    const getDistinctPonto = () => {
        let pontos: string[] = [];
        data.forEach((value: CustosChart) => {
            if (!pontos.includes(value.Ponto)) {
                pontos.push(value.Ponto);
            }
        });
        pontos = pontos.sort((a, b) => {
            if (a > b) return 1;
            return -1;
        })
        return ["Todos", ...pontos];
    }

    const getDistinctDate = () => {
        const dateList = ["Todos"];
        console.log(data);
        data.forEach((value: CustosChart) => {
            if (!dateList.includes(value.Data.slice(0, 4))) {
                dateList.push(value.Data.slice(0, 4));
            }
        });
        return dateList;
    }

    const getDistinctContract = () => {
        const contractList: string[] = [];
        data.forEach((value: CustosChart) => {
            if (!contractList.includes(value.TipoContrato)) {
                contractList.push(value.TipoContrato);
            }
        });
        return contractList;
    }
    return (
        <main className={styles.bg}>
            <section className={styles.main}>
                <p className={styles.region}>EDP {regiao.toUpperCase()}</p>
                <section className={styles.section} style={{ marginTop: "5px" }}>
                    <Filter pontos={getDistinctPonto()} dateOptions={getDistinctDate()} />
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <Card title="Pontos" value="50"/>
                    <Card title="Pontos" value="50" style={{ marginLeft: "10px" }}/>
                    <Card title="Pontos" value="50" style={{ marginLeft: "10px" }}/>
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <PenalidadeChartSection pizzaChartData={getPizzaChartData()} barChartData={getBarChartData()} />
                </section>
                <section className={styles.section} style={{ marginTop: "10px" }}>
                    <PenalidadeTableSection data={getBarChartData()} />
                </section>
                <section className={styles.section} style={{ marginBottom: "10px", marginTop: "10px" }}>
                    <DemandaChartSection data={demandaData} options={getDistinctContract()}/>
                </section>
            </section>
        </main>
    );
}
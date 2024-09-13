import PenalidadeChartSection from "@/components/pages/regiao/PenalidadeChartSection";
import DemandaChartSection from "@/components/pages/regiao/DemandaChartSection";
import { PenalidadeBarChartData } from "@/components/pages/regiao/BarChart";
import { ContractAdapter } from "@/api/ContractAdapter/ContractAdapter";
import { Contract } from "@/api/ContractAdapter/Contract";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import Filter from "@/components/pages/regiao/Filter";
import Card from "@/components/pages/regiao/Card";
import { Region } from "@/types/Region";
import styles from "./page.module.css";
import PenalidadeTableSection from "@/components/pages/regiao/PenalidadeTableSection";

export default async function Page(
    context: {
        params: { regiao: Region },
        searchParams: { cenario: string, ponto: string, posto: string, ano: string, penalidade: string, contrato: string }
    }
) {
    const { regiao } = context.params;
    const { cenario, ponto, posto, ano, penalidade, contrato } = context.searchParams;
    const adapter = new ApiAdapter();
    const contractAdapter = new ContractAdapter(adapter);
    
    let data = await contractAdapter.get(cenario, ponto, posto, ano, regiao);
    const demandaData = await contractAdapter.getDemandaChartData(cenario, contrato, ponto, posto, ano, regiao);
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
        data.forEach((value: Contract) => {
            if (!contractTypes.includes(value.TipoContrato)) {
                contractTypes.push(value.TipoContrato)
            }
        });

        const result: PenalidadeBarChartData[] = [];
        let tempPenalidade = penalidade || "Todas";
        let defaultObject: Partial<Contract> = {  };

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
            data.forEach((value: Contract) => {
                if (value.TipoContrato === contrato) {
                    const arr = Object.keys(defaultObject) as (keyof PenalidadeBarChartData)[];
                    arr.forEach((key: keyof Contract) => {
                        if (key === 'Contrato') {
                            record[key] += (value[key] as number)/1000;    
                        }
                        else {
                            record[key] += (value[key] as number)/1000;
                            total += (value[key] as number)/1000;
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
        data.forEach((value: Contract) => {
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
        data.forEach((value: Contract) => {
            if (!dateList.includes(value.Data.slice(0, 4))) {
                dateList.push(value.Data.slice(0, 4));
            }
        });
        return dateList;
    }

    const getDistinctContract = () => {
        const contractList: string[] = [];
        data.forEach((value: Contract) => {
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
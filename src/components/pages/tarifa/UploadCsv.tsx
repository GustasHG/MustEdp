"use client"
import { CreateTarifaDto } from "@/api/TarifaAdapter/dto/CreateTarifaDto";
import { TarifaAdapter } from "@/api/TarifaAdapter/TarifaAdapter";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { MdOutlineFileUpload } from "react-icons/md";
import { PiTableFill } from "react-icons/pi";
import styles from "./UploadCsv.module.css";
import File from "@/components/Input/File";
import { RxUpdate } from "react-icons/rx";
import { useState } from "react";

export default function UploadCsv() {
    const [error, setError] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const adapter = new ApiAdapter();
    const tarifaAdapter = new TarifaAdapter(adapter);

    const changeEventHandler = (file: File | null) => {
        setFile(file);
    }

    const buttonClickHandler = async () => {
        setError("");
        setIsLoading(true);
        if (!file) {
            setError("Selecione um arquivo.");
        }
        else if (!file.name.endsWith(".csv")) {
            setError("O arquivo deve ser um .csv.");
        }
        else {
            let data = await parse(await file.text(), ",");
            data = data.filter((value) => value.Empresa);
            console.log(data);
            if (data) {
                const requiredColumns = [
                    "Ponto",
                    "Posto",
                    "Data",
                    "TarifaDrp",
                    "TarifaDra",
                    "Empresa",
                ];
                let error = "";
                const receivedColumns = Object.keys(data[0]);
                receivedColumns.forEach((element: string) => {
                    if (!requiredColumns.includes(element)) {
                        error = `${element} não deve estar no schema.`;
                    }
                });
                requiredColumns.forEach((column: string) => {
                    if (!receivedColumns.includes(column)) {
                        error = `${column} deve estar no schema.`;
                    }
                })
                if (!error) {
                    try {
                        await tarifaAdapter.deleteAll();
                        await tarifaAdapter.createMany({ payload: data });
                    }
                    catch(error: any) {
                        setError(error.message);
                    }
                }
                else {
                    setError(error);
                }
            }
            else {
                setError("Arquivo inválido.")
            }
        }
        setIsLoading(false);
    }

    const parse = async (content: string, separator: string): Promise<Record<string, string | null>[]> => {
        const lines = content.split("\n");
        if (lines) {
            const header = lines[0];
            const headerColumns = header.split(separator);
            const data = lines.slice(1);
            const arrayData: Record<string, string | null>[] = [];
            data.forEach((line: string) => {
                const lineColumns = line.split(separator);
                const rowObject: Record<string, string | null> = {};
                for (let columnIndex = 0; columnIndex < headerColumns.length; columnIndex++) {

                    let value: string | null = lineColumns[columnIndex];
                    if (["null", null].includes(value)) {
                        value = null;
                    }
                    rowObject[headerColumns[columnIndex]] = value;
                }
                arrayData.push(rowObject);
            });
            return arrayData;
        }
        return [];
    }
    return (
        <>
            <div className={styles.main}>
                <section className={styles.section}>
                    Para atualizar a base de tarifas, é necessário fazer o <strong>envio de um arquivo .csv</strong> com o seguinte template:
                </section>

                <section className={styles.section}>
                    <div className={styles.schema}>
                        <p className={styles.schemaLine}>
                            <PiTableFill className={styles.tableIcon}/>
                            <span style={{ color: "#666", marginLeft: 2 }}>tarifa</span>
                        </p>
                        <p className={styles.schemaLine}><span>Ponto:</span> string </p>
                        <p className={styles.schemaLine}><span>Posto:</span> string ("Ponta", "Fora Ponta") </p>
                        <p className={styles.schemaLine}><span>Data:</span> date </p>
                        <p className={styles.schemaLine}><span>Tarifa:</span> float </p>
                        <p className={styles.schemaLine} style={{ marginBottom: "5px" }}><span>Empresa:</span> string ("SP", "ES") </p>
                    </div>
                </section>
                
                <section className={styles.section}>
                    <strong>
                        Selecione o arquivo para atualizar a base de tarifas:
                    </strong>
                </section>

                <section className={styles.section}>
                    <File onChange={changeEventHandler}/>
                </section>

                <section className={styles.section} style={{ marginBottom: "30px" }}>
                    {
                        error && <p className={styles.error}>
                            [{error}]
                        </p>
                    }
                    <button className={styles.uploadButton} onClick={buttonClickHandler}>
                        {
                            isLoading ?
                            <RxUpdate className={`${styles.uploadButtonIcon} ${styles.uploadButtonLoadingIcon}`}/> :
                            <MdOutlineFileUpload className={styles.uploadButtonIcon}/>
                        } Enviar
                    </button>
                </section>
            </div>
        </>
    );
}
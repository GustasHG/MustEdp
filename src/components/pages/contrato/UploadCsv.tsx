"use client"
import { ContratoAdapter } from "@/api/ContratoAdapter/ContratoAdapter";
import { ExcelTemplateAdapter } from "@/Csv/ExcelTemplateAdapter";
import { ApiAdapter } from "@/api/ApiAdapter/ApiAdapter";
import { MdOutlineFileUpload } from "react-icons/md";
import { DataValidator } from "@/Csv/DataValidator";
import { PiTableFill } from "react-icons/pi";
import styles from "./UploadCsv.module.css";
import File from "@/components/Input/File";
import { RxUpdate } from "react-icons/rx";
import { CsvFactory } from "@/Csv/Csv";
import { Parser } from "@/Csv/IParser";
import { useState } from "react";

export default function UploadCsv() {
    const [error, setError] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const adapter = new ApiAdapter();
    const contratoAdapter = new ContratoAdapter(adapter);

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
            const csv = new CsvFactory().instance(await file.text(), ";", ",");
            let parser = new Parser();
            let data: Record<string, string>[] = csv.parse(parser);
            data = new ExcelTemplateAdapter().convert(
                data,
                ["Ponto", "Posto", "TipoContrato", "Empresa"],
                "Contrato"
            );
            data = data.filter((value) => value.Empresa && value.Contrato);
            if (data) {
                const validator = new DataValidator();
                const schema = [
                    "Ponto",
                    "Posto",
                    "Data",
                    "TipoContrato",
                    "Contrato",
                    "Empresa",
                ];

                try {
                    validator.validate(data, schema);
                    await contratoAdapter.deleteAll();
                    await contratoAdapter.createMany({ payload: data });
                }
                catch (error: any) {
                    setError(error.message);
                }
            }
            else {
                setError("Arquivo inválido.")
            }
        }
        setIsLoading(false);
    }

    // const buttonClickHandler = async () => {
    //     setError("");
    //     setIsLoading(true);
    //     if (!file) {
    //         setError("Selecione um arquivo.");
    //     }
    //     else if (!file.name.endsWith(".csv")) {
    //         setError("O arquivo deve ser um .csv.");
    //     }
    //     else {
    //         const data = await parse(await file.text(), ",");
    //         if (data) {
    //             const requiredColumns = [
    //                 "Ponto",
    //                 "Posto",
    //                 "Data",
    //                 "TipoContrato",
    //                 "Contrato",
    //                 "Empresa",
    //             ];
    //             let error = "";
    //             const receivedColumns = Object.keys(data[0]);
    //             receivedColumns.forEach((element: string) => {
    //                 if (!requiredColumns.includes(element)) {
    //                     error = `${element} não deve estar no schema.`;
    //                 }
    //             });
    //             requiredColumns.forEach((column: string) => {
    //                 if (!receivedColumns.includes(column)) {
    //                     error = `${column} deve estar no schema.`;
    //                 }
    //             })
    //             if (!error) {
    //                 try {
    //                     await contratoAdapter.deleteAll();
    //                     await contratoAdapter.createMany({ payload: data });
    //                 }
    //                 catch(error: any) {
    //                     setError(error.message);
    //                 }
    //             }
    //             else {
    //                 setError(error);
    //             }
    //         }
    //         else {
    //             setError("Arquivo inválido.")
    //         }
    //     }
    //     setIsLoading(false);
    // }

    return (
        <>
            <div className={styles.main}>
                <section className={styles.section}>
                    Para atualizar a base de contrato, é necessário fazer o <strong>envio de um arquivo .csv</strong> com o seguinte template:
                </section>

                <section className={styles.section}>
                    <div className={styles.schema}>
                        <p className={styles.schemaLine}>
                            <PiTableFill className={styles.tableIcon}/>
                            <span style={{ color: "#666", marginLeft: 2 }}>contrato</span>
                        </p>
                        <p className={styles.schemaLine}><span>Ponto:</span> string </p>
                        <p className={styles.schemaLine}><span>Posto:</span> string ("Ponta", "Fora Ponta") </p>
                        <p className={styles.schemaLine}><span>Data:</span> date </p>
                        <p className={styles.schemaLine}><span>TipoContrato:</span> string </p>
                        <p className={styles.schemaLine}><span>Contrato:</span> float </p>
                        <p className={styles.schemaLine} style={{ marginBottom: "5px" }}><span>Empresa:</span> string ("SP", "ES") </p>
                    </div>
                </section>
                
                <section className={styles.section}>
                    <strong>
                        Selecione o arquivo para atualizar a base de contrato:
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
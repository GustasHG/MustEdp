"use client"
import { ConfiabilidadeAdapter } from "@/api/ConfiabilidadeAdapter/ConfiabilidadeAdapter";
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
    const confiabilidadeAdapter = new ConfiabilidadeAdapter(adapter);

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
                ["Ponto", "Posto", "Empresa"],
                "Confiabilidade"
            );
            data = data.filter((value) => value.Empresa && value.Confiabilidade);
            if (data) {
                const validator = new DataValidator();
                const schema = [
                    "Ponto",
                    "Posto",
                    "Data",
                    "Confiabilidade",
                    "Empresa",
                ];

                try {
                    validator.validate(data, schema);
                    await confiabilidadeAdapter.deleteAll();
                    await confiabilidadeAdapter.createMany({ payload: data });
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

    return (
        <>
            <div className={styles.main}>
                <section className={styles.section}>
                    Para atualizar a base de confiabilidade, é necessário fazer o <strong>envio de um arquivo .csv</strong> com o seguinte template:
                </section>

                <section className={styles.section}>
                    <div className={styles.schema}>
                        <p className={styles.schemaLine}>
                            <PiTableFill className={styles.tableIcon}/>
                            <span style={{ color: "#666", marginLeft: 2 }}>confiabilidade</span>
                        </p>
                        <p className={styles.schemaLine}><span>Ponto:</span> string </p>
                        <p className={styles.schemaLine}><span>Posto:</span> string ("Ponta", "Fora Ponta") </p>
                        <p className={styles.schemaLine}><span>Data:</span> date </p>
                        <p className={styles.schemaLine}><span>Confiabilidade:</span> float </p>
                        <p className={styles.schemaLine} style={{ marginBottom: "5px" }}><span>Empresa:</span> string ("SP", "ES") </p>
                    </div>
                </section>
                
                <section className={styles.section}>
                    <strong>
                        Selecione o arquivo para atualizar a base de confiabilidade:
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
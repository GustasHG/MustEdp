import { IoCloudUploadOutline } from "react-icons/io5";
import { useState } from "react";
import styles from "./File.module.css";

export default function File() {
    const [isActive, setIsActive] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsActive(true);
    };

    const handleDragLeave = () => {
        setIsActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsActive(false);
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        console.log('Files:', files);
        // Process the files here
    };

    const handleClick = () => {
        if (document.getElementById('file-input')) {
            document.getElementById('file-input')?.click();
        }
    };
    return (
        <div
            className={`${styles.dropZone} ${isActive ? styles.active : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
        >
        <div className={styles.iconContainer}>
            <IoCloudUploadOutline className={styles.icon} />
        </div>
        <div className={styles.textContainer}>
            <p className={styles.title}>
                Envie sua base aqui
            </p>
            <p className={styles.subTitle}>
                extensão .csv
            </p>
        </div>
        <div className={styles.buttonContainer}>
            <button className={styles.button}>
                Procurar Arquivos
            </button>
        </div>
        <input
            type="file"
            id="file-input"
            className={styles.fileInput}
            multiple
            onChange={(e) => handleFiles(e.target.files)}
        />
        </div>
    );
}
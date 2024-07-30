"use client"
import { LiaFileContractSolid } from "react-icons/lia";
import { useEffect, useRef, useState } from "react";
import { RiMapPin2Line } from "react-icons/ri";
import { SlEnergy } from "react-icons/sl";
import { FaGear } from "react-icons/fa6";
import styles from "./Menu.module.css";



import Link from "next/link";

export default function Menu() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const iconClickHandler = () => {
        setIsActive(true);
    }

    const onClickOut = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            setIsActive(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", onClickOut);
        return () => document.removeEventListener("mousedown", onClickOut);
    }, []);
    return (
        <div>
            <FaGear
                className={styles.icon}
                style={{
                    transform: isActive ? "rotate(180deg)" : "rotate(0deg)"
                }}
                onClick={iconClickHandler}
            />
            <div
                className={styles.menuContainer}
                ref={ref}
                style={{
                    height: isActive ? "200px" : 0,
                    boxShadow: isActive ? "2px 2px 8px 4px #03030321" : "none"
                }}
            >
                {
                    isActive && <>
                        <div className={styles.headerContainer}>
                            {/* <FaGear className={styles.headerTitle} style={{ marginTop: "9px" }}/> */}
                            <p className={styles.headerTitle}>Configurações</p>
                        </div>
                        <LiaFileContractSolid className={styles.linkIcon}/>
                        <Link className={styles.link} href="/">Alterar Contratos</Link>
                        <SlEnergy className={styles.linkIcon}/>
                        <Link className={styles.link} href="/">Alterar Demanda</Link>
                        <RiMapPin2Line className={styles.linkIcon}/>
                        <Link className={styles.link} href="/sp?cenario=Otimista&ponto=Todos&posto=Todos">EDP SP</Link>
                        <RiMapPin2Line className={styles.linkIcon}/>
                        <Link className={styles.link} href="/es?cenario=Otimista&ponto=Todos&posto=Todos">EDP ES</Link>
                    </>
                }
            </div>
        </div>
    );
}
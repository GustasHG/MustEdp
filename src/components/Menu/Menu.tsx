"use client"
import { getConfiabilidadePath } from "../pages/confiabilidade/ConfiabilidadePath";
import { getContratoPath } from "../pages/contrato/ContratoPath";
import { getDemandaPath } from "../pages/demanda/DemandaPath";
import { getTarifaPath } from "../pages/tarifa/TarifaPath";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { LiaFileContractSolid } from "react-icons/lia";
import { useEffect, useRef, useState } from "react";
import { RiMapPin2Line } from "react-icons/ri";
import { FaChartBar } from "react-icons/fa";
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
                    height: isActive ? "265px" : 0,
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
                        <Link className={styles.link} href={getContratoPath("Todas", "Todos", "Todos", "Todos")}>Alterar Contratos</Link>
                        <FaChartBar className={styles.linkIcon}/>
                        <Link className={styles.link} href={getConfiabilidadePath("Todas", "Todos", "Todos", "Todos")}>Alterar Conf</Link>
                        <SlEnergy className={styles.linkIcon}/>
                        <Link className={styles.link} href={getDemandaPath("Todas", "Todos", "Todos", "Todos")}>Alterar Demanda</Link>
                        <RiMoneyDollarCircleLine className={styles.linkIcon}/>
                        <Link className={styles.link} href={getTarifaPath("Todas", "Todos", "Todos", "Todos")}>Alterar Tarifa</Link>
                        <RiMapPin2Line className={styles.linkIcon}/>
                        <Link className={styles.link} href="/sp?cenario=Otimista&ponto=Todos&posto=Todos&ano=Todos&penalidade=Todas&contrato=Contrato%20Ótimo">EDP SP</Link>
                        <RiMapPin2Line className={styles.linkIcon}/>
                        <Link className={styles.link} href="/es?cenario=Otimista&ponto=Todos&posto=Todos&ano=Todos&penalidade=Todas&contrato=Contrato%20Ótimo">EDP ES</Link>
                    </>
                }
            </div>
        </div>
    );
}
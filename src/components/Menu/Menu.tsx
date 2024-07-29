"use client"
import { FaGear } from "react-icons/fa6";
import styles from "./Menu.module.css";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Menu() {
    const [isActive, setIsActive] = useState<boolean>(false);
    const ref = useRef<HTMLDivElement>(null);
    const iconClickHandler = () => {
        setIsActive(true);
    }

    const onClickOut = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
            console.log(isActive);
            console.log("click out")
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
                    boxShadow: isActive ? "10px 10px 8px 4px #03030321" : "none"
                }}
            >
                {
                    isActive && <>
                        <Link href="/">Alterar Contratos</Link>
                        <Link href="/">Alterar Demanda</Link>
                        <Link href="/sp">EDP SP</Link>
                        <Link href="/es">EDP ES</Link>
                    </>
                }
            </div>
        </div>
    );
}
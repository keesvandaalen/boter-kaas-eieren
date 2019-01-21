import React from 'react';
import { Zetten, Speler } from "./types";

interface VeldProps {
    id: string;
    zetten: Zetten;
    winnendeRij: string[];
    onGezet: (id: string) => void;
}

export function Veld({id, zetten, winnendeRij, onGezet}: VeldProps) {
    const speler: Speler = zetten[id];
    const inhoud: string | undefined = speler === 'Kruisje' ? 'X' : 
                            speler === 'Nulletje' ? 'O' : 
                            undefined;
    let className = "veld";
    if (winnendeRij.includes(id)) {
        className += ' winnaar';
    }
    return (
        <div className={className} onClick={()=>onGezet(id)}>
            <div>{inhoud}</div>
        </div>
    );
}
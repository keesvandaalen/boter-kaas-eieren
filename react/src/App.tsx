import React, { useState } from 'react';
import { Speler, Zetten } from './types';
import { Veld } from './Veld';

export function App() {
    const [speler, setSpeler] = useState<Speler>('Kruisje');
    const [aantal, setAantal] = useState<number>(0);
    const [zetten, setZetten] = useState<Zetten>({});
    const [winnendeRij, setWinnendeRij] = useState<string[]>([]);
    const gewonnen: boolean = winnendeRij.length === 3;
    const klaar = (n: number = aantal, rij: string[] = winnendeRij): boolean => rij.length === 3 || n >= 9;
    const message = gewonnen ? `${speler} heeft gewonnen` : klaar() ? 
        'Gelijkspel' : `${speler} is aan de beurt`;
    const bepaalWinnendeRij = (id: string, speler: Speler) => {
        return [
            ["a1", "a2", "a3"], ["b1", "b2", "b3"], ["c1", "c2", "c3"],
            ["a1", "b1", 'c1'], ["a2", "b2", 'c2'], ["a3", "b3", 'c3'],
            ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
        ].filter(r => r.includes(id))
            .find(r => r.every(e => zetten[e] === speler)) || [];
    }
    const wissel = () => setSpeler(speler === 'Kruisje' ? 'Nulletje' : 'Kruisje');
    const verwerkZet = (id: string) => {
        if (!klaar()) {
            setAantal(aantal+1);
            zetten[id] = speler;
            setZetten(zetten);
            const rij = bepaalWinnendeRij(id, speler);
            if (rij.length === 3) {
                setWinnendeRij(rij);
            }
            if (!klaar(aantal + 1, rij)) {
                wissel();
            }
        }
    };
    const opnieuw = () => {
        wissel();
        setAantal(0);
        setZetten({});
        setWinnendeRij([]);
    };
    const kolommen = (r: string) => {
        return [1, 2, 3].map(k => r + k).map(id => {
            return <Veld key={id} 
                        id={id} 
                        zetten={zetten} 
                        winnendeRij={winnendeRij} 
                        onGezet={verwerkZet}/>;
        });
    };
    const rijen = ['a', 'b', 'c'].map(r => <div key={r}>{kolommen(r)}</div>);
    return (
        <div id="app">
            <h1>{message}</h1>
            {rijen}
            {klaar() && <button onClick={opnieuw}>Opnieuw</button>}
        </div>
    );
}
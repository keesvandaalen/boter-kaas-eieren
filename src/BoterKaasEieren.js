/**
 * Created by keesvandaalen on 09-09-16.
 */
import React from 'react'
import Vak from './Vak';
import Rij from './Rij';
import Titel from './Titel';

const AANTAL_VAKKEN = 9;

export default class BoterKaasEieren extends React.Component {
    constructor() {
        super();
        this.state = {kruisje: true, zetten: 0};
        this._vakken = [];
        this._rijen = [];
    }

    wisselGebruiker = kruisje => {
        this.setState({kruisje: !kruisje, zetten: this.state.zetten + 1});
        return false;
    };

    onDrieOpEenRij = rij => {
        this.setState({gameover: true});
        rij.vakken.forEach(v => v.setState({winnaar: true}));
    };

    componentDidMount = () => {
        this._rijen.push(
            // Horizontaal
            new Rij([this._vakken[0], this._vakken[1], this._vakken[2]], this.onDrieOpEenRij),
            new Rij([this._vakken[3], this._vakken[4], this._vakken[5]], this.onDrieOpEenRij),
            new Rij([this._vakken[6], this._vakken[7], this._vakken[8]], this.onDrieOpEenRij),

            // Verticaal
            new Rij([this._vakken[0], this._vakken[3], this._vakken[6]], this.onDrieOpEenRij),
            new Rij([this._vakken[1], this._vakken[4], this._vakken[7]], this.onDrieOpEenRij),
            new Rij([this._vakken[2], this._vakken[5], this._vakken[8]], this.onDrieOpEenRij),

            // Diagonaal
            new Rij([this._vakken[0], this._vakken[4], this._vakken[8]], this.onDrieOpEenRij),
            new Rij([this._vakken[2], this._vakken[4], this._vakken[6]], this.onDrieOpEenRij),
        );
        // Wissel van speler
        this._vakken.forEach(v => v.addListener(this.wisselGebruiker));
    };

    createVakken() {
        const vakken = [];
        for (let i = 0; i < AANTAL_VAKKEN; i++)
            vakken.push(<Vak key={i}
                             kruisje={this.state.kruisje}
                             ref={v=>this._vakken[i] = v}
                             gameover={this.state.gameover}
            />);
        return vakken;
    }

    reset = () => {
        this._vakken.forEach(v => v.reset());
        this._rijen.forEach(r => r.reset());
        this.setState({kruisje: true, zetten: 0, gameover: false});
    };

    render() {
        return (
            <div>
                <Titel speler={this.state.kruisje ? "Kruisje" : "Nulletje"}
                       gameover={this.state.gameover}
                       gelijkspel={this.state.zetten == AANTAL_VAKKEN}/>
                <div className="bord">
                    {this.createVakken()}
                </div>
            </div>
        )
    };
}
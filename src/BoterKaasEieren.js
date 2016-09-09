/**
 * Created by keesvandaalen on 09-09-16.
 */
import React from 'react'
import Vak from './Vak';
import Rij from './Rij';

export default class BoterKaasEieren extends React.Component {
    constructor() {
        super();
        this.state = {kruisje: true};
        this._vakken = [];
    }

    wisselGebruiker = kruisje => {
        if(!this.state.gameover)
        this.setState({kruisje: !kruisje});
        return false;
    };

    onDrieOpEenRij = rij => {
        this.setState({gameover: true});
        rij.vakken.forEach(v => v.setState({winnaar:true}));
    };

    componentDidMount = () => {
        new Rij([this._vakken[0], this._vakken[1], this._vakken[2]], this.onDrieOpEenRij);
        new Rij([this._vakken[3], this._vakken[4], this._vakken[5]], this.onDrieOpEenRij);
        new Rij([this._vakken[6], this._vakken[7], this._vakken[8]], this.onDrieOpEenRij);
        new Rij([this._vakken[0], this._vakken[3], this._vakken[6]], this.onDrieOpEenRij);
        new Rij([this._vakken[1], this._vakken[4], this._vakken[7]], this.onDrieOpEenRij);
        new Rij([this._vakken[2], this._vakken[5], this._vakken[8]], this.onDrieOpEenRij);
        new Rij([this._vakken[0], this._vakken[4], this._vakken[8]], this.onDrieOpEenRij);
        new Rij([this._vakken[2], this._vakken[4], this._vakken[6]], this.onDrieOpEenRij);
        this._vakken.forEach(v => v.addListener(this.wisselGebruiker));
    };

    createVakken() {
        const vakken = [];
        for (let i = 0; i < 9; i++)
            vakken.push(<Vak key={i}
                             kruisje={this.state.kruisje}
                             ref={v=>this._vakken.push(v)}
                             gameover={this.state.gameover}
            />);
        return vakken;
    }

    render = () => (
        <div>
            <h1>{this.state.kruisje ? "Kruisje" : "Nulletje"}</h1>
            <div className="bord">
                {this.createVakken()}
            </div>
        </div>
    );
}
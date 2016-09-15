/**
 * Created by keesvandaalen on 09-09-16.
 */
import React from 'react';

export default class Vak extends React.Component
{
    constructor() {
        super();
        this.state = {};
        this._listeners = [];
    }

    addListener = listener => this._listeners.push(listener);

    reset = () => this.setState({winnaar:false, inhoud:null});

    handleClick = e => {
        if(this.state.inhoud || this.props.gameover)
            e.stopPropagation();
        else
        {
            this.setState({inhoud: this.props.kruisje ? "X" : "O"});
            this._listeners.find(l => l(this.props.kruisje));
        }
    };

    render() {
        return (
            <div className={`vak ${this.state.winnaar ? 'winnaar' : ''}`}
                 onClick={this.handleClick}>
                {this.state.inhoud}
            </div>
        )
    }
}
/**
 * Created by keesvandaalen on 09-09-16.
 */

export default class Rij {
    constructor(vakken, onDrieOpEenRij)
    {
        this._vakken = vakken;
        this._vakken.forEach(v => v.addListener(this.handleClick));
        this._onDrieOpEenRij = onDrieOpEenRij;
        this._aantalKruisje = 0;
        this._aantalNulletje = 0;
    }

    get vakken()
    {
        return this._vakken;
    }

    handleClick = kruisje =>
    {
        if(kruisje)
            this._aantalKruisje++;
        else
            this._aantalNulletje++;

        const drieOpEenRij = this._aantalKruisje == 3 || this._aantalNulletje == 3
        if (drieOpEenRij)
            this._onDrieOpEenRij(this);
        return drieOpEenRij;
    }
}
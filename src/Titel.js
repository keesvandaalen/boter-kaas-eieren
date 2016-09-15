/**
 * Created by keesvandaalen on 15-09-16.
 */
import React from 'react';

export default ({speler, gameover, gelijkspel}) => (
    <h1>{gelijkspel ? "Gelijkspel..." : speler + (gameover ? " heeft gewonnen!" : " is aan de beurt")}</h1>
)
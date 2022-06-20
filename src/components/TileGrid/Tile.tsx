import React from 'react';
import { ITile } from '../../interfaces';
import './Tile/Tile.css';

function Tile({ text, isOpened, onClick }: ITile) {
    return (
        <div
            className={"tile" + (isOpened ? " tile-flip" : "")}
            onClick={onClick}
        >
            <div className="tile__front-side"></div>
            <div className="tile__back-side">{text}</div>
        </div>
    )
}

export default React.memo(Tile);
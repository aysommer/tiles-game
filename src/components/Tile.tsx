import React from 'react';
import { ITile } from '../interfaces';
import './Tile/Tile.css';

function Tile({ text, isOpened, isUnlock, isDisabled, onClick }: ITile) {
    return (
        <div
            className={"tile" + (isOpened ? " tile-flip" : "")}
            onClick={onClick}
        >
            <div className="tile__front-side">lock</div>
            <div className="tile__back-side">123</div>
        </div>
    )
}

export default React.memo(Tile);
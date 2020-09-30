import React from 'react';
import { ITile } from '../interfaces';
import './Tile/Tile.css';

function Tile({ text, isOpened, isUnlock, isDisabled, onClick }: ITile) {
    return (
        <button 
            className="tile" 
            onClick={onClick}
            disabled={isDisabled}
        >
            {isOpened && text}
        </button>
    )
}

export default React.memo(Tile);
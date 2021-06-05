import React from 'react';
import { ITile } from '../interfaces';
import Tile from './TileGrid/Tile';

import './TileGrid/TileGrid.css';

interface ITileGrid {
    source: ITile[];
    handleOpenTile: (key: number) => void;
}

function TileGrid({ source, handleOpenTile }: ITileGrid) {
    const tiles = source.map(({ text, isOpened, isUnlock }: ITile, key) => (
        <Tile
            key={key}
            text={text}
            isOpened={isOpened}
            isUnlock={isUnlock}
            onClick={() => handleOpenTile(key)}
        />
    ));

    return (
        <section className="tile-grid">
            {tiles}
        </section>
    )
}

export default TileGrid;
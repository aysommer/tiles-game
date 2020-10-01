import React, { useState } from 'react';
import { ITile } from '../interfaces';
import Tile from './Tile';
import './TileGrid/TileGrid.css';

const MAX_OPENED_TILES = 2;
const GRID_SIZE = 16;
const SELECTED_KEYS: number[] = [];
const TILE: ITile = {
    text: "1",
    isOpened: false,
    isUnlock: false,
    isDisabled: false
};

function TileGrid() {
    const [tiles, setTiles] = useState(Array(GRID_SIZE).fill(TILE));
    const [selectedKeys, setSelectedKeys] = useState(SELECTED_KEYS);

    function handleOpenTile(selectedKey: number): void {
        const { isOpened } = tiles[selectedKey];

        if (isOpened) {
            return;
        }

        const newTiles: ITile[] = [...tiles].map((tile, key): ITile => (key === selectedKey) ? {
            ...tile,
            isOpened: !tile.isOpened
        }: tile);

        setSelectedKeys([...selectedKeys, selectedKey]);
        setTiles(newTiles);

        if (selectedKeys.length === MAX_OPENED_TILES) {
            toggleEnableTiles(true);
        }
    }

    function checkOpenedTiles() {

    }

    function toggleEnableTiles(isDisabled: boolean) {
        const newTiles: ITile[] = [...tiles].map((tile): ITile => ({
            ...tile,
            isDisabled
        }));

        setTiles(newTiles);
    }

    return (
        <section className="tile-grid">
            {tiles.map(({ text, isOpened, isUnlock, isDisabled }: ITile, key) => (
                <Tile
                    key={key}
                    text={text}
                    isOpened={isOpened}
                    isUnlock={isUnlock}
                    isDisabled={isDisabled}
                    onClick={() => handleOpenTile(key)}
                />
            ))}
        </section>
    )
}

export default TileGrid;
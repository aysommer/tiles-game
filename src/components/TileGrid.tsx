import React, { useState } from 'react';
import Game from '../helpers/Game';
import { ITile } from '../interfaces';
import Tile from './Tile';
import './TileGrid/TileGrid.css';

const MAX_OPENED_TILES = 2;
const GRID_SIZE = 16;
const SELECTED_KEYS: number[] = [];
const TILE: ITile = {
    text: "",
    isOpened: false,
    isUnlock: false,
    isDisabled: false
};

function TileGrid() {
    const [selectedKeys, setSelectedKeys] = useState(SELECTED_KEYS);
    const [randSequence, setRandSequence] = useState(Game.getRandomPairedArray(GRID_SIZE));
    const [tiles, setTiles] = useState(Array(GRID_SIZE).fill(TILE).map((val, i): ITile => ({
        ...val,
        text: randSequence[i]
    })));

    function handleOpenTile(selectedKey: number): void {
        const { isDisabled } = tiles[selectedKey];

        if (isDisabled) {
            return;
        }

        const newTiles: ITile[] = [...tiles].map((tile, key): ITile => (key === selectedKey) ? {
            ...tile,
            isOpened: !tile.isOpened
        }: tile);
        const newKeys = [...selectedKeys, selectedKey];

        setTiles(newTiles);
        setSelectedKeys(newKeys);

        if (newKeys.length === MAX_OPENED_TILES) {
            toggleEnableTiles(true);

            if (!isEqualTiles(newKeys)) {
                console.log('!')
                setTimeout(() => {
                    closeAllTiles();
                    toggleEnableTiles(false);
                }, 1000);
            }
        }
    }

    function isEqualTiles(selectedKeys: number[]) {
        const [firstKey, secondKey] = selectedKeys;
        const firstTile: ITile = tiles[firstKey]; 
        const secondTile: ITile = tiles[secondKey];
        
        return firstTile.text === secondTile.text;
    }

    function closeAllTiles() {
        const newTiles: ITile[] = [...tiles].map((tile: ITile) => ({
            ...tile,
            isOpened: false
        }));

        setTiles(newTiles);
    }

    function toggleEnableTiles(isDisabled: boolean) {
        const newTiles: ITile[] = [...tiles].map((tile: ITile) => ({
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
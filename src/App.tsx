import React, { useState } from 'react';
import TileGrid from './components/TileGrid';
import Button from './components/Button';
import Game from './helpers/Game';
import { ITile } from './interfaces';

import './App.css';
import InfoTitle from './components/InfoTitle';

const MAX_OPENED_TILES = 2;
const GRID_SIZE = 16;
const SELECTED_KEYS: number[] = [];
const TILE: ITile = {
    text: "",
    isOpened: false,
    isUnlock: false
};

function App() {
	const [openings, setOpenings] = useState(0);
	const [selectedKeys, setSelectedKeys] = useState(SELECTED_KEYS);
    const [randSequence, setRandSequence] = useState(Game.getRandomPairedArray(GRID_SIZE));
    const [tiles, setTiles] = useState(Array(GRID_SIZE).fill(TILE).map((val, i): ITile => ({
        ...val,
        text: randSequence[i]
    })));
	const [isAnimating, setIsAnimating] = useState(false);
	const [resetEnable, setResetEnable] = useState(true);
	
	function handleOpenTile(selectedKey: number): void {
        const { isOpened } = tiles[selectedKey];

        if (isOpened || 
            selectedKeys.length === MAX_OPENED_TILES + 1 ||
            isAnimating) {
            return;
        }

        setOpenings(openings + 1);

        const newTiles: ITile[] = [...tiles].map((tile, key): ITile => (key === selectedKey) ? {
            ...tile,
            isOpened: true
        }: tile);
        const newKeys = [...selectedKeys, selectedKey];

        setTiles(newTiles);
        setSelectedKeys(newKeys);

        if (newKeys.length === MAX_OPENED_TILES) {
            if (!isEqualTiles(newKeys)) {
                setIsAnimating(true);
                setTimeout(() => {
                    closeSelectedTiles();
                    setSelectedKeys([]);
                    setIsAnimating(false);
                }, 1000);
            } else {
                setIsAnimating(true);
                setTimeout(() => {
                    setSelectedKeys([]);
                    setIsAnimating(false);
                    if (isWin()) {
                        showWin();
                    }
                }, 1000);
            }
        }
    }

    function handleResetGame() {
		setIsAnimating(true);
		setResetEnable(false);
		setOpenings(0);
		setSelectedKeys(SELECTED_KEYS);
		setRandSequence(Game.getRandomPairedArray(GRID_SIZE));
		setTiles(Array(GRID_SIZE).fill(TILE).map((val, i): ITile => ({
			...val,
			isOpened: false
		})));

		setTimeout(() => {
			setTiles(Array(GRID_SIZE).fill(TILE).map((val, i): ITile => ({
				...val,
				text: randSequence[i]
			})));
			setIsAnimating(false);
			setResetEnable(true);
		}, 500);
    }

    function showWin() {
        alert("WIN");
    }

    function isWin() : boolean {
        return tiles.every(tile => tile.isOpened === true);
    }

    function isEqualTiles(selectedKeys: number[]) {
        const [firstKey, secondKey] = selectedKeys;
        const firstTile: ITile = tiles[firstKey]; 
        const secondTile: ITile = tiles[secondKey];
        
        return firstTile.text === secondTile.text;
    }

    function closeSelectedTiles() {
        const newTiles: ITile[] = [...tiles].map((tile: ITile, key) => {
            return (selectedKeys.includes(key)) ? {
                ...tile,
                isOpened: false
            } : tile
        });

        setTiles(newTiles);
    }

	return (
		<div className="App">
			<div className="app__info-panel">
				<InfoTitle openings={openings}/>
			</div>
			<div className="app__main-section">
				<TileGrid source={tiles} handleOpenTile={handleOpenTile}/>
			</div>
			<div className="app__controllers-panel">
				<Button 
					text="Reset"
					onClick={handleResetGame}
					disabled={!resetEnable || !(openings > 0)}
				/>
			</div>
		</div>
	);
}

export default App;

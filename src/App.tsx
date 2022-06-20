import React, { useCallback, useEffect, useState } from 'react';
import TileGrid from './components/TileGrid';
import Button from './components/Button';
import Game from './utils/Game';
import { ITile } from './interfaces';
import InfoTitle from './components/InfoTitle';
import { motion } from "framer-motion"

import './App.css';
import Tile from './components/TileGrid/Tile';

const MAX_OPENED_TILES = 2;
const GRID_SIZE = 16;
const SELECTED_KEYS: number[] = [];
const TILE: ITile = {
    text: "",
    isOpened: false,
    isUnlock: false
};

function App() {
    const [openings, setOpenings] = useState<number>(0);
    const [selectedKeys, setSelectedKeys] = useState<number[]>(SELECTED_KEYS);
    const [randSequence, setRandSequence] = useState<number[]>(Game.getRandomPairedArray(GRID_SIZE));
    const [tiles, setTiles] = useState<ITile[]>(Array(GRID_SIZE).fill(TILE).map((val, i): ITile => ({
        ...val,
        text: randSequence[i]
    })));
    const [isAnimating, setIsAnimating] = useState<boolean>(false);
    const [resetEnable, setResetEnable] = useState<boolean>(true);

    const handleOpenTile = (selectedKey: number) => () => {
        const { isOpened } = tiles[selectedKey];

        if (isOpened ||
            selectedKeys.length === MAX_OPENED_TILES + 1 ||
            isAnimating) {
            return;
        }

        setOpenings((currentOpenings: number) => currentOpenings + 1);
        setTiles((currentTiles: ITile[]) => currentTiles.map((tile, key): ITile => (key === selectedKey) ? {
            ...tile,
            isOpened: true
        } : tile));
        setSelectedKeys((currentKeys: number[]) => [...currentKeys, selectedKey]);
    }

    const handleResetGame = useCallback(() => {
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
            setTiles((currentTiles: ITile[]) => currentTiles.map((tile: ITile, i: number): ITile => ({
                ...tile,
                text: randSequence[i].toString()
            })));
            setIsAnimating(false);
            setResetEnable(true);
        }, 500);
    }, [randSequence]);

    function showWin() {
        alert("WIN");
    }

    const isWin = useCallback(() => {
        return tiles.every((tile: ITile) => tile.isOpened === true);
    }, [tiles]);

    const isEqualTiles = useCallback(([firstKey, secondKey]: number[]) => {
        const firstTile: ITile = tiles[firstKey];
        const secondTile: ITile = tiles[secondKey];

        return firstTile.text === secondTile.text;
    }, [tiles]);

    const closeSelectedTiles = useCallback(() => {
        setTiles((currentTiles: ITile[]) => currentTiles.map((tile: ITile, key: number) => {
            return selectedKeys.includes(key) ? {
                ...tile,
                isOpened: false
            } : tile
        }));
    }, [selectedKeys]);

    useEffect(() => {
        if (selectedKeys.length === MAX_OPENED_TILES) {
            if (!isEqualTiles(selectedKeys)) {
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
    }, [selectedKeys, closeSelectedTiles, isEqualTiles, isWin])

    return (
        <div className="App">
            <motion.div
                className="app__info-panel"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <InfoTitle openings={openings} />
            </motion.div>
            <motion.div
                className="app__main-section"
                transition={{ duration: 0.75, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <TileGrid>
                    {
                        tiles.map(({ text, isOpened, isUnlock }: ITile, key) => (
                            <Tile
                                key={key}
                                text={text}
                                isOpened={isOpened}
                                isUnlock={isUnlock}
                                onClick={handleOpenTile(key)}
                            />
                        ))
                    }
                </TileGrid>
            </motion.div>
            <motion.div
                className="app__controllers-panel"
                transition={{ duration: 1, ease: "easeInOut" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
            >
                <Button
                    text="Reset"
                    onClick={handleResetGame}
                    disabled={!resetEnable || !(openings > 0)}
                />
            </motion.div>
        </div>
    );
}

export default App;

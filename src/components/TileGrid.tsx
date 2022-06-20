import React, { ReactNode } from 'react';

import './TileGrid/TileGrid.css';

interface ITileGrid {
    children: ReactNode;
}

function TileGrid({ children }: ITileGrid) {
    return (
        <section className="tile-grid">
            {children}
        </section>
    )
}

export default TileGrid;
import React from 'react';
import TileGrid from './components/TileGrid';
import Button from './components/Button';

import './App.css';

function App() {
	return (
		<div className="App">
			<div className="app__main-section">
				<TileGrid/>
			</div>
			<div className="app__controllers-panel">
				<Button text="Reset"/>
			</div>
		</div>
	);
}

export default App;

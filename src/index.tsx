import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

import * as serviceWorker from './serviceWorker';
import './themes.css';
import './index.css';

const app = document.getElementById('root') as Element;
const root = createRoot(app);

root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

serviceWorker.unregister();
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');
if (ReactDOM.version.startsWith('18')) {
    createRoot(container).render(<App title="Standalone" />);
} else {
    ReactDOM.render(<App title="Standalone" />, container);
}

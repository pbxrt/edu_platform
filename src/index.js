import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if(module.hot) {
    ReactDOM.render(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById('root')
    );
} else {
    ReactDOM.hydrate(
        <HashRouter>
            <App />
        </HashRouter>,
        document.getElementById('root')
    );
}
registerServiceWorker();

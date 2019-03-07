import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter} from 'react-router-dom';

const reactTarget = document.getElementById('react-target');

ReactDOM.render(
    <BrowserRouter >
        <App />
    </BrowserRouter>,
    reactTarget
);
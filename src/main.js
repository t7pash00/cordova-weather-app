import React from 'react';
import ReactDom from 'react-dom'
import App from './App';
import{BrowserRouter} from 'react-router-dom';

const reactTarget = document.getElementById('react-target');

ReactDom.render(<App />, reactTarget);
<BrowserRouter>
<App/>

</BrowserRouter>

console.log("webpack bundle works");

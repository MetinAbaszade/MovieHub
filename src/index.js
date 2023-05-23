import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
}

root.render( 
    <App /> 
);
 

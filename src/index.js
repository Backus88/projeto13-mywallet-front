import ReactDom from 'react-dom';
import React from 'react';
import App from './components/App';
import './assets/reset.css';

ReactDom.render(React.createElement(App), document.querySelector('.root'));
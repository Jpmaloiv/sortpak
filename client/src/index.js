import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

secret: process.env.NODE_ENV === 'production' ? 'secretforproduct' : 'secret';

ReactDOM.render(<App />, document.getElementById('root'));

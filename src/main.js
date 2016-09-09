/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import BoterKaasEieren from './BoterKaasEieren';

ReactDOM.render(<BoterKaasEieren/>, document.getElementById('app'));


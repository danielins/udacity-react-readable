import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers';

import registerServiceWorker from './registerServiceWorker';


/**
 * creating the store of the app
 */
const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() );

ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
  document.getElementById('root')
);


registerServiceWorker();
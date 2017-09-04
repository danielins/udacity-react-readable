import React from 'react';
import ReactDOM from 'react-dom';
import {  BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { createStore, compose} from 'redux';
import { Provider } from 'react-redux';

import reducer from './reducers/';

import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

/**
 * creating the store of the app
 */
const store = createStore( reducer, composeEnhancers );

ReactDOM.render(
	<Provider store={ store }>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
  document.getElementById('root')
);


registerServiceWorker();
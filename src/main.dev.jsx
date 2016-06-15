/* Import React */
import React from 'react';
import ReactDOM from 'react-dom';

/* Import Redux */
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/* Local Storage */
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('prometeo');
const middleStorage = storage.createMiddleware(engine, [], ['SAVE_LOCALSTORE']);
const load = storage.createLoader(engine);

/* DEVELOPMENT ONLY */
import createLogger from 'redux-logger';

/* Import Reducers */
import reducers from 'src/redux';

/* Import App & Styles */
import 'src/scss/main.scss';
import App from 'src/react/app.jsx';

const logger = createLogger({ duration: true, collapsed: true });
const store = createStore(reducers, applyMiddleware(thunk, promise, logger, middleStorage));

module.hot.accept('./redux', () => { store.replaceReducer(require('./redux').default); });

/* eslint no-console: 0 */

load(store).then(localstate => {
  console.log('Previous state loaded', localstate);
  ReactDOM.render(
    <Provider store={store}>
      <App localstate={localstate} />
    </Provider>
  , document.getElementById('app'));
}).catch(() => {
  console.log('Failed to load previous state');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('app'));
});

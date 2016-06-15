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

/* Import Reducers */
import reducers from 'src/redux';
const store = createStore(reducers, applyMiddleware(thunk, promise, middleStorage));

/* Import App & Styles */
import 'src/scss/main.scss';
import App from 'src/react/app.jsx';

load(store).then(localstate => {
  ReactDOM.render(
    <Provider store={store}>
      <App localstate={localstate} />
    </Provider>
  , document.getElementById('app'));
}).catch(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  , document.getElementById('app'));
});

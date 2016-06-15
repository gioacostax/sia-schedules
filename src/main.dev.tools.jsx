/* Import React */
import React from 'react';
import ReactDOM from 'react-dom';

/* Import Redux */
import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

/* Development */
import createLogger from 'redux-logger';
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';
import DockMonitor from 'redux-devtools-dock-monitor';

/* Local Storage */
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
const engine = createEngine('prometeo');
const middleStorage = storage.createMiddleware(engine, [], ['SAVE_LOCALSTORE']);
const load = storage.createLoader(engine);

/* Import Reducers */
import reducers from 'src/redux';

/* Import App & Styles */
import 'src/scss/main.scss';
import App from 'src/react/app.jsx';

/* DevTools for Redux */
const DevTools = createDevTools(
  <DockMonitor
    toggleVisibilityKey="ctrl-h"
    changePositionKey="ctrl-q"
    defaultSize={0.2}
    defaultIsVisible={false}
  >
    <Inspector />
  </DockMonitor>
);

const logger = createLogger({ duration: true, collapsed: true });
const store = createStore(reducers,
  compose(applyMiddleware(thunk, promise, logger, middleStorage), DevTools.instrument())
);

module.hot.accept('./redux', () => { store.replaceReducer(require('./redux').default); });

/* eslint no-console: 0 */

load(store).then(localstate => {
  console.log('Previous state loaded', localstate);
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <DevTools />
        <App localstate={localstate} />
      </div>
    </Provider>
  , document.getElementById('app'));
}).catch(() => {
  console.log('Failed to load previous state');
  ReactDOM.render(
    <Provider store={store}>
      <div>
        <DevTools />
        <App />
      </div>
    </Provider>
  , document.getElementById('app'));
});

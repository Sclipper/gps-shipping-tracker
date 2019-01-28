import { connectRouter, routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { persistState } from 'redux-devtools';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import rootReducer from '../reducers/rootReducers';
import rootSaga from '../sagas/rootSagas';
import { initialState } from './initialState';

/**
 * Creates middleware objects
 */
const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();
/**
 * Sets up persistent debug sessions when page reloads
 */
function getDebugSessionKey() {
  if (typeof window !== 'undefined') {
    const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
    return matches && matches.length > 0 ? matches[1] : '';
  }
  return 0;
}

/**
 * Set configuration for store and connect with route and reducers
 * @param  {State} initialState? use a defined initial state if exists
 * @returns Configured store with middleware and connected router
 */
function configureStore() {
  const connectedRouter = connectRouter(History)(rootReducer);
  const middlewares = [
    routerMiddleware(History),
    sagaMiddleware,
    loggerMiddleware,
  ];
  let enhancer;
  /**
   * if user has redux devtools extension on his chrome browser, else use devtools
   * @param window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ [dev plugin]
   */
  if (
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ) {
    enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
      applyMiddleware(...middlewares),
    );
  } else {
    enhancer = composeWithDevTools(
      applyMiddleware(...middlewares),
      persistState(getDebugSessionKey()),
    );
  }

  return createStore(connectedRouter, initialState, enhancer);
}
const storeFunc = History => {
  /**
   * Store holds the applications state, allows access to state with getState,
   * Store allows dispatching of actions and allows registration of listeners
   */
  const store = configureStore();

  /**
   * Runs the list of saga watchers contained our in rootsaga file
   */
  sagaMiddleware.run(rootSaga);
  console.log(store);
  return store;
};
export default storeFunc;

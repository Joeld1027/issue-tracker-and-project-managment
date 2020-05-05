import { createStore, applyMiddleware, compose } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const middleware = [thunk];

if (process.env.NODE_ENV === 'development') {
	middleware.push(logger);
}

export function configureStore() {
	const store = createStore(
		rootReducer,
		compose(
			applyMiddleware(...middleware),
			window.__REDUX_DEVTOOLS_EXTENSION__ &&
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)
	);
	return store;
}

export default configureStore;
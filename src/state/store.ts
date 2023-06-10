import { createStore } from 'redux';
import { reducers } from './reducers';
import { persistReducer, persistStore } from 'redux-persist';
import { persistConfig } from './persistConfig';

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

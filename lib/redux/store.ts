// store.js
import { configureStore } from '@reduxjs/toolkit';
import {
    persistStore, persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Usa o localStorage por padrão
import rootReducer from './reducers';

// Configuração do redux-persist
const persistConfig = {
    key: 'root',
    storage,
};

// Cria um reducer persistente
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Cria o store do Redux usando o reducer persistente
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

// Cria o objeto de persistência
export const persistor = persistStore(store);

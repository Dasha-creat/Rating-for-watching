import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import createSagaMidlware from 'redux-saga';
import { rootSaga } from '../sagas/rootSaga';

const sagaMiddleware = createSagaMidlware();

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddlware) => 
    getDefaultMiddlware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
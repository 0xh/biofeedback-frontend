import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import AppRouter from './core/containers/AppRouter';

const { store, persistor } = configureStore();

const Loading = () => <div>Betöltés...</div>;

export default () => (
  <Provider store={store}>
    <PersistGate
      persistor={persistor}
      loading={<Loading />}
    >
      <AppRouter />
    </PersistGate>
  </Provider>
);

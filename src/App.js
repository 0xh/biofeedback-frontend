import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import redux from './store';
import AppRouter from './core/containers/AppRouter';


const Loading = () => <div>Betöltés...</div>;

export default () => (
  <Provider store={redux.store}>
    <PersistGate
      persistor={redux.persistor}
      loading={<Loading />}
    >
      <AppRouter />
    </PersistGate>
  </Provider>
);

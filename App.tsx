import React from "react";
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Router from "./src/navigation/router";
import { store, persistor } from "./src/redux/reducers";

// const Store = store();

const App: React.FC = (props) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
          <Router />
      </PersistGate>
    </Provider>
  )
}

export default App;
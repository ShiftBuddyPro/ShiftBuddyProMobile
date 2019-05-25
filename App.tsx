import React from 'react';
import RootStack from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './modules/store';
import { PopupProvider } from './context/PopupContext';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PopupProvider>
          <RootStack />
        </PopupProvider>
      </Provider>
    );
  }
}

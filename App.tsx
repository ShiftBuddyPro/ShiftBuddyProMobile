import React from 'react';
import RootStack from './navigation/AppNavigator';
import { Provider } from 'react-redux';
import store from './modules/store';
import { PopupProvider } from './context/PopupContext';
import { Font } from 'expo';
import * as UI from 'ui';

export default class App extends React.Component {
  state = {
    loading: true,
  };

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) return <UI.View />;

    return (
      <Provider store={store}>
        <PopupProvider>
          <RootStack />
        </PopupProvider>
      </Provider>
    );
  }
}

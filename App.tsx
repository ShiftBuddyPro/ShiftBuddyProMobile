import React from "react";
import RootStack from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import store from "./modules/store";

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}

import React, { Component } from 'react';
import EmployeeApi from 'services/EmployeeApi';
import { withNavigation, NavigationScreenProps } from 'react-navigation';
import * as UI from 'ui';

interface Props {
  navigation: any;
}

class ManagerLogin extends Component<Props> {
  state = {
    username: '',
    password: '',
  };

  handleLoginPress = () => {
    const { username, password } = this.state;
    EmployeeApi.login({ username, password })
      .then(() => this.props.navigation.navigate('EmployeeDashboard'))
      .catch(err => console.log(err));
  };

  render() {
    const { username, password } = this.state;
    return (
      <>
        <UI.Input
          value={username}
          onChangeText={(username: string) => this.setState({ username })}
          label="Username"
        />
        <UI.Input
          value={password}
          onChangeText={(password: string) => this.setState({ password })}
          secureTextEntry
          label="Password"
        />
        <UI.Button
          onPress={this.handleLoginPress}
          style={{ alignSelf: 'center', marginTop: 15 }}
        >
          Log in
        </UI.Button>
      </>
    );
  }
}

export default withNavigation(ManagerLogin);

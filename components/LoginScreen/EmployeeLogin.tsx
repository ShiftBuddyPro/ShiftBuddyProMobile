import React, { Component } from 'react';
import EmployeeApi from 'services/EmployeeApi';
import { withNavigation } from 'react-navigation';
import appColors from 'constants/appColors';
import * as UI from 'ui';

interface Props {
  navigation: any;
}

class ManagerLogin extends Component<Props> {
  state = {
    username: '',
    password: '',
    loading: false,
    error: false,
  };

  handleLoginPress = () => {
    const { username, password } = this.state;
    this.setState({ loading: true, error: false });
    EmployeeApi.login({ username, password })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.navigate('EmployeeDashboard');
      })
      .catch(() => this.setState({ loading: false, error: true }));
  };

  render() {
    const { username, password, loading, error } = this.state;
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
        <UI.Text style={{ color: error ? appColors.darkRed : appColors.white }}>
          Invalid Credentials
        </UI.Text>
        <UI.Button
          loading={loading}
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

import React, { Component } from 'react';
import ManagerApi from 'services/ManagerApi';
import { setCurrentManager } from 'modules/manager';
import { connect } from 'react-redux';
import * as UI from 'ui';
import { withNavigation } from 'react-navigation';

interface Props {
  navigation: any;
  setCurrentManager: (manager: object) => void;
}

class ManagerLogin extends Component<Props> {
  state = {
    email: '',
    password: '',
    loading: false,
  };

  handleLoginPress = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    ManagerApi.login({ email, password })
      .then((manager: object) => {
        this.props.setCurrentManager(manager);
        this.props.navigation.navigate('ManagerDashboard');
      })
      .catch(() => this.setState({ loading: false }));
  };

  render() {
    const { email, password, loading } = this.state;
    return (
      <>
        <UI.Input
          value={email}
          onChangeText={(email: string) => this.setState({ email })}
          label="Email"
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
          loading={loading}
        >
          Log in
        </UI.Button>
      </>
    );
  }
}

export default connect(
  null,
  { setCurrentManager }
)(withNavigation(ManagerLogin));

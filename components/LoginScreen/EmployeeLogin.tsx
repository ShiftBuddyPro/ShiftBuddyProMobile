import React, { Component } from 'react';
import EmployeeApi from 'services/EmployeeApi';
import { withNavigation } from 'react-navigation';
import appColors from 'constants/appColors';
import { setCurrentShift } from 'modules/employeeShift';
import * as UI from 'ui';
import { connect } from 'react-redux';

interface Props {
  navigation: any;
  setCurrentShift: (employee: any) => void;
}

class EmployeeLogin extends Component<Props> {
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
      .then((employeeId: number) => {
        EmployeeApi.getEmployee().then((employee: any) => {
          const { status, current_shift_id: shiftId } = employee;
          this.setState({ loading: false });
          if (shiftId && status === 'active') {
            this.props.setCurrentShift(shiftId);
            this.props.navigation.navigate('EmployeeShift');
          } else
            this.props.navigation.navigate('EmployeeDashboard', { employeeId });
        });
      })
      .catch(err => {
        this.setState({ errors: true, loading: false });
      });
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

export default withNavigation(
  connect(
    null,
    { setCurrentShift }
  )(EmployeeLogin)
);

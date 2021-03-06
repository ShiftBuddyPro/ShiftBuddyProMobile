import React, { Component } from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import ManagerLogin from './ManagerLogin';
import EmployeeLogin from './EmployeeLogin';
import { TouchableOpacity } from 'react-native';
import storage from 'react-native-modest-storage';
import ManagerApi from 'services/ManagerApi';
import { setCurrentManager } from 'modules/manager';
import { setCurrentEmployee } from 'modules/employee';
import { connect } from 'react-redux';
import EmployeeApi from 'services/EmployeeApi';

interface Props {
  setCurrentManager: (currentUser: CurrentUser) => void;
  setCurrentEmployee: (currentUser: CurrentUser) => void;
  navigation: any;
}

interface State {
  loginType: LoginType;
}

interface CurrentUser {
  type: 'manager' | 'employee';
  auth_token: string;
  name: string;
  id: string;
  email: string;
}

enum LoginType {
  Manager = 'Manager',
  Employee = 'Employee',
}

class LoginScreen extends Component<Props, State> {
  state = {
    loginType: LoginType.Manager,
  };

  componentDidMount() {
    storage.get('currentUser').then((currentUser: CurrentUser) => {
      if (currentUser) {
        const { type } = currentUser;
        if (type === 'manager') {
          ManagerApi.setManager(currentUser);
          this.props.setCurrentManager(currentUser);
          this.props.navigation.navigate('ManagerDashboard');
        }
      }
    });
  }

  renderToggle() {
    const renderToggleButton = (loginType: LoginType) => {
      const activeToggleStyle = {
        backgroundColor: appColors.primary.regular,
      };
      const activeTextStyle = {
        color: appColors.white,
      };
      const inActiveTextStyle = {
        color: appColors.primary.regular,
      };
      const isActive = this.state.loginType === loginType;
      const isManager = loginType === LoginType.Manager;
      const baseStyle = isManager
        ? styles.managerToggle
        : styles.employeeToggle;
      const toggleStyle = {
        ...baseStyle,
        ...(isActive ? activeToggleStyle : null),
      };
      return (
        <TouchableOpacity
          style={toggleStyle}
          onPress={() => this.setState({ loginType })}
        >
          <UI.Text style={isActive ? activeTextStyle : inActiveTextStyle}>
            {loginType}
          </UI.Text>
        </TouchableOpacity>
      );
    };

    return (
      <UI.View style={styles.toggleRow}>
        {renderToggleButton(LoginType.Manager)}
        {renderToggleButton(LoginType.Employee)}
      </UI.View>
    );
  }

  render() {
    return (
      <UI.KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <UI.View style={styles.topHalfContainer}>
          <UI.Text style={styles.header}>ShiftBuddyPro</UI.Text>
        </UI.View>
        <UI.View style={styles.bottomHalfContainer}>
          <UI.Card style={styles.loginCard}>
            {this.renderToggle()}
            <UI.Text style={styles.loginText}>
              {this.state.loginType} Login
            </UI.Text>
            {this.state.loginType === LoginType.Manager ? (
              <ManagerLogin />
            ) : (
              <EmployeeLogin />
            )}
          </UI.Card>
        </UI.View>
      </UI.KeyboardAwareScrollView>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    flex: 1,
  },

  topHalfContainer: {
    flex: 1,
    backgroundColor: appColors.secondary.regular,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomHalfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 36,
    color: appColors.white,
  },

  loginCard: {
    width: '85%',
    height: '105%',
    marginTop: '-40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
  },

  toggleRow: {
    flexDirection: 'row',
    height: 35,
    borderColor: appColors.primary.regular,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: UI.StyleSheet.hairlineWidth,
  },

  managerToggle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  employeeToggle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  loginText: {
    marginBottom: 5,
    marginTop: 5,
    color: 'dimgray',
  },
});

export default connect(
  null,
  { setCurrentEmployee, setCurrentManager }
)(LoginScreen);

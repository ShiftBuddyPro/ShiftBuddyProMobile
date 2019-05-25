import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UI from 'ui';
import { AsyncStorage } from 'react-native';
import EmployeeShifts from './EmployeeShifts';
import EmployeeProfileCard from './EmployeeProfileCard';
import { Header, Title, Body } from 'native-base';
import { Shift, Employee } from 'types';
import managerApi from 'services/ManagerApi';
import employeeApi from 'services/EmployeeApi';

interface State {
  shifts: Shift[];
  employee: Employee;
  loading: boolean;
}

interface Props {
  navigation: any;
}

class ManagerEmployeeProfile extends Component<Props, State> {
  state = {
    shifts: [],
    employee: {
      created_at: '',
      id: -1,
      name: '',
      status: 'not_working' as Employee['status'],
      username: '',
    },
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { employeeId } = this.props.navigation.state.params;
    const [employee, shifts] = await Promise.all([
      managerApi.getEmployee(employeeId),
      managerApi.getShifts(),
    ]);
    this.setState({ employee, shifts, loading: false });
  }

  renderHeader() {
    const { employee } = this.state;
    return (
      <UI.BasicHeader
        onBackPress={() => this.props.navigation.pop()}
        title={employee.name}
        hasBackButton
      />
    );
  }

  render() {
    const { employee, shifts, loading } = this.state;

    if (loading) return <UI.LoadingScreen />;

    const { navigation } = this.props;
    return (
      <UI.View style={styles.fullContainer}>
        {this.renderHeader()}
        <UI.View style={styles.container}>
          <EmployeeProfileCard
            employee={employee}
            navigate={navigation.navigate}
          />
          <EmployeeShifts shifts={shifts} navigate={navigation.navigate} />
        </UI.View>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  fullContainer: {
    flex: 1,
  },

  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
});

const mapStateToProps = state => ({
  manager: state.manager,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerEmployeeProfile);

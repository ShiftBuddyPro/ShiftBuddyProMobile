import React, { Component } from 'react';
import { Header, Title, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import * as UI from 'ui';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import Home from './Home';
import Shifts from './Shifts';
import Employees from './Employees';
import Settings from './Settings';
import { AsyncStorage } from 'react-native';
import ManagerApi, { Employee } from 'services/ManagerApi';
import EmployeesCard from './EmployeesCard';

interface State {
  employees: Employee[];
}

interface Props {}

export class ManagerDashboard extends Component<Props, State> {
  state = {
    employees: [],
  };

  componentDidMount() {
    // AsyncStorage.clear();
    ManagerApi.getEmployees().then((employees: Employee[]) =>
      this.setState({ employees })
    );
    ManagerApi.getShifts();
    ManagerApi.getActivityLogs();
  }

  render() {
    const { employees } = this.state;

    return (
      <UI.View style={styles.fullContainer}>
        <Header>
          <Body>
            <Title>Dashboard</Title>
          </Body>
        </Header>
        <UI.ScrollView contentContainerStyle={styles.container}>
          <UI.View style={styles.cardsRow}>
            <UI.Card style={styles.card}>
              <UI.Text weight="bold" size="large">
                Recent Activities
              </UI.Text>
              <UI.Text>Overview 1</UI.Text>
              <UI.Text>Overview 2</UI.Text>
              <UI.Text>Overview 3</UI.Text>
            </UI.Card>
          </UI.View>
          <UI.View style={styles.cardsRow}>
            <UI.Card style={styles.card}>
              <UI.Text weight="bold" size="large">
                Shifts
              </UI.Text>
              <UI.Text>Overview 1</UI.Text>
              <UI.Text>Overview 2</UI.Text>
              <UI.Text>Overview 3</UI.Text>
            </UI.Card>
          </UI.View>
          <UI.View style={styles.cardsRow}>
            <EmployeesCard employees={employees} />
          </UI.View>
        </UI.ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  topContainer: {
    flex: 1,
  },

  cardsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
  },

  middleContainer: {
    flex: 2,
  },
});

const mapStateToProps = state => ({
  manager: state.manager,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDashboard);

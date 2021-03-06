import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import managerApi from 'services/ManagerApi';
import { Employee } from 'types';
import EmployeeRow from './EmployeeRow';

interface State {
  employees: Employee[];
  loading: boolean;
}

interface Props {
  navigation: any;
}

class ManagerEmployees extends React.Component<Props, State> {
  state = {
    employees: [],
    loading: false,
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = async () => {
    this.setState({ loading: true });
    const employees: Employee[] = await managerApi.getEmployees();
    this.setState({ employees });
    this.setState({ loading: false });
  };

  renderAddEmployeeButton() {
    const { navigation } = this.props;
    return (
      <UI.PlainButton
        shadow="medium"
        onPress={() =>
          navigation.navigate('ManagerAddEmployee', {
            fetchEmployees: this.fetchEmployees,
          })
        }
        style={styles.addEmployeeButton}
      >
        <UI.MIcon name="person-add" style={styles.addEmployeeIcon} />
      </UI.PlainButton>
    );
  }

  render() {
    const { navigation } = this.props;
    const { employees, loading } = this.state;

    if (loading) return <UI.LoadingScreen />;

    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title="Employees"
            onBackPress={() => navigation.pop()}
          />
          {this.renderAddEmployeeButton()}
        </UI.View>
        <UI.View style={styles.divider} />
        <UI.List
          style={{
            backgroundColor: appColors.background.regular,
            paddingTop: 15,
            paddingHorizontal: '5%',
          }}
          data={employees}
          renderItem={({ item }) => (
            <EmployeeRow
              fetchEmployees={this.fetchEmployees}
              navigate={navigation.navigate}
              employee={item}
            />
          )}
          keyExtractor={(item: Employee) => item.id.toString()}
        />
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },

  headerContainer: {
    marginHorizontal: '5%',
    paddingBottom: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },

  addEmployeeButton: {
    alignSelf: 'flex-end',
    marginLeft: 'auto',
    marginRight: 15,
    backgroundColor: appColors.white,
    height: 35,
    width: 80,
    borderRadius: 30,
    justifyContent: 'center',
  },

  addEmployeeIcon: {
    textAlign: 'center',
    color: appColors.success.regular,
    fontSize: 22,
  },
});

export default ManagerEmployees;

import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import managerApi from 'services/ManagerApi';
import { Employee } from 'types';
import EmployeeRow from './EmployeeRow';

interface State {
  employees: Employee[];
}

interface Props {
  navigation: any;
}

class ManagerEmployees extends React.Component<Props, State> {
  state = {
    employees: [],
  };

  componentDidMount() {
    this.fetchEmployees();
  }

  fetchEmployees = async () => {
    const employees: Employee[] = await managerApi.getEmployees();
    this.setState({ employees });
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
    const { employees } = this.state;
    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title="Employees"
            onBackPress={() => navigation.pop()}
          />
          {this.renderAddEmployeeButton()}
        </UI.View>
        <UI.List
          data={employees}
          renderItem={({ item }) => <EmployeeRow employee={item} />}
          keyExtractor={(item: Employee) => item.id.toString()}
        />
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    marginTop: '10%',
    marginHorizontal: '5%',
    flex: 1,
  },

  headerContainer: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: appColors.grey.regular,
    marginBottom: 20,
    flexDirection: 'row',
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

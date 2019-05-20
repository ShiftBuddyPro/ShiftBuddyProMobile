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

  async componentDidMount() {
    const employees: Employee[] = await managerApi.getEmployees();
    this.setState({ employees });
  }

  render() {
    const { employees } = this.state;
    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title="Employees"
            onBackPress={() => this.props.navigation.pop()}
          />
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
  },
});

export default ManagerEmployees;

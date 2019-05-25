import React from 'react';
import * as UI from 'ui';
import { Employee } from 'types';
import managerApi from 'services/ManagerApi';
import TopContainer from './TopContainer';
import ButtonsRow from './ButtonsRow';

interface Props {
  navigate: any;
  employee: Employee;
  fetchEmployees: () => void;
  fetchEmployeeData: () => void;
}

const EmployeeProfileCard = (props: Props) => {
  const { navigate, employee, fetchEmployees, fetchEmployeeData } = props;

  const removeEmployee = () => {
    managerApi.removeEmployee(employee.id).then(() => {
      fetchEmployees();
      navigate('ManagerEmployees');
    });
  };

  return (
    <UI.Card style={styles.card}>
      <TopContainer employee={employee} />
      <ButtonsRow
        fetchEmployeeData={fetchEmployeeData}
        employee={employee}
        removeEmployee={removeEmployee}
      />
    </UI.Card>
  );
};

const styles = UI.StyleSheet.create({
  card: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    paddingBottom: 10,
  },
});

export default EmployeeProfileCard;

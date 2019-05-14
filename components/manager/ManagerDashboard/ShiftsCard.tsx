import * as React from 'react';
import * as UI from 'ui';
import ManagerApi, { Employee } from 'services/ManagerApi';

interface Props {
  shifts: Employee[];
}

export default (props: Props) => {
  const shiftRows = props.shifts.map((employee: Employee) => (
    <UI.Text key={employee.id} style={styles.rowText}>
      {employee.name}
    </UI.Text>
  ));

  return (
    <UI.Card style={styles.card}>
      <UI.Text style={styles.header} weight="bold" size="large">
        Shifts
      </UI.Text>
      {shiftRows}
    </UI.Card>
  );
};

const styles = UI.StyleSheet.create({
  header: {
    marginBottom: 5,
  },

  rowText: {
    marginBottom: 5,
  },

  card: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
  },
});

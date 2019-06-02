import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Shift } from 'types';
import EmployeeShiftRow from './EmployeeShiftRow';

interface Props {
  navigate: any;
  shifts: Shift[];
}

const EmployeeShifts = (props: Props) => {
  const { shifts, navigate } = props;
  return (
    <UI.View style={styles.container}>
      <UI.Text style={styles.header} weight="bold" size="large">
        Employee Shifts
      </UI.Text>
      <UI.List
        data={shifts}
        renderItem={({ item }) => (
          <EmployeeShiftRow navigate={navigate} shift={item} />
        )}
        keyExtractor={(item: Shift) => item.id.toString()}
      />
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  container: {
    flex: 4,
  },

  header: {
    marginBottom: 10,
  },
});

export default EmployeeShifts;

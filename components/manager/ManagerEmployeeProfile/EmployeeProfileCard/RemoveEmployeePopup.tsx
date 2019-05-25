import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Employee } from 'types';

interface Props {
  employee: Employee;
  removeEmployee: () => void;
  closePopup: () => void;
}

const RemoveEmployeePopup = (props: Props) => {
  const { closePopup, employee, removeEmployee } = props;

  const handleRemovePress = () => {
    closePopup();
    removeEmployee();
  };

  return (
    <UI.View style={styles.container}>
      <UI.Text size="large" style={styles.header}>
        Are you sure you want to remove {employee.name}?
      </UI.Text>
      <UI.View style={styles.buttonsRow}>
        <UI.Button onPress={handleRemovePress} style={styles.removeButton}>
          Remove
        </UI.Button>
        <UI.Button onPress={closePopup}>Cancel</UI.Button>
      </UI.View>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  header: {
    textAlign: 'center',
    marginBottom: 30,
    color: appColors.grey.dark,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  removeButton: {
    backgroundColor: appColors.darkRed,
  },
});

export default RemoveEmployeePopup;

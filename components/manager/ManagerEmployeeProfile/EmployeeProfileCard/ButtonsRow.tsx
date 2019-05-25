import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import WithPopup, { ShowPopupObject } from 'hoc/WithPopup';
import { Employee } from 'types';
import RemoveEmployeePopup from './RemoveEmployeePopup';
import EditEmployeePopup from './EditEmployeePopup';

interface Props {
  showPopup: (showPopupObject: ShowPopupObject) => void;
  closePopup: () => void;
  removeEmployee: () => void;
  employee: Employee;
  fetchEmployeeData: () => void;
}

const ButtonsRow = (props: Props) => {
  const {
    showPopup,
    closePopup,
    removeEmployee,
    employee,
    fetchEmployeeData,
  } = props;

  const handleEditPress = () => {
    showPopup({
      content: (
        <EditEmployeePopup
          fetchEmployeeData={fetchEmployeeData}
          closePopup={closePopup}
          employee={employee}
        />
      ),
      fullscreen: true,
    });
  };

  const handleRemovePress = () => {
    showPopup({
      content: (
        <RemoveEmployeePopup
          employee={employee}
          removeEmployee={removeEmployee}
          closePopup={closePopup}
        />
      ),
    });
  };

  return (
    <UI.View style={styles.buttonsRow}>
      <UI.PlainButton
        onPress={handleEditPress}
        style={{ ...styles.button, borderRightWidth: 1 }}
      >
        <UI.MCIcon style={styles.buttonIcon} name="account-edit" />
        <UI.Text weight="semibold">Edit</UI.Text>
      </UI.PlainButton>
      <UI.PlainButton onPress={handleRemovePress} style={styles.removeButton}>
        <UI.MCIcon style={styles.removeIcon} name="account-remove" />
        <UI.Text weight="semibold" style={styles.removeButtonText}>
          Remove
        </UI.Text>
      </UI.PlainButton>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  buttonsRow: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: appColors.grey.light,
    paddingLeft: 5,
    paddingRight: 5,
  },

  removeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },

  removeIcon: {
    fontSize: 20,
    color: appColors.darkRed,
    marginRight: 5,
  },

  removeButtonText: {
    color: appColors.darkRed,
  },

  buttonIcon: {
    fontSize: 20,
    color: appColors.darkBlue,
    marginRight: 5,
  },

  buttonArrow: {
    fontSize: 20,
    color: appColors.orange,
  },
});

export default WithPopup(ButtonsRow);

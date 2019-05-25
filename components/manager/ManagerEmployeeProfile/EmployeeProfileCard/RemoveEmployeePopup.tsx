import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Employee } from 'types';

interface Props {
  employee: Employee;
  onRemovePress: () => void;
  closePopup: () => void;
}

const RemoveEmployeePopup = (props: Props) => {
  const { closePopup, employee, onRemovePress } = props;

  const handleRemovePress = () => {
    closePopup();
    onRemovePress();
  };

  return (
    <UI.View style={styles.popupContainer}>
      <UI.Text size="large" style={styles.popupHeader}>
        Are you sure you want to remove {employee.name}?
      </UI.Text>
      <UI.View style={styles.popupButtonsRow}>
        <UI.Button onPress={handleRemovePress} style={styles.popupRemoveButton}>
          Remove
        </UI.Button>
        <UI.Button onPress={closePopup}>Cancel</UI.Button>
      </UI.View>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  popupContainer: {
    paddingTop: 20,
  },

  popupHeader: {
    textAlign: 'center',
    marginBottom: 30,
    color: appColors.grey.dark,
  },

  popupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  popupRemoveButton: {
    backgroundColor: appColors.darkRed,
  },
});

export default RemoveEmployeePopup;

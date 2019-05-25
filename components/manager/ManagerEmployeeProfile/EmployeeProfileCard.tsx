import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import WithPopup, { ShowPopupObject } from '../../../hoc/WithPopup';
import { Employee } from 'types';
import managerApi from 'services/ManagerApi';

interface Props {
  navigate: any;
  employee: Employee;
  showPopup: (showPopupObject: ShowPopupObject) => void;
  closePopup: () => void;
  fetchEmployees: () => void;
}

const InfoCard = (props: Props) => {
  const { navigate, employee, closePopup, showPopup, fetchEmployees } = props;

  const removeEmployee = () => {
    managerApi.removeEmployee(employee.id).then(() => {
      closePopup();
      fetchEmployees();
      navigate('ManagerEmployees');
    });
  };

  const renderRemoveEmployeePopup = () => {
    return (
      <UI.View style={styles.removePopupContainer}>
        <UI.Text size="large" style={styles.removePopupHeader}>
          Are you sure you want to remove {employee.name}?
        </UI.Text>
        <UI.View style={styles.removePopupButtonsRow}>
          <UI.Button
            onPress={removeEmployee}
            style={styles.removePopupRemoveButton}
          >
            Remove
          </UI.Button>
          <UI.Button onPress={closePopup}>Cancel</UI.Button>
        </UI.View>
      </UI.View>
    );
  };

  const renderTopContainer = () => {
    return (
      <UI.View style={styles.topContainer}>
        <UI.Card style={styles.avatarContainer}>
          <UI.MIcon name="person-outline" size={60} color="silver" />
        </UI.Card>
        <UI.View style={styles.infoRow}>
          <UI.View style={styles.nameText}>
            <UI.Text size="small" style={{ textAlign: 'right' }}>
              {employee.name}
            </UI.Text>
          </UI.View>
          <UI.View style={styles.nameUsernameDivider} />
          <UI.View style={styles.usernameText}>
            <UI.Text size="small">{employee.username}</UI.Text>
          </UI.View>
        </UI.View>
      </UI.View>
    );
  };

  const renderButtonsRow = () => {
    return (
      <UI.View style={styles.buttonsRow}>
        <UI.PlainButton style={{ ...styles.button, borderRightWidth: 1 }}>
          <UI.MCIcon style={styles.buttonIcon} name="account-edit" />
          <UI.Text weight="semibold">Edit</UI.Text>
        </UI.PlainButton>
        <UI.PlainButton
          onPress={() => showPopup({ content: renderRemoveEmployeePopup() })}
          style={styles.removeButton}
        >
          <UI.MCIcon style={styles.removeIcon} name="account-remove" />
          <UI.Text weight="semibold" style={styles.removeButtonText}>
            Remove
          </UI.Text>
        </UI.PlainButton>
      </UI.View>
    );
  };

  return (
    <UI.Card style={styles.card}>
      {renderTopContainer()}
      {renderButtonsRow()}
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

  topContainer: {
    borderBottomColor: appColors.grey.light,
    borderBottomWidth: 1,
    width: '90%',
    marginBottom: 10,
    paddingBottom: 10,
    flex: 5,
  },

  avatarContainer: {
    marginTop: 20,
    marginBottom: 20,
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
  },

  nameUsernameDivider: {
    borderRightWidth: UI.StyleSheet.hairlineWidth,
    borderRightColor: appColors.grey.regular,
    width: 1,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  nameText: {
    paddingRight: 15,
    flex: 1,
  },

  usernameText: {
    paddingLeft: 15,
    flex: 1,
  },

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

  removePopupContainer: {
    paddingTop: 20,
  },

  removePopupHeader: {
    textAlign: 'center',
    marginBottom: 30,
    color: appColors.grey.dark,
  },

  removePopupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  removePopupRemoveButton: {
    backgroundColor: appColors.darkRed,
  },
});

export default WithPopup(InfoCard);

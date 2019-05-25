import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Employee } from 'types';
import managerApi from 'services/ManagerApi';

interface Props {
  employee: Employee;
  closePopup: () => void;
  fetchEmployeeData: () => void;
}

interface State {
  name: string;
  password: string;
  passwordConfirmation: string;
  loading: boolean;
  error: string;
  [key: string]: any;
}

class EditEmployeePopup extends React.Component<Props, State> {
  state = {
    name: '',
    password: '',
    passwordConfirmation: '',
    loading: false,
    error: '',
  };

  componentDidMount() {
    const { name } = this.props.employee;
    this.setState({ name });
  }

  handleSavePress = async () => {
    const { name, password, passwordConfirmation } = this.state;
    if (!this.validateInput()) return;

    try {
      this.setState({ loading: true });
      await managerApi.editEmployee({
        name,
        password,
        passwordConfirmation,
        employeeId: this.props.employee.id,
      });
      this.props.fetchEmployeeData();
      this.props.closePopup();
    } catch (e) {
      console.log(e);
      this.setState({
        error: 'There was a problem updating the employee. Please try again.',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  validateInput() {
    this.setState({ error: '' });
    const { password, passwordConfirmation } = this.state;

    let isValid = true;
    if (password !== passwordConfirmation) {
      this.setState({ error: "Passwords don't match" });
      isValid = false;
    }
    return isValid;
  }

  render() {
    const { closePopup } = this.props;
    const { name, password, passwordConfirmation, error } = this.state;

    const setField = (fieldName: string) => (fieldValue: string) =>
      this.setState({ [fieldName]: fieldValue });

    return (
      <UI.KeyboardAwareScrollView style={styles.container}>
        <UI.Card style={styles.card}>
          <UI.Input
            label="Name"
            value={name}
            onChangeText={setField('name')}
            containerStyle={styles.inputContainer}
          />
          <UI.Input
            label="Password"
            value={password}
            placeholder="******"
            onChangeText={setField('password')}
            containerStyle={styles.inputContainer}
            secureTextEntry
          />
          <UI.Input
            label="Password Confirmation"
            value={passwordConfirmation}
            placeholder="******"
            onChangeText={setField('passwordConfirmation')}
            containerStyle={styles.inputContainer}
            secureTextEntry
          />
          <UI.ErrorText text={error} />
          <UI.View style={styles.buttonsRow}>
            <UI.Button onPress={this.handleSavePress} style={styles.saveButton}>
              Save
            </UI.Button>
            <UI.Button style={styles.cancelButton} onPress={closePopup}>
              Cancel
            </UI.Button>
          </UI.View>
        </UI.Card>
      </UI.KeyboardAwareScrollView>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {},

  card: {
    marginTop: '30%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginHorizontal: 20,
  },

  inputContainer: {
    marginBottom: 15,
  },

  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  saveButton: {},

  cancelButton: {
    backgroundColor: appColors.grey.regular,
  },
});

export default EditEmployeePopup;

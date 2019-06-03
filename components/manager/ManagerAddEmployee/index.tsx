import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import managerApi from 'services/ManagerApi';

interface Props {
  navigation: any;
}

interface State {
  name: string;
  username: string;
  password: string;
  passwordConfirmation: string;
  loading: boolean;
  error: string;
  [key: string]: any;
}

class ManagerAddEmployee extends React.Component<Props, State> {
  state = {
    name: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    loading: false,
    error: '',
  };

  handleSavePress = async () => {
    const { name, username, password, passwordConfirmation } = this.state;
    if (!this.validateInput()) return;

    try {
      this.setState({ loading: true });
      await managerApi.addEmployee({
        name,
        username,
        password,
        passwordConfirmation,
      });
      this.props.navigation.navigate('ManagerEmployees');
      this.props.navigation.state.params.fetchEmployees();
    } catch {
      this.setState({ error: 'Username is taken.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  validateInput() {
    this.setState({ error: '' });
    const { name, username, password, passwordConfirmation } = this.state;

    let isValid = true;
    if (!(name && username && password && passwordConfirmation)) {
      this.setState({ error: 'Please enter all fields.' });
      isValid = false;
    } else if (password !== passwordConfirmation) {
      this.setState({ error: "Passwords don't match" });
      isValid = false;
    }
    return isValid;
  }

  render() {
    const {
      name,
      username,
      password,
      passwordConfirmation,
      loading,
      error,
    } = this.state;

    const setField = (fieldName: string) => (fieldValue: string) =>
      this.setState({ [fieldName]: fieldValue });

    return (
      <UI.KeyboardAwareScrollView>
        <UI.View style={styles.container}>
          <UI.View style={styles.headerContainer}>
            <UI.BackHeader
              title="Add Employee"
              onBackPress={() => this.props.navigation.pop()}
            />
          </UI.View>
          <UI.Card style={styles.card}>
            <UI.Input
              label="Name"
              value={name}
              onChangeText={setField('name')}
              autoCapitalize="words"
              containerStyle={styles.inputContainer}
            />
            <UI.Input
              label="Username"
              value={username}
              onChangeText={setField('username')}
              containerStyle={styles.inputContainer}
            />
            <UI.Input
              label="Password"
              value={password}
              onChangeText={setField('password')}
              containerStyle={styles.inputContainer}
              secureTextEntry
            />
            <UI.Input
              label="Password Confirmation"
              value={passwordConfirmation}
              onChangeText={setField('passwordConfirmation')}
              containerStyle={styles.inputContainer}
              secureTextEntry
            />
            <UI.ErrorText text={error} />
            <UI.Button
              loading={loading}
              onPress={this.handleSavePress}
              style={styles.saveButton}
            >
              Save
            </UI.Button>
          </UI.Card>
        </UI.View>
      </UI.KeyboardAwareScrollView>
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
    marginBottom: 35,
    flexDirection: 'row',
  },

  card: {
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  inputContainer: {
    marginBottom: 15,
  },

  saveButton: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default ManagerAddEmployee;

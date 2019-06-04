import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { NavigationActions, StackActions } from 'react-navigation';
import { logoutManager } from 'modules/manager';
import WithPopup, { ShowPopupObject } from 'hoc/WithPopup';
import { connect } from 'react-redux';

interface State {}

interface Props {
  showPopup: (showPopupObject: ShowPopupObject) => void;
  closePopup: () => void;
  navigation: {
    navigate: any;
    pop: any;
    dispatch: any;
  };
  logoutManager: () => void;
}

class ManagerAccount extends React.Component<Props, State> {
  handleConfirmLogoutPress = () => {
    this.props.closePopup();
    this.props.logoutManager();

    this.props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'Home' })],
      })
    );
  };

  handleLogoutPress = () => {
    const { showPopup, closePopup } = this.props;
    const logoutPopupContent = () => (
      <UI.View>
        <UI.Text size="large" style={styles.logoutPopupHeader}>
          Are you sure you want to logout?
        </UI.Text>
        <UI.View style={styles.logoutPopupButtonsRow}>
          <UI.Button
            onPress={this.handleConfirmLogoutPress}
            style={styles.confirmLogoutButton}
          >
            Logout
          </UI.Button>
          <UI.Button onPress={closePopup}>Cancel</UI.Button>
        </UI.View>
      </UI.View>
    );

    showPopup({
      content: logoutPopupContent(),
    });
  };

  render() {
    const { navigation } = this.props;

    return (
      <UI.View style={styles.fullContainer}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader onBackPress={() => navigation.pop()} title="Account" />
        </UI.View>
        <UI.View style={styles.divider} />
        <UI.View style={styles.container}>
          <UI.Card style={styles.card}>
            <UI.Button
              onPress={() => navigation.navigate('ManageTrackedInventoryItems')}
              style={styles.button}
            >
              Manage Inventory Items
            </UI.Button>
            <UI.Button
              onPress={this.handleLogoutPress}
              style={{
                ...styles.button,
                ...{ backgroundColor: appColors.darkRed },
              }}
            >
              Logout
            </UI.Button>
          </UI.Card>
        </UI.View>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  fullContainer: {
    flex: 1,
    paddingTop: 40,
  },

  headerContainer: {
    marginHorizontal: '5%',
    paddingBottom: 20,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },

  container: {
    backgroundColor: appColors.background.regular,
    paddingHorizontal: '5%',
    paddingTop: 25,
  },

  card: {
    paddingTop: 30,
  },

  button: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '70%',
    marginBottom: 30,
  },

  logoutPopupHeader: {
    textAlign: 'center',
    marginBottom: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    color: appColors.grey.dark,
  },

  logoutPopupButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  confirmLogoutButton: {
    backgroundColor: appColors.darkRed,
  },
});

export default connect(
  null,
  { logoutManager }
)(WithPopup(ManagerAccount));

import React from 'react';
import * as UI from 'UI';
import { Employee } from 'types';
import appColors from 'constants/appColors';

interface Props {
  employee: Employee;
}

const TopContainer = (props: Props) => {
  const { employee } = props;

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

const styles = UI.StyleSheet.create({
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
});

export default TopContainer;

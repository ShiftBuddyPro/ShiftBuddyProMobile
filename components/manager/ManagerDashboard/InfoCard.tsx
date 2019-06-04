import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';

interface Props {
  navigate: any;
}

const InfoCard = (props: Props) => {
  const { navigate } = props;

  return (
    <UI.Card style={styles.card}>
      <UI.View style={styles.avatarAndInfoRow}>
        <UI.Card style={styles.avatarContainer}>
          <UI.MIcon name="person" size={75} color="silver" />
        </UI.Card>
        <UI.View>
          <UI.Text size="small">Usman Ghani</UI.Text>
          <UI.Text size="small">Cahaba Heights Texaco</UI.Text>
          <UI.Text size="small">3101 Cahaba Heights Road</UI.Text>
          <UI.Text size="small">Vestavia, AL 35243</UI.Text>
          <UI.PlainButton
            shadow="medium"
            onPress={() => navigate('ManagerAccount')}
            style={styles.editProfileButton}
          >
            <UI.Text style={{ textAlign: 'center' }} weight="semibold">
              Account
            </UI.Text>
          </UI.PlainButton>
        </UI.View>
      </UI.View>
      <UI.View style={styles.divider} />
      <UI.View style={styles.buttonsRow}>
        <UI.PlainButton
          onPress={() => navigate('ManagerEmployees')}
          style={{ ...styles.button, borderRightWidth: 1 }}
        >
          <UI.MIcon style={styles.buttonIcon} name="people-outline" />
          <UI.Text weight="semibold" style={styles.buttonText}>
            Employees
          </UI.Text>
          <UI.MIcon style={styles.buttonArrow} name="chevron-right" />
        </UI.PlainButton>
        <UI.PlainButton
          onPress={() => navigate('ManagerShifts')}
          style={styles.button}
        >
          <UI.MIcon name="list" style={styles.buttonIcon} />
          <UI.Text weight="semibold" style={styles.buttonText}>
            Shifts
          </UI.Text>
          <UI.MIcon style={styles.buttonArrow} name="chevron-right" />
        </UI.PlainButton>
      </UI.View>
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
    marginHorizontal: 20,
  },

  avatarAndInfoRow: {
    marginTop: 'auto',
    marginBottom: 'auto',
    flexDirection: 'row',
  },

  divider: {
    borderBottomColor: appColors.grey.light,
    borderBottomWidth: 1,
    width: '90%',
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },

  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 'auto',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
  },

  buttonsRow: {
    width: '90%',
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightColor: appColors.grey.light,
    paddingLeft: 5,
    paddingRight: 5,
  },

  buttonIcon: {
    fontSize: 20,
    color: appColors.orange,
  },

  buttonText: {
    marginRight: 'auto',
    marginLeft: 5,
  },

  buttonArrow: {
    fontSize: 20,
    color: appColors.orange,
  },
});

export default InfoCard;

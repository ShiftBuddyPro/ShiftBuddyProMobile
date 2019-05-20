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
        <UI.View style={styles.avatarContainer}>
          <UI.MIcon name="person" size={75} color="silver" />
        </UI.View>
        <UI.View>
          <UI.Text size="small">Usman Ghani</UI.Text>
          <UI.Text size="small">Cahaba Heights Texaco</UI.Text>
          <UI.Text size="small">3101 Cahaba Heights Road</UI.Text>
          <UI.Text size="small">Vestavia, AL 35243</UI.Text>
          <UI.PlainButton
            onPress={() => navigate('ManagerAccount')}
            style={styles.editProfileButton}
          >
            <UI.Text style={{ textAlign: 'center' }} weight="semibold">
              Edit Profile
            </UI.Text>
          </UI.PlainButton>
        </UI.View>
      </UI.View>
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
    flexDirection: 'row',
    borderBottomColor: appColors.grey.light,
    borderBottomWidth: 1,
    width: '90%',
    marginBottom: 10,
    paddingBottom: 35,
  },

  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    marginBottom: 'auto',
    marginTop: 'auto',
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },

  buttonsRow: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightColor: appColors.grey.light,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 5,
    paddingBottom: 5,
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

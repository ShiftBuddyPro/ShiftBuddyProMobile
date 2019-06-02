import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Shift } from 'types';
import moment from 'moment';
import { Platform } from 'react-native';

interface Props {
  shift: Shift;
  navigate: any;
}

const ShiftRow = (props: Props) => {
  const { shift, navigate } = props;
  const { created_at, employee_name } = shift.attributes;
  const date = new Date(created_at);
  const month = date.toLocaleString('en-us', { month: 'long' });
  const dayOfMonth = date.getDate().toString();
  const startTime = moment(date).format('hh:mm A');

  return (
    <UI.View style={styles.container}>
      <UI.View style={styles.avatarContainer}>
        <UI.Text size="small">
          {Platform.OS === 'ios' ? month : month.split(' ')[1]}
        </UI.Text>
        <UI.Text size="small">{dayOfMonth}</UI.Text>
      </UI.View>
      <UI.PlainButton
        onPress={() => navigate('ManagerShift', { shiftId: shift.id })}
        style={{ flex: 1 }}
      >
        <UI.Card style={styles.card}>
          <UI.View>
            <UI.Text style={{ marginBottom: 2 }}>{employee_name}</UI.Text>
            <UI.Text size="small">{startTime}</UI.Text>
          </UI.View>
          <UI.MIcon name="chevron-right" style={styles.rightArrow} />
        </UI.Card>
      </UI.PlainButton>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },

  avatarContainer: {
    marginLeft: 5,
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  avatar: {
    fontSize: 30,
    color: appColors.grey.regular,
  },

  card: {
    flex: 1,
    marginRight: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },

  rightArrow: {
    marginLeft: 'auto',
    fontSize: 25,
    alignSelf: 'center',
    color: appColors.orange,
  },
});

export default ShiftRow;

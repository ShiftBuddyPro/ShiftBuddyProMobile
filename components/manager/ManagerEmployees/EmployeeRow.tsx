import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import { Employee } from 'types';

interface Props {
  employee: Employee;
}

const EmployeeRow = (props: Props) => {
  const { employee } = props;

  return (
    <UI.View style={styles.container}>
      <UI.View style={styles.avatarContainer}>
        <UI.MIcon name="person-outline" style={styles.avatar} />
      </UI.View>
      <UI.PlainButton style={{ flex: 1 }}>
        <UI.Card style={styles.card}>
          <UI.Text>{employee.name}</UI.Text>
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
    width: 45,
    height: 45,
    borderRadius: 22.5,
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
    padding: 10,
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

export default EmployeeRow;

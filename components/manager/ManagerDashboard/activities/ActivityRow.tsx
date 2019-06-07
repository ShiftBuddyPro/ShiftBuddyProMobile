import React from 'react';
import * as UI from 'ui';
import { StyleSheet } from 'react-native';
import appColors from 'constants/appColors';
import { Activity } from 'types/';

interface Props {
  activity: Activity;
}

export enum ActivityType {
  Note = 1,
  PaidOut,
  CashDrop,
  Check,
}

const getIcon = (activityType: ActivityType) => {
  switch (activityType) {
    case ActivityType.Note:
      return <UI.MIcon color="#fafafa" size={25} name="event-note" />;
    case ActivityType.PaidOut:
      return <UI.Icon color="#fafafa" size={25} name="money" />;
    case ActivityType.CashDrop:
      return <UI.Icon color="#fafafa" size={25} name="envelope-open-o" />;
    case ActivityType.Check:
      return <UI.MCIcon color="#fafafa" size={25} name="book-open-page-variant" />;
  }
};

const ActivityRow = (props: Props) => {
  const { activity } = props;
  let activityType;
  if (activity.includes('wrote a note')) activityType = ActivityType.Note;
  else if (activity.includes('made a paid out'))
    activityType = ActivityType.PaidOut;
  else if (activity.includes('wrote a check'))
    activityType = ActivityType.Check;
  else activityType = ActivityType.CashDrop;

  let iconStyle;
  switch (activityType) {
    case ActivityType.Note:
      iconStyle = styles.noteIcon;
      break;
    case ActivityType.PaidOut:
      iconStyle = styles.paidOutIcon;
      break;
    case ActivityType.Check:
      iconStyle = styles.checkIcon;
      break;
    case ActivityType.CashDrop:
      iconStyle = styles.cashDropIcon;
      break;
  }

  return (
    <UI.View style={styles.container}>
      <UI.View style={{ ...styles.iconContainer, ...iconStyle }}>
        {getIcon(activityType)}
      </UI.View>
      <UI.Card style={styles.card}>
        <UI.Text size="small">{activity}</UI.Text>
      </UI.Card>
    </UI.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 15,
  },

  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
  },

  noteIcon: {
    backgroundColor: appColors.orange,
  },

  checkIcon: {
    backgroundColor: appColors.primary.regular,
  },

  cashDropIcon: {
    backgroundColor: appColors.yellow,
  },

  paidOutIcon: {
    backgroundColor: appColors.success.regular,
  },
});

export default ActivityRow;

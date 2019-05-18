import React from 'react';
import * as UI from 'ui';
import ActivityRow, { ActivityType } from './ActivityRow';

interface Props {}

const activities = [
  {
    activityType: ActivityType.Note,
    activityMessage: 'Taimur wrote a note: "Need Ice!"',
  },
  {
    activityType: ActivityType.Note,
    activityMessage: 'Taimur wrote a note: "Out of Marlboro Light."',
  },
  {
    activityType: ActivityType.PaidOut,
    activityMessage: 'Taimur made a paid out of $25.00 to Golden Flake.',
  },
  {
    activityType: ActivityType.Check,
    activityMessage: 'Arham wrote a check for $256.34 to Coke.',
  },
  {
    activityType: ActivityType.CashDrop,
    activityMessage: 'Arham made a cash drop of $100.00 in envelope #2.',
  },
];

const Activities = (props: Props) => {
  return (
    <UI.View style={{ flex: 3 }}>
      <UI.Text
        style={{ marginBottom: 15, paddingHorizontal: 20 }}
        weight="semibold"
        size="large"
      >
        Recent Activities
      </UI.Text>
      <UI.ScrollView style={{ flex: 1 }}>
        <UI.View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          {activities.map(activity => (
            <ActivityRow
              key={activity.activityMessage}
              activityType={activity.activityType}
              activityMessage={activity.activityMessage}
            />
          ))}
        </UI.View>
      </UI.ScrollView>
    </UI.View>
  );
};

export default Activities;

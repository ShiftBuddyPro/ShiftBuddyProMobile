import React from 'react';
import * as UI from 'ui';
import ActivityRow from './ActivityRow';
import { Activity } from 'types';

interface Props {
  activities: Activity[];
}

const Activities = (props: Props) => {
  const { activities } = props;
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
          {activities.map((activity, i) => (
            <ActivityRow key={activity + i} activity={activity} />
          ))}
        </UI.View>
      </UI.ScrollView>
    </UI.View>
  );
};

export default Activities;

import React, { Component } from 'react';
import { Header, Title, Right, Body } from 'native-base';
import { connect } from 'react-redux';
import * as UI from 'ui';
import axios from 'axios';
import { StyleSheet } from 'react-native';
import { AsyncStorage } from 'react-native';
import ManagerApi from 'services/ManagerApi';
import { Employee, Shift } from 'types';
import appColors from 'constants/appColors';
import ActivityRow, { ActivityType } from './ActivityRow';

interface State {
  activities: any;
}

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
  return activities.map(activity => (
    <ActivityRow
      key={activity.activityMessage}
      activityType={activity.activityType}
      activityMessage={activity.activityMessage}
    />
  ));
};

export default Activities;

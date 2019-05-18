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

interface Props {
  activityType: ActivityType;
  activityMessage: 'string';
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
      return <UI.MIcon size={25} name="event-note" />;
    case ActivityType.PaidOut:
      return <UI.Icon size={25} name="money" />;
    case ActivityType.CashDrop:
      return <UI.Icon size={25} name="envelope-open-o" />;
    case ActivityType.Check:
      return <UI.MCIcon size={25} name="book-open-page-variant" />;
  }
};

const ActivityRow = (props: Props) => {
  const { activityType, activityMessage } = props;
  return (
    <UI.View style={styles.container}>
      <UI.View style={styles.iconContainer}>{getIcon(activityType)}</UI.View>
      <UI.Card style={styles.card}>
        <UI.Text size="small">{activityMessage}</UI.Text>
      </UI.Card>
    </UI.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 45,
  },

  iconContainer: {
    width: 45,
    height: 45,
    backgroundColor: 'gainsboro',
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
});

export default ActivityRow;

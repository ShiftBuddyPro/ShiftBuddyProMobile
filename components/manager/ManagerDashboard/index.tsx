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
import Activities from './activities';

interface State {
  activities: any;
}

interface Props {}

export class ManagerDashboard extends Component<Props, State> {
  state = {
    activities: [],
  };

  async componentDidMount() {
    const activities = await ManagerApi.getActivityLogs();
  }

  render() {
    const { employees } = this.state;

    return (
      <UI.View style={styles.fullContainer}>
        <Header>
          <Body>
            <Title>Dashboard</Title>
          </Body>
        </Header>
        <UI.ScrollView contentContainerStyle={styles.container}>
          <UI.Card
            style={{
              flex: 2,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10,
            }}
          >
            <UI.View
              style={{
                flexDirection: 'row',
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                width: '90%',
                marginBottom: 10,
                paddingBottom: 15,
              }}
            >
              <UI.View style={styles.avatarContainer}>
                <UI.MIcon name="person" size={75} color="silver" />
              </UI.View>
              <UI.View>
                <UI.Text size="small">Usman Ghani</UI.Text>
                <UI.Text size="small">Cahaba Heights Texaco</UI.Text>
                <UI.Text size="small">3101 Cahaba Heights Road</UI.Text>
                <UI.Text size="small">Vestavia, AL 35243</UI.Text>
                <UI.View style={styles.editProfileButton}>
                  <UI.Text style={{ textAlign: 'center' }} weight="semibold">
                    Edit Profile
                  </UI.Text>
                </UI.View>
              </UI.View>
            </UI.View>
            <UI.View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <UI.View style={{ ...styles.button, borderRightWidth: 1 }}>
                <UI.MIcon color="grey" name="people-outline" size={20} />
                <UI.Text
                  weight="semibold"
                  style={{ marginRight: 'auto', marginLeft: 5 }}
                >
                  Employees
                </UI.Text>
                <UI.MIcon color="grey" name="chevron-right" size={20} />
              </UI.View>
              <UI.View style={styles.button}>
                <UI.MIcon color="grey" name="list" size={20} />
                <UI.Text
                  weight="semibold"
                  style={{ marginRight: 'auto', marginLeft: 5 }}
                >
                  Shifts
                </UI.Text>
                <UI.MIcon color="grey" name="chevron-right" size={20} />
              </UI.View>
            </UI.View>
          </UI.Card>
          <UI.View style={{ flex: 3 }}>
            <UI.Text
              style={{ marginBottom: 15 }}
              weight="semibold"
              size="large"
            >
              Recent Activities
            </UI.Text>
            <Activities />
          </UI.View>
        </UI.ScrollView>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f5f7fa',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  topContainer: {
    flex: 1,
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

  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRightColor: 'grey',
    paddingLeft: 5,
    paddingRight: 5,
  },

  card: {
    flex: 3,
    marginHorizontal: 5,
    borderRadius: 5,
    padding: 10,
  },

  middleContainer: {
    flex: 2,
  },
});

const mapStateToProps = state => ({
  manager: state.manager,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDashboard);

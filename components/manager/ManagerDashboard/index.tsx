import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UI from 'ui';
import Activities from './Activities';
import InfoCard from './InfoCard';
import appColors from 'constants/appColors';
import { Activity, Manager, Business } from 'types';
import managerApi from 'services/ManagerApi';

interface State {
  activities: Activity[];
  manager: Manager;
  business: Business;
  loading: boolean;
}

interface Props {
  navigation: {
    navigate: any;
  };
  manager: Manager;
}

export class ManagerDashboard extends Component<Props, State> {
  state = {
    activities: [],
    manager: {
      id: -1,
      type: 'manager' as Manager['type'],
      attributes: {
        name: '',
        email: '',
      },
    },
    business: {
      id: -1,
      type: 'business' as Business['type'],
      attributes: {
        address1: '',
        city: '',
        name: '',
        state: '',
        zip_code: '',
      },
    },
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const { manager, business } = await managerApi.getCurrentManager();
    const activities: Activity[] = await managerApi.getActivityLogs();
    this.setState({ activities, manager, business, loading: false });
  }

  render() {
    const { activities, loading } = this.state;
    if (loading) return <UI.LoadingScreen />;

    return (
      <UI.View style={styles.fullContainer}>
        <UI.BasicHeader title={'Manager Dashboard'} />
        <UI.View style={styles.container}>
          <InfoCard
            manager={this.state.manager}
            navigate={this.props.navigation.navigate}
          />
          <Activities activities={activities} />
        </UI.View>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: appColors.background.regular,
  },

  container: {
    flex: 1,
    paddingTop: 20,
  },
});

const mapStateToProps = state => ({
  manager: state.manager.managerData,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDashboard);

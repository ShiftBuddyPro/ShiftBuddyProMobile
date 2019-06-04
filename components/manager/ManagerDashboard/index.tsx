import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as UI from 'ui';
import ManagerApi from 'services/ManagerApi';
import Activities from './Activities';
import InfoCard from './InfoCard';
import appColors from 'constants/appColors';

interface State {
  activities: any;
}

interface Props {
  navigation: {
    navigate: any;
  };
}

export class ManagerDashboard extends Component<Props, State> {
  state = {
    activities: [],
  };

  async componentDidMount() {
    const activities = await ManagerApi.getActivityLogs();
  }

  render() {
    return (
      <UI.View style={styles.fullContainer}>
        <UI.BasicHeader title={'Manager Dashboard'} />
        <UI.View style={styles.container}>
          <InfoCard navigate={this.props.navigation.navigate} />
          <Activities />
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
  manager: state.manager,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDashboard);

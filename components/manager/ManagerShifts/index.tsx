import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import managerApi from 'services/ManagerApi';
import { Shift } from 'types';
import ShiftRow from './ShiftRow';

interface State {
  shifts: Shift[];
}

interface Props {
  navigation: any;
}

class ManagerEmployees extends React.Component<Props, State> {
  state = {
    shifts: [],
  };

  async componentDidMount() {
    const shifts: Shift[] = await managerApi.getShifts();
    this.setState({ shifts });
  }

  render() {
    const { shifts } = this.state;
    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title="Shifts"
            onBackPress={() => this.props.navigation.pop()}
          />
        </UI.View>
        <UI.List
          data={shifts}
          renderItem={({ item }) => (
            <ShiftRow navigate={this.props.navigation.navigate} shift={item} />
          )}
          keyExtractor={(item: Shift) => item.id.toString()}
        />
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    marginTop: '10%',
    marginHorizontal: '5%',
    flex: 1,
  },

  headerContainer: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: appColors.grey.regular,
    marginBottom: 20,
  },
});

export default ManagerEmployees;

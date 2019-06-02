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
        <UI.View style={styles.divider} />
        <UI.View
          style={{
            backgroundColor: appColors.background.regular,
            flex: 1,
            paddingHorizontal: '5%',
          }}
        >
          <UI.List
            style={{ paddingTop: 15 }}
            data={shifts}
            renderItem={({ item }) => (
              <ShiftRow
                navigate={this.props.navigation.navigate}
                shift={item}
              />
            )}
            keyExtractor={(item: Shift) => item.id.toString()}
          />
        </UI.View>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },

  headerContainer: {
    marginHorizontal: '5%',
    paddingBottom: 10,
    marginBottom: 10,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },
});

export default ManagerEmployees;

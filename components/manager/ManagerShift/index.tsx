import React from 'react';
import * as UI from 'ui';
import managerApi from 'services/ManagerApi';
import { Shift } from 'types';
import appColors from 'constants/appColors';

interface Props {
  navigation: {
    pop: () => void;
    state: {
      params: {
        shiftId: number;
      };
    };
  };
}

interface State {
  shift: Shift;
  loading: boolean;
}

class ManagerShift extends React.Component<Props, State> {
  state = {
    shift: '',
    loading: false,
  };

  componentDidMount() {}

  fetchShift = async () => {
    const { shiftId } = this.props.navigation.state.params;
    this.setState({ loading: true });
    const shift = await managerApi.getShift(shiftId);
    this.setState({ shift, loading: false });
  };

  render() {
    return (
      <UI.View style={styles.container}>
        <UI.BackHeader
          title="Shift"
          onBackPress={() => this.props.navigation.pop()}
        />
        <UI.Text>Shift goes here</UI.Text>
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
    marginBottom: 35,
    flexDirection: 'row',
  },
});

export default ManagerShift;

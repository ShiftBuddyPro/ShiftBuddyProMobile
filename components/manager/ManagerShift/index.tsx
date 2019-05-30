import React from 'react';
import * as UI from 'ui';
import managerApi from 'services/ManagerApi';
import { Shift, Note, PaidOut, Check, InventoryItem, ChangeSheet } from 'types';
import appColors from 'constants/appColors';
import moment from 'moment';

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
  shift: CompleteShift;
  loading: boolean;
}

interface CompleteShift {
  attributes: Shift['attributes'];
  notes: Note[];
  paidOuts: PaidOut[];
  checks: Check[];
  inventoryItems: InventoryItem[];
  changeSheet: ChangeSheet;
}

class ManagerShift extends React.Component<Props, State> {
  state = {
    shift: {
      attributes: {
        created_at: new Date(),
        employee_id: 0,
        employee_name: '',
        id: 0,
      },
      notes: [],
      paidOuts: [],
      checks: [],
      inventoryItems: [],
      changeSheet: {
        id: 0,
        type: 'change_sheet' as ChangeSheet['type'],
        attributes: {
          start_pennies: 0,
          start_nickels: 0,
          start_dimes: 0,
          start_quarters: 0,
          start_ones: 0,
          start_fives: 0,
          start_tens: 0,
          start_twenties: 0,

          end_pennies: 0,
          end_nickels: 0,
          end_dimes: 0,
          end_quarters: 0,
          end_ones: 0,
          end_fives: 0,
          end_tens: 0,
          end_twenties: 0,
        },
      },
    },
    loading: false,
  };

  componentDidMount() {
    this.fetchShift();
  }

  fetchShift = async () => {
    const { shiftId } = this.props.navigation.state.params;
    this.setState({ loading: true });
    const shift = await managerApi.getShift(shiftId);
    this.setState({ shift, loading: false });
  };

  render() {
    const { created_at: shiftStart } = this.state.shift.attributes;
    const shiftStartDate = moment(shiftStart).format('MMMM Do YYYY');
    const shiftStartTime = moment(shiftStart).format('h:mm:ss a');
    const shiftSubheader = `${shiftStartTime} - `;

    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title={shiftStartDate}
            subheader={shiftSubheader}
            onBackPress={() => this.props.navigation.pop()}
          />
        </UI.View>
        <UI.ScrollView>
          <UI.Text size="large" weight="bold">
            Paid Outs
          </UI.Text>
        </UI.ScrollView>
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
    marginBottom: 15,
    flexDirection: 'row',
  },
});

export default ManagerShift;

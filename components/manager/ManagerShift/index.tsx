import React from 'react';
import * as UI from 'ui';
import managerApi from 'services/ManagerApi';
import { Shift, Note, PaidOut, Check, InventoryItem, ChangeSheet } from 'types';
import CashDrops from './CashDrops';
import Change from './Change';
import Checks from './Checks';
import inventoryItems from './InventoryItems';
import Notes from './Notes';
import PaidOuts from './PaidOuts';
import appColors from 'constants/appColors';
import moment from 'moment';
import InventoryItems from './InventoryItems';

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
      cashDrops: [],
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
    const {
      cashDrops,
      checks,
      paidOuts,
      notes,
      inventoryItems,
      changeSheet,
    } = this.state.shift;
    const shiftStartDate = moment(shiftStart).format('MMMM Do YYYY');
    const shiftStartTime = moment(shiftStart).format('h:mm:ss a');
    const shiftSubheader = `${shiftStartTime} - `;

    const shiftComponents = [
      <CashDrops cashDrops={cashDrops} />,
      <Checks checks={checks} />,
      <PaidOuts paidOuts={paidOuts} />,
      <Notes notes={notes} />,
      <InventoryItems inventoryItems={inventoryItems} />,
      <Change changeSheet={changeSheet} />,
    ];

    return (
      <UI.View style={styles.container}>
        <UI.View style={styles.headerContainer}>
          <UI.PlainButton
            style={{ marginBottom: 10 }}
            onPress={() => this.props.navigation.pop()}
          >
            <UI.MIcon
              color={appColors.primary.light}
              name="arrow-back"
              size={30}
            />
          </UI.PlainButton>
          <UI.Text size="large" weight="bold">
            {shiftStartDate}
          </UI.Text>
          <UI.Text
            style={{ color: appColors.grey.dark }}
            size="medium"
            weight="semibold"
          >
            {shiftSubheader}
          </UI.Text>
        </UI.View>
        <UI.ScrollView>
          {shiftComponents.map((ShiftComponent, i) => (
            <UI.Card style={styles.card} key={i}>
              {ShiftComponent}
            </UI.Card>
          ))}
        </UI.ScrollView>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    marginTop: '10%',
    flex: 1,
  },

  headerContainer: {
    marginHorizontal: '5%',
    borderBottomWidth: 1,
    paddingBottom: 10,
    borderBottomColor: appColors.grey.regular,
    marginBottom: 15,
  },

  card: {
    marginHorizontal: '5%',
    marginBottom: 15,
    padding: 10,
  },
});

export default ManagerShift;
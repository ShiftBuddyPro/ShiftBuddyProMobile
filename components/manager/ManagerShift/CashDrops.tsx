import React from 'react';
import * as UI from 'ui';
import { CashDrop } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';
import moment from 'moment';

interface Props {
  cashDrops: CashDrop[];
}

const CashDrops = (props: Props) => {
  const { cashDrops } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={{ textAlign: 'left', flex: 1 }}>
        Number
      </UI.Text>
      <UI.Text weight="regular" style={{ textAlign: 'right', flex: 1 }}>
        Amount
      </UI.Text>
      <UI.Text weight="regular" style={{ textAlign: 'right', flex: 1.5 }}>
        Time
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    cashDrops.reverse().map(cashDrop => {
      const { number, amount, created_at } = cashDrop.attributes;
      const time = moment(created_at).format('h:m a');

      return (
        <UI.View key={cashDrop.id} style={styles.dataRow}>
          <UI.Text style={{ textAlign: 'left', flex: 1 }}>
            {number.toString()}
          </UI.Text>
          <UI.View style={{ flex: 1, flexDirection: 'row' }}>
            <UI.Text style={{ paddingLeft: 10 }}>$</UI.Text>
            <UI.Text variant="table-number">
              {amount.toFixed(2).toString()}
            </UI.Text>
          </UI.View>
          <UI.Text style={{ flex: 1.5, textAlign: 'right' }}>{time}</UI.Text>
        </UI.View>
      );
    });

  const renderTotalAmount = () => {
    const totalAmount = cashDrops.reduce(
      (acc, current) => acc + current.attributes.amount,
      0
    );
    return (
      <UI.View style={{ flexDirection: 'row', marginTop: 15 }}>
        <UI.Text weight="regular">Total Amount: </UI.Text>
        <UI.Text weight="semibold">
          ${totalAmount.toFixed(2).toString()}
        </UI.Text>
      </UI.View>
    );
  };

  return (
    <UI.View>
      <SectionHeader title="Cash Drops" />
      <UI.View style={styles.tableContainer}>
        {renderLabels()}
        {renderDataRows()}
        {renderTotalAmount()}
      </UI.View>
    </UI.View>
  );
};

const styles = UI.StyleSheet.create({
  tableContainer: {
    marginHorizontal: '5%',
  },

  labelsRow: {
    flexDirection: 'row',
    marginBottom: 7.5,
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },

  dataRow: {
    flexDirection: 'row',
    marginBottom: 3.5,
  },

  label: {
    flex: 1,
    textAlign: 'right',
    marginRight: 'auto',
  },

  data: {
    flex: 1,
    textAlign: 'right',
    marginRight: 'auto',
  },
});

export default CashDrops;

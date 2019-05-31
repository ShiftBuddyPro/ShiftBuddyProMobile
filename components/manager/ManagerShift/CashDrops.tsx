import React from 'react';
import * as UI from 'ui';
import { CashDrop } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  cashDrops: CashDrop[];
}

const CashDrops = (props: Props) => {
  const { cashDrops } = props;

  return (
    <UI.View>
      <SectionHeader title="Cash Drops" />
      <UI.View style={styles.tableContainer}>
        <UI.View style={styles.labelsRow}>
          <UI.Text weight="regular" style={styles.label}>
            Number
          </UI.Text>
          <UI.Text weight="regular" style={styles.label}>
            Amount
          </UI.Text>
        </UI.View>
        {cashDrops.map(cashDrop => (
          <UI.View key={cashDrop.id} style={styles.dataRow}>
            <UI.Text style={styles.data}>
              {cashDrop.attributes.number.toString()}
            </UI.Text>
            <UI.Text style={styles.data}>
              ${cashDrop.attributes.amount.toFixed(2).toString()}
            </UI.Text>
          </UI.View>
        ))}
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
  },

  data: {
    flex: 1,
  },
});

export default CashDrops;

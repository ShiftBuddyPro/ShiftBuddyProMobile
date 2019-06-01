import React from 'react';
import * as UI from 'ui';
import { PaidOut } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  paidOuts: PaidOut[];
}

const PaidOuts = (props: Props) => {
  const { paidOuts } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={styles.label}>
        Company
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Amount
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    paidOuts.map(paidOut => {
      const { company, amount } = paidOut.attributes;
      return (
        <UI.View key={paidOut.id} style={styles.dataRow}>
          <UI.Text style={styles.data}>{company}</UI.Text>
          <UI.Text style={styles.data}>${amount.toFixed(2).toString()}</UI.Text>
        </UI.View>
      );
    });

  return (
    <UI.View>
      <SectionHeader title="Paid Outs" />
      <UI.View style={styles.tableContainer}>
        {renderLabels()}
        {renderDataRows()}
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
    marginBottom: 5,
  },

  label: {
    flex: 1,
  },

  data: {
    flex: 1,
  },
});

export default PaidOuts;

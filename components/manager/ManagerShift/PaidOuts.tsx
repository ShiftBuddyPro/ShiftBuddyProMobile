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
      <UI.Text weight="regular" style={styles.companyLabel}>
        Company
      </UI.Text>
      <UI.Text weight="regular" style={styles.amountLabel}>
        Amount
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    paidOuts.map(paidOut => {
      const { company, amount } = paidOut.attributes;
      return (
        <UI.View key={paidOut.id} style={styles.dataRow}>
          <UI.Text style={styles.companyData}>{company}</UI.Text>
          <UI.View style={styles.amountData}>
            <UI.Text>$</UI.Text>
            <UI.Text variant="table-number">
              {amount.toFixed(2).toString()}
            </UI.Text>
          </UI.View>
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

  companyLabel: {
    flex: 2,
  },

  amountLabel: {
    flex: 1,
    textAlign: 'right',
  },

  companyData: {
    flex: 2,
  },

  amountData: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default PaidOuts;

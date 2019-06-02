import React from 'react';
import * as UI from 'ui';
import { Check } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  checks: Check[];
}

const Checks = (props: Props) => {
  const { checks } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={{ flex: 2 }}>
        Company
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Amount
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Number
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    checks.map(check => {
      const { company, amount, number } = check.attributes;
      return (
        <UI.View key={check.id} style={styles.dataRow}>
          <UI.Text style={{ flex: 2 }}>{company}</UI.Text>
          <UI.View style={{ flex: 1, flexDirection: 'row' }}>
            <UI.Text>$</UI.Text>
            <UI.Text variant="table-number">
              {amount.toFixed(2).toString()}
            </UI.Text>
          </UI.View>
          <UI.Text variant="table-number" style={{ flex: 1 }}>
            {number.toString()}
          </UI.Text>
        </UI.View>
      );
    });

  const renderTotalAmount = () => {
    const totalAmount = checks.reduce(
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
      <SectionHeader title="Checks" />
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
    marginBottom: 5,
  },

  label: {
    textAlign: 'right',
    flex: 1,
  },

  data: {
    flex: 1,
  },
});

export default Checks;

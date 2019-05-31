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

  return (
    <UI.View>
      <SectionHeader title="Checks" />
      <UI.View style={styles.tableContainer}>
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
        {checks.map(check => (
          <UI.View key={check.id} style={styles.dataRow}>
            <UI.Text style={{ flex: 2 }}>{check.attributes.company}</UI.Text>
            <UI.Text style={styles.data}>
              ${check.attributes.amount.toFixed(2).toString()}
            </UI.Text>
            <UI.Text style={styles.data}>
              {check.attributes.number.toString()}
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
    marginBottom: 5,
  },

  label: {
    flex: 1,
  },

  data: {
    flex: 1,
  },
});

export default Checks;

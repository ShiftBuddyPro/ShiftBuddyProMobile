import React from 'react';
import * as UI from 'ui';
import { ChangeSheet } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  changeSheet: ChangeSheet;
}

const Change = (props: Props) => {
  const { changeSheet } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={{ flex: 3 }}>
        Type
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Start
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        End
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Diff
      </UI.Text>
    </UI.View>
  );

  const changeTypes = [
    'pennies',
    'nickels',
    'dimes',
    'quarters',
    'ones',
    'fives',
    'tens',
    'twenties',
  ];

  const renderDataRows = () =>
    changeTypes.map(changeType => {
      const startAmount = changeSheet.attributes['start_' + changeType];
      const endAmount = changeSheet.attributes['end_' + changeType];
      const diff = endAmount - startAmount;
      const diffIsPositive = diff >= 0;
      const diffString = `${diffIsPositive ? '+' : '-'} ${Math.abs(diff)}`;

      return (
        <UI.View key={changeType} style={styles.dataRow}>
          <UI.Text style={{ flex: 3 }}>{toTitleCase(changeType)}</UI.Text>
          <UI.Text style={styles.data}>{startAmount.toString()}</UI.Text>
          <UI.Text style={styles.data}>{endAmount.toString()}</UI.Text>
          <UI.Text
            style={{
              flex: 1,
              textAlign: 'center',
              color: diffIsPositive
                ? appColors.success.regular
                : appColors.darkRed,
            }}
          >
            {diff !== 0 ? diffString : '-'}
          </UI.Text>
        </UI.View>
      );
    });

  return (
    <UI.View>
      <SectionHeader title="Change" />
      <UI.View style={styles.tableContainer}>
        {renderLabels()}
        {renderDataRows()}
      </UI.View>
    </UI.View>
  );
};

const toTitleCase = (string: string) =>
  string.charAt(0).toUpperCase() + string.slice(1);

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
    textAlign: 'center',
    flex: 1,
  },

  data: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Change;

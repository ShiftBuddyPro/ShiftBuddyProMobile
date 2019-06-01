import React from 'react';
import * as UI from 'ui';
import { InventoryItem } from 'types';
import SectionHeader from './SectionHeader';
import appColors from 'constants/appColors';

interface Props {
  inventoryItems: InventoryItem[];
}

const InventoryItems = (props: Props) => {
  const { inventoryItems } = props;

  const renderLabels = () => (
    <UI.View style={styles.labelsRow}>
      <UI.Text weight="regular" style={{ flex: 3 }}>
        Name
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

  const renderDataRows = () =>
    inventoryItems.map(inventoryItem => {
      const { name, start_amount, end_amount } = inventoryItem.attributes;
      const diff = end_amount - start_amount;
      const isPositive = diff >= 0;
      const positiveOrNegateDiff = `${isPositive ? '+' : '-'} ${Math.abs(
        diff
      ).toString()}`;
      return (
        <UI.View key={inventoryItem.id} style={styles.dataRow}>
          <UI.Text size="small" style={{ flex: 3 }}>
            {name}
          </UI.Text>
          <UI.Text size="small" variant="table-number" style={{ flex: 1 }}>
            {start_amount.toString()}
          </UI.Text>
          <UI.Text size="small" variant="table-number" style={{ flex: 1 }}>
            {end_amount.toString()}
          </UI.Text>
          <UI.Text
            size="small"
            variant="table-number"
            style={{
              flex: 1,
              color: isPositive ? appColors.success.regular : appColors.darkRed,
            }}
          >
            {diff !== 0 ? positiveOrNegateDiff : '-'}
          </UI.Text>
        </UI.View>
      );
    });

  return (
    <UI.View>
      <SectionHeader title="Inventory Items" />
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
    textAlign: 'right',
    flex: 1,
  },

  data: {
    flex: 1,
  },
});

export default InventoryItems;

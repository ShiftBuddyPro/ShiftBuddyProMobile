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
        In
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Out
      </UI.Text>
      <UI.Text weight="regular" style={styles.label}>
        Sold
      </UI.Text>
    </UI.View>
  );

  const renderDataRows = () =>
    inventoryItems.map(inventoryItem => {
      const { name, start_amount, end_amount } = inventoryItem.attributes;
      const amountSold = end_amount - start_amount;
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
          <UI.Text size="small" variant="table-number" style={{ flex: 1 }}>
            {amountSold.toString()}
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

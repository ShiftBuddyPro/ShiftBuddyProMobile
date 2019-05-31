import React from 'react';
import * as UI from 'ui';
import { InventoryItem } from 'types';
import SectionHeader from './SectionHeader';

interface Props {
  inventoryItems: InventoryItem[];
}

const InventoryItems = (props: Props) => {
  return (
    <UI.View>
      <SectionHeader title="Inventory Items" />
    </UI.View>
  );
};

export default InventoryItems;

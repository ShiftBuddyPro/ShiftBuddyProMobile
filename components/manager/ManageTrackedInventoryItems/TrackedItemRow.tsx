import React from 'react';
import * as UI from 'ui';
import { TrackedItem } from 'types/';
import appColors from 'constants/appColors';

interface Props {
  trackedItem: TrackedItem;
  removeItem: (id: TrackedItem['id']) => void;
}

const TrackedItemRow = (props: Props) => {
  const { trackedItem, removeItem } = props;

  return (
    <UI.Card style={styles.card}>
      <UI.Text style={styles.itemName}>{trackedItem.name}</UI.Text>
      <UI.PlainButton
        style={styles.deleteButton}
        onPress={() => removeItem(trackedItem.id)}
      >
        <UI.MCIcon
          size={24}
          name="trash-can-outline"
          color={appColors.darkRed}
        />
      </UI.PlainButton>
    </UI.Card>
  );
};

const styles = UI.StyleSheet.create({
  card: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 20,
    marginHorizontal: 15,
    alignItems: 'center',
  },

  itemName: {},

  deleteButton: {
    marginLeft: 'auto',
  },
});

export default TrackedItemRow;

import React from 'react';
import * as UI from 'ui';

interface Props {
  itemName: string;
  onChangeText: (value: string) => void;
  addItem: () => void;
}

const TrackedItemInput = (props: Props) => {
  const { itemName, onChangeText, addItem } = props;

  return (
    <UI.Card style={styles.card}>
      <UI.Text style={{ marginBottom: 15 }} size="medium" weight="semibold">
        Add Tracked Item
      </UI.Text>
      <UI.Input
        label="Item Name"
        value={itemName}
        onChangeText={onChangeText}
      />
      <UI.Button onPress={addItem} style={styles.button}>
        Add Item
      </UI.Button>
    </UI.Card>
  );
};

const styles = UI.StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 5,
    marginHorizontal: 15,
  },

  button: {
    marginTop: 5,
    marginLeft: 'auto',
  },
});

export default TrackedItemInput;

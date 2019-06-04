import React from 'react';
import * as UI from 'ui';
import appColors from 'constants/appColors';
import managerApi from 'services/ManagerApi';
import TrackedItemInput from './TrackedItemInput';
import TrackedItemRow from './TrackedItemRow';
import { TrackedItem } from 'types';

interface Props {
  navigation: {
    navigate: () => void;
    pop: () => void;
  };
}

interface State {
  trackedItems: TrackedItem[];
  loading: boolean;
  itemName: string;
}

class ManageTrackedInventoryItems extends React.Component<Props, State> {
  state = {
    trackedItems: [],
    loading: true,
    itemName: '',
  };

  componentDidMount() {
    this.fetchTrackedItems();
  }

  fetchTrackedItems = () =>
    managerApi
      .getTrackedItems()
      .then((trackedItems: TrackedItem[]) =>
        this.setState({ trackedItems, loading: false })
      );

  addTrackedItem = () =>
    managerApi.addTrackedItem(this.state.itemName).then(this.fetchTrackedItems);

  removeTrackedItem = (id: TrackedItem['id']) =>
    managerApi.deleteTrackedItem(id).then(this.fetchTrackedItems);

  render() {
    if (this.state.loading) return <UI.LoadingScreen />;

    const { itemName } = this.state;
    const { navigation } = this.props;
    const { trackedItems } = this.state;
    return (
      <UI.View style={styles.fullContainer}>
        <UI.View style={styles.headerContainer}>
          <UI.BackHeader
            title="Inventory Items"
            onBackPress={() => navigation.pop()}
          />
        </UI.View>
        <UI.View style={styles.divider} />
        <UI.View style={styles.container}>
          <TrackedItemInput
            onChangeText={itemName => this.setState({ itemName })}
            itemName={itemName}
            addItem={this.addTrackedItem}
          />
          <UI.List
            style={{ paddingVertical: 15, flex: 1 }}
            data={trackedItems}
            keyExtractor={(item: TrackedItem) => item.id.toString()}
            renderItem={({ item }) => (
              <TrackedItemRow
                removeItem={this.removeTrackedItem}
                trackedItem={item}
              />
            )}
          />
        </UI.View>
      </UI.View>
    );
  }
}

const styles = UI.StyleSheet.create({
  fullContainer: {
    marginTop: 40,
    flex: 1,
  },

  container: {
    backgroundColor: appColors.background.regular,
    paddingTop: 15,
    flex: 1,
  },

  headerContainer: {
    marginHorizontal: '5%',
    paddingBottom: 10,
    marginBottom: 10,
  },

  divider: {
    borderBottomWidth: 1,
    borderBottomColor: appColors.grey.regular,
  },
});

export default ManageTrackedInventoryItems;

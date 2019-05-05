import React, { Component } from 'react';
import {
  Container,
  View,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Form,
  Item,
  Label,
  Input,
} from 'native-base';
import { TextInput, FlatList, ScrollView } from 'react-native';
import BackButton from '../../common/BackButton';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';
import { ManagerApi } from 'services';
import { connect } from 'react-redux';

export class TrackedItems extends Component {
  state = {
    itemInputOn: false,
    itemName: '',
    trackedItems: [],
  };

  componentDidMount() {
    ManagerApi.getTrackedItems()
      .then(trackedItems => this.setState({ trackedItems }))
      .catch(err => err);
  }

  showInput() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 15,
          marginLeft: 10,
          marginRight: 10,
        }}
      >
        <TextInput
          style={{
            flex: 7,
            marginRight: 5,
            borderRadius: 999,
            paddingLeft: 10,
            borderColor: 'grey',
            borderWidth: 1,
          }}
          onChangeText={itemName => this.setState({ itemName })}
          value={this.state.itemName}
          placeholder="Item Name"
        />
        <Button
          onPress={() => this.addItem(this.state.itemName)}
          rounded
          style={{ flex: 2, alignSelf: 'flex-end' }}
        >
          <Text style={{ marginLeft: 'auto', marginRight: 'auto' }}>Add</Text>
        </Button>
      </View>
    );
  }

  async addItem(itemName) {
    try {
      const trackedItem = await ManagerApi.addTrackedItem(itemName);
      this.setState({
        trackedItems: [...this.state.trackedItems, trackedItem],
      });
    } catch (err) {
      return err;
    }
  }

  deleteItem(id, index) {
    const newArray = [...this.state.trackedItems];
    newArray.splice(index, 1);
    ManagerApi.deleteTrackedItem(id)
      .then(_ => this.setState({ trackedItems: newArray }))
      .catch(err => err);
  }

  emptyView() {
    return (
      <Text
        style={{
          fontSize: 12,
          fontStyle: 'italic',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        You currently do not have any tracked inventory items set.
      </Text>
    );
  }

  renderTrackedItems() {
    const renderTrackedItem = (item, index) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            paddingTop: 15,
            paddingBottom: 15,
            borderTopWidth: index == 0 ? 1 : 0,
            borderColor: 'grey',
          }}
        >
          <Text style={{ marginLeft: 10 }}>{item.name}</Text>
          <Button
            danger
            small
            style={{ marginLeft: 'auto', marginRight: 10 }}
            onPress={() => this.deleteItem(item.id, index)}
          >
            <Text>Remove</Text>
          </Button>
        </View>
      );
    };

    return (
      <FlatList
        data={this.state.trackedItems}
        renderItem={({ item, index }) => renderTrackedItem(item, index)}
        keyExtractor={item => item.id.toString() + item.name}
      />
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <BackButton />
          <Body>
            <Title>Items</Title>
          </Body>
          <Right>
            <FontAwesome
              onPress={() =>
                this.setState({ itemInputOn: !this.state.itemInputOn })
              }
              style={{ marginRight: 20 }}
              name="plus-circle"
              size={25}
              color="orange"
            />
          </Right>
        </Header>
        <Content>
          {this.state.itemInputOn ? this.showInput() : null}
          <ScrollView style={{ marginTop: 30 }}>
            {this.state.trackedItems.length == 0
              ? this.emptyView()
              : this.renderTrackedItems()}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  manager: state.manager,
});

export default connect(mapStateToProps)(TrackedItems);

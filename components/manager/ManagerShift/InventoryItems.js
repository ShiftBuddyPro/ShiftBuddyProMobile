import React, { Component } from "react";
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
  CardItem
} from "native-base";
import axios from "axios";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export default class InventoryItems extends Component {
  state = {
    inventoryItems: []
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/v1/shifts/${
          this.props.shiftId
        }/inventory_items`
      )
      .then(res => {
        this.setState({ inventoryItems: res.data });
      })
      .catch(err => console.log(err));
  }

  inventoryItemsView() {
    return (
      <View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 5,
            borderTopWidth: 2,
            borderBottomWidth: 2,
            borderColor: "black"
          }}
        >
          <Text style={{ flexBasis: 50, textAlign: "center" }}>Start</Text>
          <Text style={{ flexBasis: 150, textAlign: "center" }}>Item Name</Text>
          <Text style={{ flexBasis: 50, textAlign: "center" }}>End</Text>
          <Text style={{ flexBasis: 50, textAlign: "center" }}>Sold</Text>
        </View>
        {this.state.inventoryItems.map(inventoryItem => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
                borderBottomWidth: 1,
                borderColor: "gray",
                marginBottom: 5,
                marginTop: 5
              }}
            >
              <Text style={{ flexBasis: 50, textAlign: "center" }}>
                {inventoryItem.start_amount}
              </Text>
              <Text style={{ flexBasis: 150, textAlign: "center" }}>
                {inventoryItem.name}
              </Text>
              <Text style={{ flexBasis: 50, textAlign: "center" }}>
                {inventoryItem.end_amount ? inventoryItem.end_amount : "-"}
              </Text>
              <Text style={{ flexBasis: 50, textAlign: "center" }}>
                {inventoryItem.end_amount
                  ? inventoryItem.start_amount - inventoryItem.end_amount
                  : "-"}
              </Text>
            </View>
          );
        })}
      </View>
    );
  }

  emptyView() {
    return (
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 12, fontStyle: "italic" }}
        >
          No Inventory Items
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginBottom: 25 }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "24",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 25,
              textAlign: "center",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            Inventory Items
          </Text>
        </View>
        {this.state.inventoryItems.length == 0
          ? this.emptyView()
          : this.inventoryItemsView()}
      </View>
    );
  }
}

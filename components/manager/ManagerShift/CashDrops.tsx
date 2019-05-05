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
import { Entypo } from "@expo/vector-icons";

export default class CashDrops extends Component {
  state = {
    cashDrops: []
  };

  componentDidMount() {
    axios
      .get(
        `https://shiftbuddypro.com/api/v1/shifts/${this.props.shiftId}/cash_drops`
      )
      .then(res => {
        this.setState({ cashDrops: res.data });
      })
      .catch(err => console.log(err));
  }

  cashDropsView() {
    return this.state.cashDrops.map(cashDrop => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Entypo name="triangle-right" color="orange" size="20" />
          <Text>#{cashDrop.number}: </Text>
          <Text style={{ fontWeight: "bold" }}>${cashDrop.amount}</Text>
        </View>
      );
    });
  }

  emptyView() {
    return (
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 12, fontStyle: "italic" }}
        >
          No Cash Drops
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
              fontSize: 24,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 0,
              backgroundColor: "white",
              width: "100%",
              textAlign: "center"
            }}
          >
            Cash Drops
          </Text>
        </View>
        <View style={{ marginTop: 15 }}>
          {this.state.cashDrops.length == 0
            ? this.emptyView()
            : this.cashDropsView()}
        </View>
      </View>
    );
  }
}

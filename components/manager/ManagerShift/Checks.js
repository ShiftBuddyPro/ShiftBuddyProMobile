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

export default class Checks extends Component {
  state = {
    checks: []
  };

  componentDidMount() {
    axios
      .get(
        `http://www.shiftbuddypro.com/api/v1/shifts/${
          this.props.shiftId
        }/checks`
      )
      .then(res => {
        this.setState({ checks: res.data });
      })
      .catch(err => console.log(err));
  }

  checksView() {
    return this.state.checks.map(check => {
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 2 }} />
          <View style={{ flex: 8, flexDirection: "row" }}>
            <Entypo name="triangle-right" color="orange" size="20" />
            <Text>
              {check.number}-{check.company}: ${check.amount}
            </Text>
          </View>
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
          No Checks
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
              textAlign: "center",
              width: "100%",
              backgroundColor: "white",
              marginBottom: 15
            }}
          >
            Checks
          </Text>
        </View>
        {this.state.checks.length == 0 ? this.emptyView() : this.checksView()}
      </View>
    );
  }
}

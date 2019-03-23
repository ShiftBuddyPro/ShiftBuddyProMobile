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

export default class Change extends Component {
  state = {
    change: {}
  };

  componentDidMount() {
    axios
      .get(
        `http://www.shiftbuddypro.com/api/v1/shifts/${
          this.props.shiftId
        }/change_sheet`
      )
      .then(res => {
        this.setState({ change: res.data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const changeTypes = [
      "Pennies",
      "Nickels",
      "Dimes",
      "Quarters",
      "Ones",
      "Fives",
      "Tens",
      "Twenties"
    ];
    return (
      <View style={{ marginBottom: 25 }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 15,
              textAlign: "center",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            Change
          </Text>
        </View>
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
          <Text style={{ flexBasis: 100, textAlign: "center" }}>
            Change Type
          </Text>
          <Text style={{ flexBasis: 50, textAlign: "center" }}>End</Text>
          <Text style={{ flexBasis: 50, textAlign: "center" }}>Used</Text>
        </View>
        <View>
          {changeTypes.map(changeType => {
            const start_amount = this.state.change[
              `start_${changeType.toLowerCase()}`
            ];
            const end_amount = this.state.change[
              `end_${changeType.toLowerCase()}`
            ];
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  marginBottom: 5,
                  marginTop: 5,
                  borderBottomColor: "grey",
                  borderBottomWidth: 1
                }}
                key={start_amount + end_amount + changeType}
              >
                <Text style={{ flexBasis: 50, textAlign: "center" }}>
                  {start_amount}
                </Text>
                <Text style={{ flexBasis: 100, textAlign: "center" }}>
                  {changeType}
                </Text>
                <Text style={{ flexBasis: 50, textAlign: "center" }}>
                  {end_amount}
                </Text>
                <Text style={{ flexBasis: 50, textAlign: "center" }}>
                  {start_amount - end_amount}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    );
  }
}

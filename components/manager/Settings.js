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

export default class Settings extends Component {
  render() {
    return (
      <View>
        <View style={{ marginBottom: 35 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 24,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            Settings
          </Text>
        </View>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <Button
            style={{ marginBottom: 25 }}
            full
            warning
            onPress={() => this.props.navigate("TrackedItems")}
          >
            <Text>Tracked Inventory Items</Text>
          </Button>
          <Button full danger onPress={() => this.props.navigate("Home")}>
            <Text>Log Out</Text>
          </Button>
        </View>
      </View>
    );
  }
}

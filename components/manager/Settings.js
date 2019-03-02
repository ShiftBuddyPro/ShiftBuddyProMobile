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
        <View>
          <Button
            full
            warning
            onPress={() => this.props.navigate("TrackedItems")}
          >
            <Text>Tracked Inventory Items</Text>
          </Button>
        </View>
      </View>
    );
  }
}

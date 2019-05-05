import React, { Component } from "react";
import {
  Container,
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
  View,
  Form,
  Item,
  Input
} from "native-base";
import { StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import BackButton from "../../common/BackButton";
import axios from "axios";
import {
  setInventoryItemField,
  getInventoryItems
} from "../../../modules/employeeShift";
import { unshowInventory } from "../../../modules/employeeShift";
import EmployeeApi from "../../../services/EmployeeApi";

export class Inventory extends Component {
  state = {
    currentIndex: 0,
    currentValue: 0,
    inventoryItems: []
  };

  componentDidMount() {
    const { id } = this.props.employeeShift;
    EmployeeApi.getInventory(id)
      .then(inventoryItems => {
        this.setState({ inventoryItems });
      })
      .catch(err => {
        console.log(err);
      });
  }

  emptyInventoryView() {
    return (
      <Text
        style={{
          textAlign: "center",
          marginTop: "40%",
          fontStyle: "italic"
        }}
      >
        No Inventory Items
      </Text>
    );
  }

  inventoryView(item, field) {
    return (
      <View style={{ flex: 1, marginLeft: "auto", marginRight: "auto" }}>
        <Text
          style={{
            fontSize: 12,
            color: "orange",
            fontWeight: "500",
            marginTop: 25,
            marginLeft: "auto"
          }}
        >
          {this.state.currentIndex + 1}/{this.state.inventoryItems.length}
        </Text>
        <Text
          style={{
            marginTop: 10,
            marginBottom: 60,
            fontSize: 12,
            fontStyle: "italic"
          }}
        >
          Please enter the{" "}
          {this.props.employeeShift.inventoryItemField == "start_amount" ? (
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              starting amount{" "}
            </Text>
          ) : (
            <Text style={{ fontSize: 13, fontWeight: "500" }}>
              ending amount{" "}
            </Text>
          )}
          of the item below
        </Text>
        <Text style={{ marginLeft: "auto", marginRight: "auto" }}>
          <Text style={{ fontWeight: "500", fontSize: 30 }}>{item.name}: </Text>
          <Text style={{ color: "orange", fontSize: 30, fontWeight: "500" }}>
            {this.state.currentValue}
          </Text>
        </Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 60,
            marginBottom: 30
          }}
        >
          <View>
            <Button
              danger
              style={{ borderRadius: 10 }}
              onPress={() => this.decrementValue(1)}
            >
              <Text style={{ fontWeight: "900" }}>-</Text>
            </Button>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>- 1 -</Text>
          </View>
          <View>
            <Button
              success
              style={{ borderRadius: 10 }}
              onPress={() => this.incrementValue(1)}
            >
              <Text style={{ fontWeight: "900" }}>+</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30,
            marginBottom: 30
          }}
        >
          <View>
            <Button
              danger
              style={{ borderRadius: 10 }}
              onPress={() => this.decrementValue(5)}
            >
              <Text style={{ fontWeight: "900" }}>-</Text>
            </Button>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>- 5 -</Text>
          </View>
          <View>
            <Button
              success
              style={{ borderRadius: 10 }}
              onPress={() => this.incrementValue(5)}
            >
              <Text style={{ fontWeight: "900" }}>+</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 30
          }}
        >
          <View>
            <Button
              danger
              style={{ borderRadius: 10 }}
              onPress={() => this.decrementValue(10)}
            >
              <Text style={{ fontWeight: "900" }}>-</Text>
            </Button>
          </View>
          <View style={{ marginLeft: 30, marginRight: 30 }}>
            <Text style={{ fontWeight: "500", fontSize: 20 }}>- 10 -</Text>
          </View>
          <View>
            <Button
              success
              style={{ borderRadius: 10 }}
              onPress={() => this.incrementValue(10)}
            >
              <Text style={{ fontWeight: "900" }}>+</Text>
            </Button>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 60
          }}
        >
          {this.continueOrDoneButton(item.id)}
        </View>
      </View>
    );
  }

  continueOrDoneButton(itemId) {
    if (this.state.currentIndex == this.state.inventoryItems.length - 1) {
      return (
        <Button
          style={{
            width: 200,
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "orange",
            borderStyle: "solid"
          }}
          transparent
          warning
          onPress={() => this.putLastItem(itemId)}
        >
          <Text style={{ fontWeight: "700" }}>Done</Text>
        </Button>
      );
    } else {
      return (
        <Button
          style={{
            width: 200,
            justifyContent: "center",
            borderWidth: 3,
            borderColor: "orange",
            borderStyle: "solid"
          }}
          transparent
          warning
          onPress={() => this.putItem(itemId)}
        >
          <Text style={{ fontWeight: "700" }}>Next</Text>
        </Button>
      );
    }
  }

  putItem(itemId) {
    let field = this.props.employeeShift.inventoryItemField;
    params = {};
    params["inventory_item"] = {};
    params["inventory_item"][field] = this.state.currentValue;

    EmployeeApi.updateInventory(itemId, params).then(() => {
      this.setState({
        currentIndex: this.state.currentIndex + 1,
        currentValue: 0
      });
    });
  }

  putLastItem(itemId) {
    let field = this.props.employeeShift.inventoryItemField;
    params = {};
    params["inventory_item"] = {};
    params["inventory_item"][field] = this.state.currentValue;
    EmployeeApi.updateInventory(itemId, params).then(() => {
      this.setState({
        currentIndex: 0,
        currentValue: 0
      });
      this.props.navigation.pop();
      if (this.props.employeeShift.inventoryItemField == "end_amount") {
        this.props.unshowInventory();
      }
      this.props.setInventoryItemField("end_amount");
    });
  }

  incrementValue(amt) {
    this.setState({ currentValue: this.state.currentValue + amt });
  }

  decrementValue(amt) {
    if (this.state.currentValue - amt < 0) {
      this.setState({ currentValue: 0 });
    } else {
      this.setState({ currentValue: this.state.currentValue - amt });
    }
  }

  showBackButton() {
    if (this.state.currentIndex == 0) {
      return <BackButton />;
    } else {
      return <Left style={{ flex: 1 }} />;
    }
  }
  render() {
    const inventoryItems = this.state.inventoryItems;
    return (
      <Container>
        <Header>
          {this.showBackButton()}
          <Body style={{ flex: 1 }}>
            <Title>Inventory</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content>
          {this.state.inventoryItems.length == 0
            ? this.emptyInventoryView()
            : this.inventoryView(
                inventoryItems[this.state.currentIndex],
                this.props.employeeShift.inventoryItemField
              )}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  employee: state.employee,
  employeeShift: state.employeeShift
});

const mapDispatchToProps = {
  getInventoryItems,
  setInventoryItemField,
  unshowInventory
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Inventory);

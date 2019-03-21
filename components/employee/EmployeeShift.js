import React, { Component } from "react";
import {
  View,
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
  Card,
  CardItem
} from "native-base";
import BackButton from "../common/BackButton";
import { StyleSheet, Alert } from "react-native";
import { connect } from "react-redux";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import PaidOuts from "./employeeShift/PaidOuts";
import CashDrops from "./employeeShift/CashDrops";
import Checks from "./employeeShift/Checks";
import Notes from "./employeeShift/Notes";
import { showInventory } from "../../modules/employeeShift";
import EmployeeApi from "../../services/EmployeeApi";

class EmployeeShift extends Component {
  state = {
    currentPage: "PaidOut"
  };

  currentPage() {
    switch (this.state.currentPage) {
      case "CashDrop": {
        return <CashDrops />;
      }
      case "PaidOut": {
        return <PaidOuts />;
      }
      case "Check": {
        return <Checks />;
      }
      case "Note": {
        return <Notes />;
      }
    }
  }

  inventoryButton() {
    return (
      <Button style={style.button}>
        <MaterialCommunityIcons
          name="clipboard-flow"
          size={50}
          color="orange"
          onPress={() => this.props.navigation.navigate("Inventory")}
        />
        <Text style={style.buttonText}>Inventory</Text>
      </Button>
    );
  }

  handleEndShift() {
    Alert.alert("End Shift", "Are you sure you would like to end your shift?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      {
        text: "End Shift",
        onPress: () => {
          EmployeeApi.completeShift(this.props.employeeShift.id)
            .then(() => {
              this.props.navigation.navigate("EmployeeDashboard");
            })
            .catch(err => console.log(err));
        }
      }
    ]);
  }

  render() {
    const { employee } = this.props.employee;
    const { employeeShift } = this.props;
    return (
      <Container>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1, marginLeft: "auto", marginRight: "auto" }}>
            <Title>Shift Report</Title>
          </Body>
          <Right style={{ flex: 1 }}>
            <Text
              onPress={() => this.handleEndShift()}
              style={{
                color: "white",
                fontSize: 12,
                backgroundColor: "red",
                padding: 5,
                fontWeight: "bold",
                borderRadius: 8,
                overflow: "hidden"
              }}
            >
              End Shift{"  "}
              <FontAwesome name="send-o" />
            </Text>
          </Right>
        </Header>
        <Content
          contentContainerStyle={{
            flex: 1,
            backgroundColor: "seashell"
          }}
        >
          <View style={style.view}>{this.currentPage()}</View>

          <View
            style={{
              marginTop: 20,
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            <Button
              style={style.button}
              onPress={() => this.setState({ currentPage: "CashDrop" })}
            >
              <FontAwesome name="envelope" size={50} color="orange" />
              <Text style={style.buttonText}>Cash Drops</Text>
            </Button>
            <Button
              style={style.button}
              onPress={() => this.setState({ currentPage: "Check" })}
            >
              <FontAwesome name="book" size={50} color="orange" />
              <Text style={style.buttonText}>Checks</Text>
            </Button>
            <Button
              style={style.button}
              onPress={() => this.setState({ currentPage: "PaidOut" })}
            >
              <FontAwesome name="money" size={50} color="orange" />
              <Text style={style.buttonText}>Paid Outs</Text>
            </Button>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "space-around"
            }}
          >
            {this.props.employeeShift.showInventory
              ? this.inventoryButton()
              : null}
            <Button
              style={style.button}
              onPress={() => this.props.navigation.navigate("Change")}
            >
              <MaterialCommunityIcons name="coin" size={50} color="orange" />
              <Text style={style.buttonText}>Change</Text>
            </Button>
            <Button
              style={style.button}
              onPress={() => this.setState({ currentPage: "Note" })}
            >
              <FontAwesome name="pencil-square-o" size={50} color="orange" />
              <Text style={style.buttonText}>Notes</Text>
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  button: {
    flexDirection: "column",
    width: 120,
    height: 100,
    justifyContent: "center",
    backgroundColor: "seashell"
  },
  buttonText: {
    color: "black"
  },
  view: {
    flex: 8,
    backgroundColor: "white",
    marginTop: 10,
    shadowOpacity: 0.75,
    marginLeft: 5,
    marginRight: 5,
    shadowRadius: 5,
    shadowColor: "grey",
    shadowOffset: { height: 0, width: 0 },
    borderColor: "#ddd",
    borderRadius: 2,
    borderWidth: 2
  }
});

const mapStateToProps = state => ({
  employee: state.employee,
  employeeShift: state.employeeShift
});

const mapDispatchToProps = {
  showInventory
};

export default connect(mapStateToProps)(EmployeeShift);

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
  Card,
  CardItem
} from "native-base";
import { connect } from "react-redux";
import BackButton from "../common/BackButton";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Home from "./Home";
import Shifts from "./Shifts";
import Employees from "./Employees";
import Settings from "./Settings";

export class ManagerDashboard extends Component {
  state = {
    currentPage: "Employees"
  };

  currentPage() {
    switch (this.state.currentPage) {
      case "Home": {
        return <Home />;
      }
      case "Shifts": {
        return <Shifts navigate={this.props.navigation.navigate} />;
      }
      case "Employees": {
        return <Employees />;
      }
      case "Settings": {
        return <Settings navigate={this.props.navigation.navigate} />;
      }
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right>
            <FontAwesome
              onPress={() => this.setState({ currentPage: "Settings" })}
              style={{ marginRight: 25 }}
              name="cog"
              size={25}
              color="orange"
            />
          </Right>
        </Header>
        <Content
          contentContainerStyle={{ backgroundColor: "seashell", flex: 1 }}
        >
          <View
            style={{
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
              borderWidth: 2,
              paddingBottom: 10
            }}
          >
            {this.currentPage()}
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Button
              onPress={() => this.setState({ currentPage: "Home" })}
              style={style.button}
            >
              <FontAwesome name="list-alt" size={50} color="orange" />
            </Button>

            <Button
              onPress={() => this.setState({ currentPage: "Shifts" })}
              style={style.button}
            >
              <FontAwesome name="file" size={43} color="orange" />
            </Button>

            <Button
              onPress={() => this.setState({ currentPage: "Employees" })}
              style={style.button}
            >
              <FontAwesome name="users" size={43} color="orange" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  button: {
    width: 120,
    height: 100,
    backgroundColor: "seashell",
    flexDirection: "column"
  }
});

const mapStateToProps = state => ({
  manager: state.manager
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManagerDashboard);

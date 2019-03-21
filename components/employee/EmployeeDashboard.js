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
  Card,
  CardItem
} from "native-base";
import BackButton from "../common/BackButton";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import {
  setCurrentShift,
  showInventory,
  setInventoryItemField
} from "../../modules/employeeShift";
import axios from "axios";
import { EmployeeApi } from "@services";
import { Alert } from "react-native";

class EmployeeDashboard extends Component {
  state = {
    date: new Date(),
    name: "",
    managerId: null
  };

  componentDidMount() {
    EmployeeApi.getEmployee()
      .then(employee => {
        this.setState({ name: employee.name, managerId: employee.manager_id });
      })
      .catch(err => err);

    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  onShiftCreate() {
    EmployeeApi.beginShift()
      .then(id => {
        this.props.setCurrentShift(id);
        this.props.showInventory();
        this.props.setInventoryItemField("start_amount");
        this.props.navigation.navigate("EmployeeShift");
      })
      .catch(err => err);
    // EmployeeShiftApi.axios
    //   .post(
    //     `http://localhost:8000/api/v1/managers/${
    //       this.props.employee.employee.attributes.manager_id
    //     }/employees/${this.props.employee.employee.id}}/shifts`
    //   )
    //   .then(res => {
    //     this.props.setCurrentShift(res.data.id);
    //     this.props.showInventory();
    //     this.props.setInventoryItemField("start_amount");
    //   })
    //   .then(this.props.navigation.navigate("EmployeeShift"))
    //   .catch(err => console.log(err));
  }

  handlePress() {
    Alert.alert("Confirm", "You are about to begin a new shift.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Ok", onPress: () => this.onShiftCreate() }
    ]);
  }

  render() {
    return (
      <Container>
        <Header>
          <BackButton />
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: "seashell" }}
        >
          <Card>
            <CardItem>
              <Body style={{ alignItems: "center" }}>
                <Text style={{ fontWeight: "bold", marginBottom: 10 }}>
                  Welcome {this.state.name}
                </Text>
                <FontAwesome name="user-circle" size={128} color="orange" />
              </Body>
            </CardItem>
          </Card>
          <Card style={{ marginTop: 50, paddingTop: 30, paddingBottom: 30 }}>
            <CardItem>
              <Body style={{ alignItems: "center" }}>
                <Button
                  onPress={() => this.handlePress()}
                  large
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: 20,
                    marginTop: 20
                  }}
                >
                  <Text>Begin Shift</Text>
                </Button>
                <Text>{this.state.date.toLocaleString()}</Text>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <Footer>
          <FooterTab>
            <Body>
              <Text />
            </Body>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  employee: state.employee
});

const mapDispatchToProps = {
  setCurrentShift,
  showInventory,
  setInventoryItemField
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeDashboard);

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
  Input,
  Picker
} from "native-base";
import { StyleSheet, TextInput } from "react-native";
import { connect } from "react-redux";
import BackButton from "../../common/BackButton";
import axios from "axios";
import { setChangeFields } from "../../../modules/employeeShift";

export class Change extends Component {
  state = {
    changeFields: this.props.employeeShift.changeFields
  };

  onSubmit() {
    axios
      .put(
        `http://localhost:8000/api/v1/shifts/${
          this.props.employeeShift.id
        }/change_sheet`,
        { change_sheet: this.props.employeeShift.changeFields }
      )
      .then(this.props.navigation.navigate("EmployeeShift"));
  }

  onValueChange(prefix, changeType, value) {
    changeField = prefix + changeType.toLowerCase();
    this.props.setChangeFields(changeField, value);
  }

  changeTypeInput(changeType) {
    const oneToTwelve = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const start = "start_" + changeType.toLowerCase();
    const end = "end_" + changeType.toLowerCase();
    const currentStartValue = this.props.employeeShift.changeFields[start];
    const currentEndValue = this.props.employeeShift.changeFields[end];
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: 20
        }}
      >
        <Button rounded warning style={{ flexBasis: 50 }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            onValueChange={this.onValueChange.bind(this, "start_", changeType)}
          >
            {oneToTwelve.map(num => (
              <Picker.Item label={num} value={num} />
            ))}
          </Picker>
        </Button>
        <Text
          style={{
            position: "relative",
            left: -55,
            color: "white",
            zIndex: 999,
            fontWeight: "bold"
          }}
        >
          {currentStartValue}
        </Text>
        <Text style={{ flexBasis: 100, textAlign: "center" }}>
          {changeType}
        </Text>
        <Text
          style={{
            position: "relative",
            right: -55,
            color: "white",
            zIndex: 999,
            fontWeight: "bold"
          }}
        >
          {currentEndValue}
        </Text>
        <Button rounded style={{ flexBasis: 50 }}>
          <Picker
            note
            mode="dropdown"
            style={{ width: 120 }}
            onValueChange={this.onValueChange.bind(this, "end_", changeType)}
          >
            {oneToTwelve.map(num => (
              <Picker.Item label={num} value={num} />
            ))}
          </Picker>
        </Button>
      </View>
    );
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
      <Container>
        <Header>
          <Left style={{ flex: 1 }} />
          <Body style={{ flex: 1 }}>
            <Title>Change</Title>
          </Body>
          <Right style={{ flex: 1 }} />
        </Header>
        <Content style={{ marginTop: 25 }}>
          <View
            style={{
              flex: "1",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: 25
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Start</Text>
            <Text style={{ fontWeight: "bold" }}>Change Type</Text>
            <Text style={{ fontWeight: "bold" }}>End</Text>
          </View>
          {changeTypes.map(changeType => this.changeTypeInput(changeType))}
          <Button
            transparent
            warning
            onPress={() => this.onSubmit()}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              width: 200,
              justifyContent: "center",
              borderWidth: 3,
              borderColor: "orange",
              borderStyle: "solid",
              marginTop: 20
            }}
          >
            <Text>Done</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return {
    employeeShift: state.employeeShift
  };
};

const mapDispatchToProps = {
  setChangeFields
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Change);

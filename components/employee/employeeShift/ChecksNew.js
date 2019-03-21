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
  Form,
  Item,
  Input,
  View
} from "native-base";
import { StyleSheet, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { addCheck } from "../../../modules/employeeShift";
import EmployeeApi from "../../../services/EmployeeApi";

export class ChecksNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      amount: "",
      number: ""
    };
  }

  onSubmit() {
    const { employee } = this.props.employee;
    const { id } = this.props.employeeShift;
    EmployeeApi.createCheck(id, this.state).then(() => {
      Alert.alert(
        "Check created",
        "A check has been added to your shift report.",
        [{ text: "Ok" }]
      );
      this.props.addCheck(this.state);
    });
  }

  render() {
    return (
      <View style={{ marginTop: 40 }}>
        <TextInput
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1
          }}
          onChangeText={company => this.setState({ company })}
          value={this.state.company}
        />
        <Text style={styles.label}>Company</Text>

        <TextInput
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1
          }}
          keyboardType="decimal-pad"
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount}
        />
        <Text style={styles.label}>Amount</Text>

        <TextInput
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1
          }}
          keyboardType="decimal-pad"
          onChangeText={number => this.setState({ number })}
          value={this.state.number}
        />
        <Text style={styles.label}>Number</Text>

        <Button onPress={() => this.onSubmit()} style={styles.submitButton}>
          <Text>Submit</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  label: {
    color: "grey"
  },
  submitButton: {
    alignSelf: "flex-end"
  }
});
const mapStateToProps = state => ({
  employee: state.employee,
  employeeShift: state.employeeShift
});

const mapDispatchToProps = {
  addCheck
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChecksNew);

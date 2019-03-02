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
import axios from "axios";
import { StyleSheet, TextInput, Alert } from "react-native";
import { connect } from "react-redux";
import { addCashDrop } from "../../../modules/employeeShift";

export class CashDropsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      amount: ""
    };
  }
  onSubmit() {
    const { employee } = this.props.employee;
    const { id } = this.props.employeeShift;
    axios
      .post(
        `http://localhost:8000/api/v1/managers/${
          employee.attributes.manager_id
        }/employees/${employee.id}/shifts/${id}/cash_drops`,
        this.state
      )
      .then(() => {
        Alert.alert(
          "Cash Drop created",
          "A cash drop has been added to your shift report.",
          [{ text: "Ok" }]
        );
        this.props.addCashDrop(this.state);
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
          onChangeText={number => this.setState({ number })}
          value={this.state.number}
          keyboardType="decimal-pad"
        />
        <Text style={styles.label}>Number</Text>

        <TextInput
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1
          }}
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount}
          keyboardType="decimal-pad"
        />
        <Text style={styles.label}>Amount</Text>
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
  addCashDrop
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashDropsNew);

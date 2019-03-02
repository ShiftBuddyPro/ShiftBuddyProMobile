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
import { addPaidOut } from "../../../modules/employeeShift";

export class PaidOutsNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
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
        }/employees/${employee.id}/shifts/${id}/paid_outs`,
        this.state
      )
      .then(() => {
        Alert.alert(
          "Paid Out created",
          "A paid out has been added to your shift report.",
          [{ text: "Ok" }]
        );
        this.props.addPaidOut(this.state);
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
  addPaidOut
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PaidOutsNew);

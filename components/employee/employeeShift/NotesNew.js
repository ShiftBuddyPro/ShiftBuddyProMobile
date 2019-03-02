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
import { addNote } from "../../../modules/employeeShift";

export class NotesNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      message: ""
    };
  }

  onSubmit() {
    const { employee } = this.props.employee;
    const { id } = this.props.employeeShift;
    axios
      .post(
        `http://localhost:8000/api/v1/managers/${
          employee.attributes.manager_id
        }/employees/${employee.id}/shifts/${id}/notes`,
        this.state
      )
      .then(() => {
        Alert.alert(
          "Note created",
          "A note has been added to your shift report.",
          [{ text: "Ok" }]
        );
        this.props.addNote(this.state);
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
          onChangeText={title => this.setState({ title })}
          value={this.state.title}
        />

        <Text style={styles.label}>
          Title
          <Text style={{ color: "grey", fontStyle: "italic", fontSize: 12 }}>
            {" "}
            (Optional)
          </Text>
        </Text>

        <TextInput
          style={{
            height: 40,
            width: 300,
            borderBottomWidth: 1
          }}
          onChangeText={message => this.setState({ message })}
          value={this.state.message}
        />
        <Text style={styles.label}>Message</Text>

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
  addNote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesNew);

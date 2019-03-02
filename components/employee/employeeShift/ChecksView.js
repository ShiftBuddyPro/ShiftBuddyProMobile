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

export class ChecksView extends Component {
  render() {
    const { checks } = this.props.employeeShift;
    if (checks.length == 0) {
      return (
        <View style={{ marginTop: 40 }}>
          <Body>
            <Text>No checks</Text>
          </Body>
        </View>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            flexWrap: 'wrap',
            marginTop: 20
          }}
        >
          {checks.map(check => {
            return (
              <View style={{ flexWrap: "wrap", alignSelf: "flex-start", margin: 1 }}
              >
                <Button
                  light
                >
                  <Text>
                    {check.number}: {check.company} ${check.amount}
                  </Text>
                </Button>
              </View>
            );
          })}
        </View>
      );
    }
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
  employeeShift: state.employeeShift
});

export default connect(mapStateToProps)(ChecksView);

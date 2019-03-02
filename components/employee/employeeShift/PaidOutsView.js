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

export class PaidOutsView extends Component {
  render() {
    const { paidOuts } = this.props.employeeShift;
    if (paidOuts.length == 0) {
      return (
        <View style={{ marginTop: 40 }}>
          <Body>
            <Text>No paid outs</Text>
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
          {paidOuts.map(paidOut => {
            return (
              <View style={{ flexWrap: "wrap", alignSelf: "flex-start", margin: 1 }}
              >
                <Button
                  light
                >
                  <Text>
                    {paidOut.company} ${paidOut.amount}
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

export default connect(mapStateToProps)(PaidOutsView);

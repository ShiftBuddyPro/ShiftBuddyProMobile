import React, { Component } from "react";
import { connect } from "react-redux";
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
import { StyleSheet, TextInput } from "react-native";
import CashDropsNew from "./CashDropsNew";
import CashDropsView from "./CashDropsView";

export class CashDrops extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: "view" //'new' or 'all'
    };
  }
  render() {
    const pageNew = this.state.currentPage == "new";
    return (
      <Body style={styles.container}>
        <Text style={styles.header}>Cash Drops</Text>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => this.setState({ currentPage: "view" })}
            light={pageNew}
            style={styles.button}
          >
            <Text>All</Text>
          </Button>
          <Button
            style={styles.button}
            onPress={() => this.setState({ currentPage: "new" })}
            light={!pageNew}
          >
            <Text>New</Text>
          </Button>
        </View>
        {pageNew ? <CashDropsNew /> : <CashDropsView />}
      </Body>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10
  },
  button: {
    flex: 2,
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CashDrops);

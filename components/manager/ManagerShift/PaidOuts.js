import React, { Component } from "react";
import {
  Container,
  View,
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
import axios from "axios";
import { connect } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

export class Shifts extends Component {
  state = {
    paidOuts: []
  };

  componentDidMount() {
    axios
      .get(
        `http://localhost:8000/api/v1/shifts/${this.props.shiftId}/paid_outs`
      )
      .then(res => {
        this.setState({ paidOuts: res.data });
      })
      .catch(err => console.log(err));
  }

  paidOutsView() {
    return this.state.paidOuts.map(paidOut => {
      return (
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 3 }} />
          <View style={{ flex: 7, flexDirection: "row" }}>
            <Entypo name="triangle-right" color="orange" size="20" />
            <Text>
              {paidOut.company}: ${paidOut.amount}
            </Text>
          </View>
        </View>
      );
    });
  }

  emptyView() {
    return (
      <View>
        <Text
          style={{ textAlign: "center", fontSize: 12, fontStyle: "italic" }}
        >
          No Paid Outs
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={{ marginBottom: 25 }}>
        <View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: "24",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: 15,
              textAlign: "center",
              width: "100%",
              backgroundColor: "white"
            }}
          >
            Paid Outs
          </Text>
        </View>
        {this.state.paidOuts.length == 0
          ? this.emptyView()
          : this.paidOutsView()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  manager: state.manager
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shifts);

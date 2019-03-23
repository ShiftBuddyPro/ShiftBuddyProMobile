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

export default class Notes extends Component {
  state = {
    notes: []
  };

  componentDidMount() {
    axios
      .get(
        `https://www.shiftbuddypro.com/api/v1/shifts/${
          this.props.shiftId
        }/notes`
      )
      .then(res => {
        this.setState({ notes: res.data });
      })
      .catch(err => console.log(err));
  }

  notesView() {
    return this.state.notes.map(note => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: 10,
            marginLeft: 10
          }}
          key={note.message}
        >
          <Entypo name="triangle-right" color="orange" size={20} />
          <Text style={{ fontWeight: "bold" }}>
            {note.title ? note.title + ": " : ""}
          </Text>
          <Text style={{ flexWrap: "wrap", flex: 1 }}>{note.message}</Text>
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
          No Notes
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
              fontSize: 24,
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              width: "100%",
              backgroundColor: "white",
              marginBottom: 15
            }}
          >
            Notes
          </Text>
        </View>
        {this.state.notes.length == 0 ? this.emptyView() : this.notesView()}
      </View>
    );
  }
}

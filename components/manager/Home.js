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
import { ScrollView, FlatList, List } from "react-native";
import { connect } from "react-redux";
import { ManagerApi } from "@services";

export class Home extends Component {
  state = {
    activities: [],
    errors: false
  };

  componentWillMount() {
    ManagerApi.getActivityLogs()
      .then(activities => this.setState({ activities }))
      .catch(err => this.setState({ errors: true }));
  }

  renderActivityItems() {
    const renderActivityItem = activity => {
      return (
        <Text
          key={activity}
          style={{
            color: "white",
            fontWeight: "bold",
            backgroundColor: "orange",
            padding: 15,
            margin: 10,
            borderRadius: 10,
            overflow: "hidden",
            width: "80%",
            alignSelf: "center"
          }}
        >
          {activity}
        </Text>
      );
    };

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          enableEmptySections
          automaticallyAdjustContentInsets={false}
          data={this.state.activities}
          renderItem={({ item }) => renderActivityItem(item)}
          keyExtractor={item => item}
        />
      </View>
    );
  }

  emptyView() {
    return (
      <View>
        <Text>No activities</Text>
      </View>
    );
  }

  render() {
    return (
      <ScrollView>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: 10,
            marginTop: 15
          }}
        >
          Activity Log
        </Text>

        {this.state.activities.length == 0
          ? this.emptyView()
          : this.renderActivityItems()}
      </ScrollView>
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
)(Home);

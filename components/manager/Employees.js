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
import { TextInput, FlatList, ScrollView } from "react-native";
import { ManagerApi } from "@services";

export class Employees extends Component {
  state = {
    employees: [],
    name: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    shouldShowInput: false
  };

  componentDidMount() {
    ManagerApi.getEmployees(this.props.manager.managerData.manager_id)
      .then(employees => this.setState({ employees }))
      .catch(err => this.setState({ errors: true }));
  }

  addEmployee() {
    const { manager_id } = this.props.manager.managerData;
    ManagerApi.addEmployee({ ...this.state, manager_id })
      .then(res =>
        this.setState({
          employees: [...this.state.employees, res.data],
          name: "",
          username: "",
          password: "",
          passwordConfirmation: "",
          shouldShowInput: false
        })
      )
      .catch(err => console.log(err));
  }

  deleteEmployee(id, index) {
    ManagerApi.deleteEmployee(id)
      .then(_ => {
        const newArray = [...this.state.employees];
        newArray.splice(index, 1);
        this.setState({ employees: newArray });
      })
      .catch(err => console.log(err));
  }

  renderNoEmployees() {
    return (
      <Text
        style={{
          fontSize: 12,
          fontStyle: "italic",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        There are no Employees in the system.
      </Text>
    );
  }

  renderEmployees() {
    const renderEmployee = (employee, index) => {
      return (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderTopWidth: index == 0 ? 0.5 : 0,
            borderColor: "grey",
            paddingTop: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
            height: 70
          }}
        >
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 18 }}>{employee.name}</Text>
            <Text style={{ fontSize: 14, color: "grey" }}>
              {employee.username}
            </Text>
          </View>
          <Button
            danger
            small
            style={{
              marginLeft: "auto",
              marginTop: "auto",
              marginBottom: "auto"
            }}
            onPress={() => this.deleteEmployee(employee.id, index)}
          >
            <Text>Remove</Text>
          </Button>
        </View>
      );
    };
    return (
      <FlatList
        data={this.state.employees}
        renderItem={({ item, index }) => renderEmployee(item, index)}
        keyExtractor={item => item.id.toString()}
      />
    );
  }

  addEmployeeView() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          marginLeft: "auto",
          marginRight: "auto"
        }}
      >
        <TextInput
          style={{
            height: 45,
            width: 300,
            borderRadius: 999,
            paddingLeft: 10,
            borderColor: "grey",
            borderWidth: 1,
            marginBottom: 15
          }}
          onChangeText={name => this.setState({ name })}
          value={this.state.name}
          placeholder="Name"
        />
        <TextInput
          style={{
            height: 45,
            width: 300,
            borderRadius: 999,
            paddingLeft: 10,
            borderColor: "grey",
            borderWidth: 1,
            marginBottom: 15
          }}
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
          placeholder="Username"
        />
        <TextInput
          style={{
            height: 45,
            width: 300,
            borderRadius: 999,
            paddingLeft: 10,
            borderColor: "grey",
            borderWidth: 1,
            marginBottom: 15
          }}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          placeholder="Password"
        />
        <TextInput
          style={{
            borderRadius: 999,
            paddingLeft: 10,
            borderColor: "grey",
            height: 45,
            width: 300,
            borderWidth: 1,
            marginBottom: 25
          }}
          onChangeText={passwordConfirmation =>
            this.setState({ passwordConfirmation })
          }
          value={this.state.passwordConfirmation}
          placeholder="Password Confirmation"
        />
        <Button
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
          onPress={() => this.addEmployee()}
        >
          <Text>Add</Text>
        </Button>
      </View>
    );
  }

  render() {
    if (!this.state.shouldShowInput) {
      return (
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginRight: 10
              }}
            >
              Employees
            </Text>
            <FontAwesome
              onPress={() =>
                this.setState({
                  shouldShowInput: !this.state.shouldShowInput
                })
              }
              name="user-plus"
              color="orange"
              size={25}
            />
          </View>
          <View style={{ marginTop: 25 }}>
            {this.state.employees.length == 0
              ? this.renderNoEmployees()
              : this.renderEmployees()}
          </View>
        </ScrollView>
      );
    } else {
      return (
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 15,
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginRight: 10
              }}
            >
              Employees
            </Text>
            <FontAwesome
              onPress={() =>
                this.setState({
                  shouldShowInput: !this.state.shouldShowInput
                })
              }
              name="users"
              color="orange"
              size={25}
            />
          </View>
          {this.addEmployeeView()}
        </View>
      );
    }
  }
}

const mapStateToProps = state => ({
  manager: state.manager
});

export default connect(mapStateToProps)(Employees);

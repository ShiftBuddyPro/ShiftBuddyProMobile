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
  Spinner,
  Text,
  Form,
  Item,
  Input
} from "native-base";
import BackButton from "../common/BackButton";
import { loginEmployee } from "../../modules/employee";
import { EmployeeApi } from "@services";
import { connect } from "react-redux";
import { setCurrentShift } from "../../modules/employeeShift";
class EmployeeLogin extends Component {
  state = {
    username: "John",
    password: "John",
    loading: false,
    errors: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.employee.isAuthenticated) {
      this.props.navigation.navigate("EmployeeDashboard");
    }
  }

  handlePress() {
    this.setState({ loading: true });
    EmployeeApi.login(this.state)
      .then(employeeId => {
        EmployeeApi.getEmployee().then(employee => {
          const { status, current_shift_id: shiftId } = employee;
          this.setState({ loading: false });
          if (shiftId && status === "working") {
            this.props.setCurrentShift(shiftId);
            this.props.navigation.navigate("EmployeeShift");
          } else
            this.props.navigation.navigate("EmployeeDashboard", { employeeId });
        });
      })
      .catch(err => {
        this.setState({ errors: true, loading: false });
      });
  }

  renderError() {
    if (!this.state.errors) return;

    return (
      <Text
        style={{
          color: "red",
          fontSize: 12,
          textAlign: "center",
          marginVertical: 10
        }}
      >
        Invalid Credentials
      </Text>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <BackButton />
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content
          contentContainerStyle={{ flex: 1, backgroundColor: "seashell" }}
        >
          <View
            style={{
              marginTop: 25,
              marginBottom: 25,
              marginLeft: "auto",
              marginRight: "auto"
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 24 }}>
              Employee Login
            </Text>
          </View>
          <Form style={{ backgroundColor: "white" }}>
            <Item>
              <Input
                autofocus
                placeholder="Enter Username"
                onChangeText={username => this.setState({ username })}
                value={this.state.username}
              />
            </Item>
            <Item>
              <Input
                placeholder="Enter Password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                value={this.state.password}
              />
            </Item>
            {this.renderError()}
            <Button full large warning onPress={() => this.handlePress()}>
              <Text>Log in</Text>
            </Button>
          </Form>
          {this.state.loading ? <Spinner color="orange" /> : null}
        </Content>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  loginEmployee,
  setCurrentShift
};

const mapStateToProps = state => ({
  employee: state.employee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeLogin);

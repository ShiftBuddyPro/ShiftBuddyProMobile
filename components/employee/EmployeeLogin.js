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

class EmployeeLogin extends Component {
  state = {
    username: "John",
    password: "John",
    loading: false
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
        this.props.navigation.navigate("EmployeeDashboard", { employeeId });
        this.setState({ loading: false });
      })
      .catch(err => {
        this.setState({ errors: true, loading: false });
      });
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
  loginEmployee
};

const mapStateToProps = state => ({
  employee: state.employee
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeLogin);

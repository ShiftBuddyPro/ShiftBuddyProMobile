import React, { Component } from "react";
import { connect } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentManager } from "@modules/manager";
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
  Form,
  Item,
  Input,
  Spinner
} from "native-base";
import { ManagerApi } from "@services";
import BackButton from "../common/BackButton";

export class ManagerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "usman",
      password: "usman",
      loading: false,
      errors: false
    };
    this.handlePress = this.handlePress.bind(this);
  }

  componentWillMount() {
    this.setState({
      loading: false
    });
  }

  componentWillUnmount() {
    this.setState({
      loading: false
    });
  }

  handlePress() {
    const { email, password } = this.state;

    this.setState({ loading: true });
    ManagerApi.login({ email, password })
      .then(res => {
        const { auth_token } = res.data;
        const decodedToken = jwt_decode(auth_token);
        this.props.setCurrentManager(decodedToken);
        this.props.navigation.navigate("ManagerDashboard");
        this.setState({loading: false})
      })
      .catch(err => {this.setState({loading: false, errors: true})});
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
          <View style={{ marginTop: 25, marginBottom: 25 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 24,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Manager Login
            </Text>
          </View>
          <Form style={{ backgroundColor: "white" }}>
            <Item>
              <Input
                autofocus
                placeholder="Enter Email"
                onChangeText={email => this.setState({ email })}
                value={this.state.email}
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
  setCurrentManager
};

export default connect(
  null,
  mapDispatchToProps
)(ManagerLogin);

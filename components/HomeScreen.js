import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem} from 'native-base';

export default class HomeScreen extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Body>
            <Title style={{color: 'orange'}}>Shift Buddy Pro</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{ justifyContent: 'center', flex: 1, backgroundColor: 'seashell' }}>
          <Button full large bordered warning style={{backgroundColor: "white", height: 100}} onPress={() => this.props.navigation.navigate("ManagerLogin")}>
            <Text>
              Manager Login
            </Text>
          </Button>
          <Button full large warning style={{height: 100}} onPress={() => this.props.navigation.navigate("EmployeeLogin")}>
            <Text>
              Employee Login
            </Text>
          </Button>
        </Content>
        <Footer>
          <FooterTab>
            <Button full >
              <Text>Copyright {(new Date()).getFullYear()} &copy; ShiftBuddyPro</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Button,
  Text,
} from 'native-base';
import * as UI from '@ui';
import appColors from '@constants/appColors';

enum UserType {
  Manager = 'Manager',
  Employee = 'Employee',
}

export default class HomeScreen extends Component {
  state = {
    userType: UserType.Manager,
  };

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.container}>
          <UI.View style={styles.topHalfContainer}>
            <UI.Text style={styles.header}>ShiftBuddyPro</UI.Text>
          </UI.View>
          <UI.View style={styles.bottomHalfContainer}>
            <UI.Card style={styles.loginCard}>
              <UI.Text style={styles.loginText}>Login</UI.Text>
              <UI.Text>Email</UI.Text>
              <UI.Text>Password</UI.Text>
            </UI.Card>
            {/* <Button
              full
              large
              bordered
              warning
              style={{ backgroundColor: "white", height: 100 }}
              onPress={() => this.props.navigation.navigate("ManagerLogin")}
            >
              <Text>Manager Login</Text>
            </Button>
            <Button
              full
              large
              warning
              style={{ height: 100 }}
              onPress={() => this.props.navigation.navigate("EmployeeLogin")}
            >
              <Text>Employee Login</Text>
            </Button> */}
          </UI.View>
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>
                Copyright {new Date().getFullYear()} &copy; ShiftBuddyPro
              </Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = UI.StyleSheet.create({
  container: {
    flex: 1,
  },

  topHalfContainer: {
    flex: 1,
    backgroundColor: appColors.lighterOrange,
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomHalfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 36,
    color: appColors.orange,
  },

  loginCard: {
    width: '80%',
    height: '100%',
    marginTop: '-40%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loginText: {
    marginBottom: 'auto',
    marginTop: '10%',
  },
});

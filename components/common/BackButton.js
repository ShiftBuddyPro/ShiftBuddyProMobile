import React from 'react';
import { Left, Button, Icon } from 'native-base';
import { withNavigation } from 'react-navigation'

class BackButton extends React.Component  {
  render() {
    return (
      <Left>
        <Button
          transparent
          onPress={() => this.props.navigation.goBack()}
        >
          <Icon style={{color: 'orange'}} name="arrow-back"/>
        </Button>
      </Left>
    )
  }
}

export default withNavigation(BackButton);

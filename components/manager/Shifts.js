import React, { Component } from 'react';
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
  CardItem,
} from 'native-base';
import { FlatList, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { ManagerApi } from 'services';
import { FontAwesome } from '@expo/vector-icons';

export class Shifts extends Component {
  state = {
    shifts: [],
    errors: false,
  };

  componentDidMount() {
    ManagerApi.getShifts(this.props.manager.managerData.manager_id)
      .then(shifts => this.setState({ shifts: shifts.splice(0, 19) }))
      .catch(err => this.setState({ errors: true }));
  }

  renderShifts() {
    const renderShift = (shift, index) => {
      return (
        <Button
          transparent
          onPress={() =>
            this.props.navigate('ManagerShift', {
              shiftId: shift.id,
            })
          }
          style={{
            flexDirection: 'row',
            width: '100%',
            borderBottomWidth: 0.5,
            borderTopWidth: index == 0 ? 0.5 : 0,
            borderColor: 'grey',
            height: 70,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              flex: 1,
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {shift.attributes.employee_name}
            </Text>
            <Text style={{ color: 'grey' }}>{shift.attributes.date}</Text>
          </View>
          <FontAwesome
            name="chevron-right"
            style={{ marginLeft: 'auto', marginRight: 12 }}
            color="orange"
            size={20}
          />
        </Button>
      );
    };
    return (
      <FlatList
        data={this.state.shifts}
        renderItem={({ item, index }) => renderShift(item, index)}
        enableEmptySections
        automaticallyAdjustContentInsets={false}
        keyExtractor={item =>
          item.attributes.date.toString() + item.attributes.id.toString()
        }
      />
    );
  }

  renderNoShifts() {
    return (
      <Text
        style={{
          fontStyle: 'italic',
          fontSize: 12,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
    );
  }

  render() {
    console.log(this.state.shifts);
    return (
      <ScrollView>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 15,
            marginTop: 20,
          }}
        >
          Shifts
        </Text>
        {this.state.shifts.length === 0
          ? this.renderNoShifts()
          : this.renderShifts()}
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  manager: state.manager,
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shifts);

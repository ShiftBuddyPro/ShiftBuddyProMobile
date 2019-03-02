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
import BackButton from "../common/BackButton";
import PaidOuts from "./ManagerShift/PaidOuts";
import Checks from "./ManagerShift/Checks";
import CashDrops from "./ManagerShift/CashDrops";
import InventoryItems from "./ManagerShift/InventoryItems";
import Notes from "./ManagerShift/Notes";
import Change from "./ManagerShift/Change";

export class ManagerShift extends Component {
  render() {
    const { navigation } = this.props;
    const shiftId = navigation.getParam("shiftId");
    return (
      <Container>
        <Header>
          <BackButton />
          <Body>
            <Title>Dashboard</Title>
          </Body>
          <Right />
        </Header>
        <Content contentContainerStyle={{ backgroundColor: "seashell" }}>
          <Notes shiftId={shiftId} />
          <CashDrops shiftId={shiftId} />
          <PaidOuts shiftId={shiftId} />
          <Checks shiftId={shiftId} />
          <Change shiftId={shiftId} />
          <InventoryItems shiftId={shiftId} />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  manager: state.manager,
  managerShift: state.managerShift
});

export default connect(mapStateToProps)(ManagerShift);

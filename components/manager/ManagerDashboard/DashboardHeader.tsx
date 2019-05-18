import React from 'react';
import { Header, Title, Body } from 'native-base';
// import * as UI from 'ui';

interface Props {}

const DashboardHeader = (props: Props) => {
  return (
    <Header>
      <Body>
        <Title>Dashboard</Title>
      </Body>
    </Header>
  );
};

// const styles = UI.StyleSheet.create({});

export default DashboardHeader;

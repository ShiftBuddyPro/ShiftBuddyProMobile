import React from 'react';
import { Header, Title, Body, Left, Right } from 'native-base';
import PlainButton from './PlainButton';
import { MaterialIcons } from '@expo/vector-icons';
import appColors from 'constants/appColors';
// import * as UI from 'ui';

interface Props {
  title: string;
  hasBackButton?: boolean;
  onBackPress?: () => void;
}

const BasicHeader = (props: Props) => {
  const { hasBackButton = false, onBackPress, title } = props;

  const backButton = (
    <PlainButton onPress={onBackPress}>
      <MaterialIcons
        size={30}
        name="arrow-back"
        color={appColors.primary.regular}
      />
    </PlainButton>
  );

  return (
    <Header>
      <Left style={{ flex: 1, marginLeft: 10 }}>
        {hasBackButton && backButton}
      </Left>
      <Body style={{ flex: 3 }}>
        <Title>{title}</Title>
      </Body>
      <Right style={{ flex: 1, marginRight: 10 }} />
    </Header>
  );
};

export default BasicHeader;

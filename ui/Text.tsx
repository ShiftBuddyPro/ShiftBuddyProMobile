import { Text } from 'native-base';
import React from 'react';
import { systemWeights } from 'react-native-typography';
import { StyleSheet } from 'react-native';
import appColors from 'constants/appColors';

interface Props {
  children: JSX.Element | string | (string | JSX.Element)[];
  style?: object;
  weight?: 'bold' | 'semibold' | 'regular' | 'light' | 'thin';
  size?: 'small' | 'medium' | 'large' | 'extraLarge';
}

export default (props: Props) => {
  const { weight = 'light', children, style, size = 'medium' } = props;

  let fontSize;
  switch (size) {
    case 'small':
      fontSize = 12;
      break;
    case 'medium':
      fontSize = 16;
      break;
    case 'large':
      fontSize = 20;
      break;
    case 'extraLarge':
      fontSize = 28;
  }

  const textStyle = {
    ...systemWeights[weight],
    ...styles.text,
    ...{ fontSize },
    ...style,
  };
  return <Text style={textStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: appColors.textGrey,
  },
});

import { Text } from 'native-base';
import React from 'react';
import { systemWeights } from 'react-native-typography';
import { StyleSheet } from 'react-native';
import appColors from 'constants/appColors';

interface Props {
  children: JSX.Element | string;
  style: object;
  weight: 'bold' | 'semibold' | 'regular' | 'light' | 'thin';
}

export default (props: Props) => {
  const { weight = 'light', children, style } = props;

  const textStyle = {
    ...systemWeights[weight],
    ...styles.text,
    ...style,
  };
  return <Text style={textStyle}>{children}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: appColors.textGrey,
  },
});

import { View } from 'native-base';
import { StyleSheet } from 'react-native';
import React from 'react';

interface Props {
  children?: JSX.Element;
  style?: object;
}

export default (props: Props) => {
  const cardStyle = {
    ...styles.card,
    ...props.style,
  };
  return <View style={cardStyle}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
});

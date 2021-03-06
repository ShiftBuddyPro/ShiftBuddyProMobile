import { Button, Text } from 'native-base';
import { StyleSheet } from 'react-native';
import { systemWeights } from 'react-native-typography';
import React from 'react';
import appColors from 'constants/appColors';
import { Spinner } from 'native-base';

interface Props {
  children?: string;
  style?: object;
  loading?: boolean;
  onPress?: any;
}

export default (props: Props) => {
  const { children, style, loading, onPress } = props;

  const buttonStyle = {
    ...styles.button,
    ...style,
  };
  return (
    <Button onPress={onPress} style={buttonStyle}>
      {loading ? (
        <Spinner size="small" color={appColors.white} />
      ) : (
        <Text style={systemWeights.regular}>{children}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.primary.regular,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
        <Spinner color={appColors.white} />
      ) : (
        <Text style={systemWeights.bold}>{children}</Text>
      )}
    </Button>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: appColors.blue,
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

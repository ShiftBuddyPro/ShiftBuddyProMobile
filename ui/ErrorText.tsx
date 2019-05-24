import React from 'react';
import Text from './Text';
import { StyleSheet } from 'react-native';
import appColors from 'constants/appColors';

interface Props {
  text: string;
}

const ErrorText = (props: Props) => {
  const { text } = props;

  return (
    <Text weight="thin" style={styles.errorText}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: appColors.darkRed,
    alignSelf: 'center',
    textAlign: 'center',
  },
});

export default ErrorText;

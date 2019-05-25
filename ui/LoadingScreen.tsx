import React from 'react';
import { View } from 'react-native';
import { Spinner } from 'native-base';
import { StyleSheet } from 'react-native';
import appColors from 'constants/appColors';

interface Props {}

const LoadingScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <Spinner color={appColors.primary.regular} style={styles.spinner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  spinner: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default LoadingScreen;

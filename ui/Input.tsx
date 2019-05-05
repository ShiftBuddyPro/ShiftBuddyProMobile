import React from 'react';
import { Input, Item, Label } from 'native-base';
import { StyleSheet } from 'react-native';
import { systemWeights } from 'react-native-typography';
import appColors from 'constants/appColors';

interface Props {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  containerStyle?: object;
  secureTextEntry?: boolean;
}

export default (props: Props) => {
  const {
    label,
    onChangeText,
    placeholder,
    value,
    containerStyle,
    secureTextEntry,
  } = props;

  const inputContainerStyle = {
    ...styles.container,
    ...containerStyle,
  };

  const inputLabelStyle = {
    ...styles.label,
    ...systemWeights.light,
  };

  const inputTextStyle = {
    ...styles.inputText,
    ...systemWeights.thin,
  };

  return (
    <Item style={inputContainerStyle} stackedLabel>
      <Label style={inputLabelStyle}>{label}</Label>
      <Input
        style={inputTextStyle}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 10,
  },

  label: {
    color: appColors.blue,
  },

  inputText: {
    color: appColors.darkGrey,
  },
});

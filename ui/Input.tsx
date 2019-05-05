import { View, StyleSheet } from './';
import React from 'react';
import { Input, Item, Label } from 'native-base';

interface Props {
  label: string;
  onChangeText: (value: string) => void;
}

export default (props: Props) => {
  const { label, onChangeText } = props;
  return (
    <Item stackedLabel>
      <Label>{label}</Label>
      <Input onChangeText={onChangeText} />
    </Item>
  );
};

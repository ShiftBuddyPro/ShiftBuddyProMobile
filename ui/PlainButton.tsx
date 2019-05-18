import { TouchableOpacity } from 'react-native';
import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  style?: object;
  onPress?: any;
}

export default (props: Props) => {
  const { children, style, onPress } = props;

  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

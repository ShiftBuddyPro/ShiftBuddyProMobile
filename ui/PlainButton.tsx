import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  style?: object;
  onPress?: any;
  shadow?: ShadowHeight;
}

type ShadowHeight = 'none' | 'low' | 'medium' | 'high';

export default (props: Props) => {
  const { children, style, onPress, shadow = 'none' } = props;

  let shadowStyle;

  switch (shadow) {
    case 'none':
      shadowStyle = {};
      break;
    case 'low':
      shadowStyle = styles.lowShadow;
      break;
    case 'medium':
      shadowStyle = styles.mediumShadow;
      break;
    case 'high':
      shadowStyle = styles.highShadow;
      break;
  }

  const buttonStyle = {
    ...style,
    ...shadowStyle,
  };

  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  lowShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  mediumShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  highShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
});

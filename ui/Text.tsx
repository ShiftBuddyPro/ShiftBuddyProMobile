import { Text } from "native-base";
import { StyleSheet } from "react-native";
import React from "react";

interface Props {
  children: JSX.Element | string;
  style: object;
}

export default (props: Props) => {
  const textStyle = {
    ...styles.text,
    ...props.style
  };
  return <Text style={textStyle}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  text: {}
});

import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import Colors from '../../constants/Colors';

const InstructionText = ({children, style}: {children: string; style: {}}) => {
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: 'OpenSans-Regular',
    color: Colors.accent500,
    fontSize: 24,
  },
});

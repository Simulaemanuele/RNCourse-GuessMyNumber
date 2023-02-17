import * as React from 'react';
import {StyleSheet, Text, Platform} from 'react-native';
import Colors from '../../constants/Colors';

const Title = ({children}: {children: string}) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 24,
    //fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    // borderWidth: Platform.OS === "android" ? 2 : 0,
    borderWidth: Platform.select({ios: 0, android: 2}),
    borderColor: 'white',
    padding: 12,
    maxWidth: '80%',
    width: 300,
  },
});

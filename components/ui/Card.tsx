import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Colors from '../../constants/Colors';

type PropsWithChildren<P> = P & {children?: React.ReactNode};

const Card = ({children}: {children: PropsWithChildren<React.ReactNode>}) => {
  return <View style={styles.card}>{children}</View>;
};

export default Card;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: deviceWidth < 380 ? 18 : 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    elevation: 4,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.25,
  },
});

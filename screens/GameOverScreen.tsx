import * as React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Title from '../components/ui/Title';
import Success from '../assets/images/success.png';
import Colors from '../constants/Colors';
import PrimaryButton from '../components/ui/PrimaryButton';

const success = Success;

const GameOverScreen = () => {
  return (
    <View style={styles.rootContainer}>
      <Title>{'GAME OVER!'}</Title>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={success} />
      </View>
      <Text style={styles.summaryText}>
        Your phone needed <Text style={styles.highlight}>X</Text> rounds to
        guess the number <Text style={styles.highlight}>Y</Text>.
      </Text>
      <PrimaryButton onPress={() => {}}>{'Start New Game'}</PrimaryButton>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: 'hidden',
    margin: 36,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  summaryText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  highlight: {
    fontFamily: 'OpenSans-Bold',
    color: Colors.primary500,
  },
});

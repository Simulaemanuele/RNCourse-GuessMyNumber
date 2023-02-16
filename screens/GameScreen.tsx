import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

//Function it can generate a random number in a certain range excluding one value
const generateRandomBetween = (
  min: number,
  max: number,
  exclude: number,
): number => {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

//variable can dinamically assigned min and max every function call
let minBoundary = 1;
let maxBoundary = 100;

const GameScreen = ({userNumber}: {userNumber: number}) => {
  //Initial guess provided by the first call of the random generator function
  const initialGuess = generateRandomBetween(
    minBoundary,
    maxBoundary,
    userNumber,
  );

  //the initial guess become the default value of this state
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);

  //this handler can check the direction of calculation that is "lower" or greater and if the user is doing a mistake return showing an alert
  const nextGuessHandler = (direction: string) => {
    if (
      (direction === 'lower' && currentGuess < userNumber) ||
      (direction === 'greater' && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess,
    );
    setCurrentGuess(newRndNumber);
  };

  return (
    <View style={styles.screen}>
      <Title>{"Opponent's Guess"}</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <View>
        <Text>{'Higher or lower?'}</Text>
        <View>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
            -
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
            +
          </PrimaryButton>
        </View>
      </View>
      {/* <View>LOG ROUNDS</View> */}
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
});

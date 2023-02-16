import * as React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList} from 'react-native';
import GuessLogItem from '../components/game/GuessLogItem';

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

const GameScreen = ({
  userNumber,
  onGameOver,
}: {
  userNumber: number;
  onGameOver: (x: number) => void;
}) => {
  //Initial guess provided by the first call of the random generator function
  const initialGuess = generateRandomBetween(1, 100, userNumber);

  //the initial guess become the default value of this state
  const [currentGuess, setCurrentGuess] = React.useState(initialGuess);

  const [guessRounds, setGuessRounds] = React.useState([initialGuess]);

  React.useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  React.useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

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
    setGuessRounds(prevGuessRounds => [...prevGuessRounds, newRndNumber]);
  };

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>{"Opponent's Guess"}</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>
          {'Higher or lower?'}
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
              <Icon name={'remove'} size={24} color={'white'} />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
              <Icon name={'add'} size={24} color={'white'} />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => (
          <Text key={guessRound}>{guessRound}</Text>
        ))} */}
        <FlatList
          data={guessRounds}
          renderItem={itemData => (
            <GuessLogItem
              roundNumber={itemData.index + 1}
              guess={itemData.item}
            />
          )}
          keyExtractor={item => item.toString()}
        />
      </View>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import Background from './assets/images/background.png';
import Colors from './constants/Colors';
import GameOverScreen from './screens/GameOverScreen';

const backgroundImg = Background;

function App(): JSX.Element {
  //state setted for the number the user choose
  const [userNumber, setUserNumber] = React.useState<
    number | undefined | null
  >();

  //state setted for the game over screen
  const [gameIsOver, setGameIsOver] = React.useState<boolean>(true);

  //state setted for the number of invocation of the guesses handler invocation
  const [guessRounds, setGuessRounds] = React.useState<number>(0);

  //method handler can pick the number and setting the value as userNumber and start the game setting Game over statte to false
  const pickedNumberHandler = (pickedNumber: number) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  //method handler can turn on the Game Over screen
  const gameOverHandler = () => {
    setGameIsOver(true);
  };

  //method handler can restart the game
  const startNewGameHandler = () => {
    setUserNumber(null);
    setGuessRounds(0);
  };

  //gloval variable which can store a TSX component in this case screens
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;

  //condition that turns the screen in Game Screen
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  //condition that turns the screen in Game Over Screen and pass some props and function to render them within
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <LinearGradient
      colors={[Colors.primary700, Colors.accent500]}
      style={styles.rootScreen}>
      <ImageBackground
        source={backgroundImg}
        resizeMode={'cover'}
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}>
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default App;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});

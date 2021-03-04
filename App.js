import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';



//Import screens and header for the view of the application 
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

//this function allows you to loads fonts through loadAsync() 
const fetchFonts = () => {
  //returns the promise returned by loadAsync
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};


export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [noOfGuesses, setNoOfGuesses] = useState(0);
  
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return (
      <AppLoading 
        startAsync={fetchFonts} 
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }

  const configureNewGameHandler = () => {
    //reset the number of guesses the computer took.
    setNoOfGuesses(0);
    setUserNumber(null);

  };
 
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    
  };

  const gameOverHandler = numofRounds => {
    setNoOfGuesses(numofRounds);

  };

  //passes startGamehandler as a method that can be accessed in the StartGameScreen file
  let content = <StartGameScreen onStartGame={startGameHandler}/>

  //if the number of guesses is 0 then the user must of started the game so present the GameScreen
  if (userNumber && noOfGuesses <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    );

  //if the number of guesses is greater than 0 and gameOverHandler has been executed then present the GameOverScreen.
  } else if (noOfGuesses > 0) {
    content = (
      <GameOverScreen noOfGuesses={noOfGuesses} usersNumber={userNumber} onRestart={configureNewGameHandler}/>
    );
  }

  return (
    <SafeAreaView style = {styles.screen}>  
        <Header title="Guess a Number" /> 
        {content}
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

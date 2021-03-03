import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';

//Import screens and header for the view of the application 
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';



export default function App() {
  return (
    <View style={styles.screen}>
      <Header title="Guess a Number" /> 
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

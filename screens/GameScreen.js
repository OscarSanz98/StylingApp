//useRef allows you to have an object that you can bind to inputs
//it also allows you to define a value which survives component re-renders.
//useEffect allows you to run logic after every render cycle.
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Button, Alert} from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/defaultStyles';

const generateRandomBetween = (min,max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);

    const randomNum = Math.floor(Math.random() * (max-min)) + min;

    if (randomNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNum;
    }
};

const GameScreen = props => {

    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    const [guesses, setNoOfGuesses] = useState(0);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    //after every render cycle this function gets executed
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(guesses);
        }
        //this makes sure that if anything else changes in the parent other than these dependencies then we don't care/ we ignore it, so it won't re run this useEffect.
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = direction => {
        if((direction === 'lower' && currentGuess < props.userChoice) ||
        (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Stop lying!', 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
            return;
        }

        if(direction === 'lower'){
            //stores the current guess as the current highest value
            currentHigh.current = currentGuess;
        } else {
            //stores the current guess as the current low value
            currentLow.current = currentGuess;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        setNoOfGuesses(curRounds => curRounds + 1);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <Button title="LOWER" onPress={nextGuessHandler.bind(this, 'lower')}/>
                <Button title="GREATER" onPress={nextGuessHandler.bind(this, 'greater')}/>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    }
});

export default GameScreen;
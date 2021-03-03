//useRef allows you to have an object that you can bind to inputs
//it also allows you to define a value which survives component re-renders.
//useEffect allows you to run logic after every render cycle.
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/defaultStyles';
import MainButton from '../components/MainButton';
import { render } from 'react-dom';
import BodyText from '../components/BodyText';

//The following function generates a random number between the min and max values, and excludes a certain number from being picked
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

//The following function is used to render the list item of past guesses.
const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <BodyText>Round: {numOfRound}</BodyText>
        <BodyText>Guess: {value}</BodyText>
    </View>
);


//The following function/method is the screen for the main part of the game.
const GameScreen = props => {

    const initGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [pastGuesses, setPastGuesses] = useState([initGuess]);
    

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    //after every render cycle this function gets executed
    useEffect(() => {
        if(currentGuess === userChoice) {
            onGameOver(pastGuesses.length);
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
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setNoOfGuesses(curRounds => curRounds + 1);
        setPastGuesses(curPastGuesses => [nextNumber , ...curPastGuesses]);
    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    {/* You can add a icon tag in a Text tag it is allowed in react native */}
                    <Ionicons name="md-remove" size={24} color="white"/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView>
            </View>
            
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
        width: 400,
        maxWidth: '90%',
    }, 
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '60%'
    }, 
    listContainer: {
        width: '80%',
        flex: 1
    },
    list: {
        //flexGrow makes sure u use as much space as Flex, however its more flexible than flex, it allows it our scrollview component to function whilst also growing the list view
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;
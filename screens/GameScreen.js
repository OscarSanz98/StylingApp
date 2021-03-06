//useRef allows you to have an object that you can bind to inputs
//it also allows you to define a value which survives component re-renders.
//useEffect allows you to run logic after every render cycle.
import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Alert, ScrollView, FlatList, Dimensions, ListViewComponent} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ScreenOrientation from 'expo-screen-orientation';

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
const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>Round: {listLength - itemData.index}</BodyText>
        <BodyText>Guess: {itemData.item}</BodyText>
    </View>
);


//The following function/method is the screen for the main part of the game.
const GameScreen = props => {

    // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
    // ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const initGuess = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(initGuess);
    const [pastGuesses, setPastGuesses] = useState([initGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(Dimensions.get('window').width);
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(Dimensions.get('window').height);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;


    //set a listener for changing layout
    useEffect(() => {

        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get('window').width);
            setAvailableDeviceHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateLayout);

        return () => {
            Dimensions.removeEventListener('change', updateLayout);
        };
    });


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
        setPastGuesses(curPastGuesses => [nextNumber.toString() , ...curPastGuesses]);
    };

    let listContainerStyle = styles.listContainer;

    if(availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    if(availableDeviceHeight < 500) {
        return (
            <View style={styles.screen}>
                <Text style={DefaultStyles.title}>Computer's Guess</Text>
                <View style = {styles.smallControlsView}>
                    <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                        {/* You can add a icon tag in a Text tag it is allowed in react native */}
                        <Ionicons name="md-remove" size={24} color="white"/>
                    </MainButton>
                    <NumberContainer>{currentGuess}</NumberContainer>
                    <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                        <Ionicons name="md-add" size={24} color="white"/>
                    </MainButton>
                </View>
                <View style={listContainerStyle}>
                    {/* contentContainerStyle is used to control the view of the scrollview */}
                    {/* <ScrollView contentContainerStyle={styles.list}>
                        {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                    </ScrollView> */}
                    <FlatList 
                        keyExtractor={(item) => item} 
                        data={pastGuesses} 
                        renderItem={renderListItem.bind(this, pastGuesses.length)} 
                        contentContainerStyle={styles.list}
                    />
                </View>
            
            </View>
        );
    }

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
            <View style={listContainerStyle}>
                {/* contentContainerStyle is used to control the view of the scrollview */}
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => renderListItem(guess, pastGuesses.length - index))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)} 
                    contentContainerStyle={styles.list}
                />
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
    smallControlsView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        //below presents an if statement, where if the window height is greater than 600 pixels, it will set the margin top to be 20, otherwise it will set it as 10.
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
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
        width: '100%'
    }, 
    listContainer: {
        width: '60%',
        flex: 1
    },
    listContainerBig:{
        flex: 1,
        width: '80%',
    },
    list: {
        //flexGrow makes sure u use as much space as Flex, however its more flexible than flex, it allows it our scrollview component to function whilst also growing the list view
        flexGrow: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end'
    }
});

export default GameScreen;
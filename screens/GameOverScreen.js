import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import DefaultStyles from '../constants/defaultStyles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.bodyText}>The game is over!</Text>
            <Text style={DefaultStyles.bodyText}>Number of guesses: {props.noOfGuesses}</Text>
            <Text style={DefaultStyles.bodyText}>The Number was: {props.usersNumber}</Text>
            <Button style={styles.button} title="NEW GAME" onPress={props.onRestart}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    button: {
        marginVertical: 10
    }
});

export default GameOverScreen;
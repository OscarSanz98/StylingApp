import React from 'react';
import { View, StyleSheet, Text, TextInput, Button} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';

const StartGameScreen = props => {
    return (
        <View style = {styles.screen}>
            <Text style={styles.title}>Start a New Game!</Text>
            <Card style={styles.inputContainer}>
                <Text>Select a Number</Text>
                <TextInput />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}><Button  title="Reset" onPress={() => {}} color={Colors.accent}/></View>
                    <View style={styles.button}><Button  title="Confirm" onPress={() => {}} color={Colors.primary} /></View>
                </View>
            </Card>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
    }, 
    inputContainer: {
        width: 300,
        maxWidth: '80%', //if device is too small we make sure the width will exceed 80%
        alignItems: 'center',
        
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        width: 85
    }
});

export default StartGameScreen;
import React, {useState} from 'react';
import { View, StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';

import Card from '../components/Card';
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import DefaultStyles from '../constants/defaultStyles';

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmedState, setConfirmedState]= useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    //numberInputHandler is the handler for the input box, checks to make sure its a valid number
    const numberInputHandler = inputText => {
        //regular expression: replace anything thats not 0-9 (i.e. not a number) globally in the entire text.
        //it will replace it with an empty string ''
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    };

    //resetInputHandler handles the reset button action
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmedState(false);
    };

    //confirmInputHandler handles the action of pressing the confirm button
    const confirmInputHandler = () => {
        //check to see if its a valid number
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number!', 'Input has to be a number between 1 and 99.', 
            [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]);
            return;
        }
        setSelectedNumber(parseInt(enteredValue)); //converts text to a number
        setConfirmedState(true);
        setEnteredValue('');
    
        Keyboard.dismiss();
        

    };

    //present an alert to check if the user actually wishes to confirm that number
    let confirmedOutput;

    if (confirmedState) {
        confirmedOutput = (
            <Card style= {styles.summaryContainer}>
                <Text style={DefaultStyles.bodyText}>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="START GAME" onPress={() => props.onStartGame(selectedNumber)}/>
            </Card>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <View style = {styles.screen}>
                <Text style={DefaultStyles.title}>Start a New Game!</Text>
                <Card style={styles.inputContainer}>
                    <BodyText>Select a Number</BodyText>
                    {/* blurOnSubmit allows you to hide the keyboard when pressing enter on Android */}
                    <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} onChangeText={numberInputHandler} value={enteredValue}/>
                    
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button  title="Reset" onPress={resetInputHandler} color={Colors.accent}/></View>
                        <View style={styles.button}><Button  title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
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
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
});

export default StartGameScreen;
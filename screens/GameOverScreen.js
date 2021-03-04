import React from 'react';
import { View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';


import BodyText from '../components/BodyText';
import DefaultText from '../constants/defaultStyles';
import Colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOverScreen = props => {
    return (
        <ScrollView>
            <View style={styles.screen}>
                <Text style={DefaultText.title}>The Game Is Over!</Text>
                <View style={styles.imageContainer}>
                    <Image 
                        style={styles.image} 
                        source={require('../assets/success.png')} 
                        //for web images you must provide a width and height as react native doesn't automatically configure that for you
                        //but for a local image react native does, so you don't need to specify a particular width and height for the image.
                        // source={{uri: 'https://tgr.scdn2.secure.raxcdn.com/images/wysiwyg/_article/istockphoto-485966046-612x612.jpg'}}
                        resizeMode= "cover"
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.bodyText}>
                        Your phone took{' '}
                        <Text style={styles.highlight}>{props.noOfGuesses}</Text> 
                        {' '}guesses to guess{' '}
                        <Text style={styles.highlight}>{props.usersNumber}</Text>
                    </BodyText>
                </View>
                
                <MainButton style={styles.button} onPress={props.onRestart}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    }, 
    button: {
        marginVertical: 10
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').height * 0.4 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').height * 0.4,
        height: Dimensions.get('window').height * 0.4,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold',
    },
    bodyText: {
        marginHorizontal: Dimensions.get('window').width / 10,
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16: 18,
        marginBottom: Dimensions.get('window').height / 40
    },
    scrollView: {
        marginTop: Dimensions.get('window').height < 400 ? 10: 30
    },
    resultContainer:{
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60
    }
});

export default GameOverScreen;
import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';


import BodyText from '../components/BodyText';
import DefaultText from '../constants/defaultStyles';
import Colors from '../constants/colors';

const GameOverScreen = props => {
    return (
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
            
            <BodyText style={styles.bodyText}>
                Your phone took{' '}
                <Text style={styles.highlight}>{props.noOfGuesses}</Text> 
                {' '}guesses to guess{' '}
                <Text style={styles.highlight}>{props.usersNumber}</Text>
            </BodyText>
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
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageContainer: {
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        marginVertical: 30
    },
    highlight: {
        color: Colors.primary
    },
    bodyText: {
        marginHorizontal: 30,
        textAlign: 'center',
        fontSize: 20,
        marginBottom: 50
    }
});

export default GameOverScreen;
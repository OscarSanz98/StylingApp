import React from 'react';
import {View, StyleSheet} from 'react-native';

//This file or class is an example of how to create a style for a component that's reusable throughout the project.

const Card = props => {
    //...props.style will override any styles in styles.card passed into this view.
    //{.../styles.card retrieves all the styling from that component and creates a new one with that component}
    return (
        <View style={{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        backgroundColor: 'white',
        elevation: 8,
        padding: 20,
        borderRadius: 10,
        marginVertical: 20
    }
});

export default Card;
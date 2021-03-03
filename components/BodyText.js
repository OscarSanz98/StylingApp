import React from 'react';
import { Text, StyleSheet } from 'react-native';

import DefaultStyles from '../constants/defaultStyles';

const BodyText = props => <Text style={DefaultStyles.bodyText}>{props.children}</Text>;

export default BodyText;
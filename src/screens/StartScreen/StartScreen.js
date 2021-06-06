import React from 'react';
import { Component } from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

class StartScreen extends Component{
    render() {
        return(
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>LoginScreen</Text>
            </View>
        );
    }
}

export default StartScreen;
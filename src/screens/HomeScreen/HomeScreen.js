import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../../config/config';
import styles from './styles';

class HomeScreen extends React.Component {
    render() {
        return(
            <View style={styles.ViewStyle}>
              <Text style={styles.TextStyle}>Home Screen</Text>
            </View>
        )
    }
}

export default HomeScreen;
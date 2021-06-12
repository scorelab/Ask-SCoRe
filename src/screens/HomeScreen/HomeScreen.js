import React from 'react';
import { View, Text } from 'react-native';
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
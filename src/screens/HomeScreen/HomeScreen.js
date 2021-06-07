import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { firebase } from '../../config/config';
import styles from './styles';

class HomeScreen extends React.Component {
    render() {
        return(
            <View style={{justifyContent: 'center'}}>
            <View style={{alignSelf: 'center', width : '90%', marginTop: 100}}>
              <TouchableOpacity style= {styles.LoginButtonView} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.LoginButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            </View>
        )
    }
}

export default HomeScreen;
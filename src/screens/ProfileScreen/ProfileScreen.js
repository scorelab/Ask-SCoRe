import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { firebase } from '../../config/config';

class ProfileScreen extends Component{
    render(){
        return(
            <View style={{flex:1, justifyContent: 'center'}}>
               <View style={{alignSelf: 'center', width : '90%', marginTop: 100}}>
                    <Text style={{alignSelf: 'center'}}>Profile Screen</Text>
                    <TouchableOpacity style= {styles.LoginButtonView} onPress={() => firebase.auth().signOut()}>
                        <Text style={styles.LoginButtonText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ProfileScreen;
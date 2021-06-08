import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NotificationScreen extends Component {
    render(){
        return(
             <View style={{justifyContent: 'center', flex: 1}}>
                <Text style={{alignSelf: 'center'}}>
                    Notification Screen
                </Text>
            </View>
        );
    }
}

export default NotificationScreen;
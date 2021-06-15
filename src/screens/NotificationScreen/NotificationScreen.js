import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { LOGO } from '../../config/styles.js';

class NotificationScreen extends Component {
    render(){
        return(
            <SafeAreaView>
                <View>
                    <HeaderBar image={LOGO} title={"Notifications"} />
                </View>
            </SafeAreaView>
        );
    }
}

export default NotificationScreen;
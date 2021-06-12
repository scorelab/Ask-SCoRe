import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

class NotificationScreen extends Component {
    render(){
        return(
            <SafeAreaView>
                <View>
                    <HeaderBar image={require("../../../assets/Ask-SCORE-Logo.png")} title={"Notifications"} />
                </View>
            </SafeAreaView>
        );
    }
}

export default NotificationScreen;
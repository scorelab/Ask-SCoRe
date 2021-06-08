import React, { Component } from 'react';
import { View, Text } from 'react-native';
import 'react-native-paper';
import LoginSignupScreen from '../LoginSignupScreen/LoginSignupScreen';
import { Spinner, Button } from '../../components/common';
import { firebase } from '../../config/config';
import HomeScreen from '../HomeScreen/HomeScreen';

class StartScreen extends Component { 
    state = {loggedIn : null};

    componentDidMount() {
         firebase.auth().onAuthStateChanged((user) => {
            if (user){
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch(this.state.loggedIn){
            case true :
                return( 
                    <>
                        <HomeScreen />
                    </>
                    )
            case false : 
                return <LoginSignupScreen />;
            default : 
            return (
                <View >
                    <View>
                    <Spinner size="large" style={{justifyContent:'center'}}/>
                    </View>
                </View>    
            )
        }
    }
    
    render() {
        return(
            <>
            {this.renderContent()}
            </>
        );
    }
}

export default StartScreen;
import React, {useState, Component} from 'react';
import {View, Button, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image} from 'react-native';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignupForm from '../../components/SignupForm/SignupForm';
import styles from './styles';
  
class LoginSignupScreen extends Component {
    state= { showingup: true};
    renderContent() {
        switch(this.state.showingup){
            case true : 
                return (
                    <View>
                    <LoginForm />
                </View>
                )
            case false :
                return <SignupForm />;
            default : 
                return <Text>Error</Text>
        }
    }

    render() {
    return (
        <View style= {styles.ViewStyle}>
            <View>
                <Image source={require("../../../assets/Ask-SCORE-Logo.png")} style={styles.ImageView}/>
            </View>
            <View style= {styles.WholeTabBar}>
                {this.state.showingup ? <TouchableOpacity style={styles.SignupTabBar} onPress={() => {
                    this.setState({showingup: true})
                }}>
                    <View >
                        <Text style={styles.BarStyle}>LOGIN</Text>
                    </View>
                </TouchableOpacity> : <TouchableOpacity style={styles.LoginTabBar} onPress={() => {
                    this.setState({showingup: true})
                }}>
                    <View >
                        <Text style={styles.BarStyle1}>LOGIN</Text>
                    </View>
                </TouchableOpacity>}

                {this.state.showingup ===  false ? <TouchableOpacity style={styles.SignupTabBar} onPress={() => {
                    this.setState({showingup: false})
                }}>
                    <View>
                        <Text style={styles.BarStyle}>SIGNUP</Text>
                    </View>
                </TouchableOpacity> : <TouchableOpacity style={styles.LoginTabBar} onPress={() => {
                    this.setState({showingup: false})
                }}>
                    <View>
                        <Text style={styles.BarStyle1}>SIGNUP</Text>
                    </View>
                </TouchableOpacity>}
            </View>

            {this.renderContent()}
        
        </View>
        );
    }           
}
export default LoginSignupScreen;
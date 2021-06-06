import React, { Component } from 'react';
import 'react-native-paper';
import OnboardingScreen from './screens/OnboardingScreen/OnboardingScreen';
import StartScreen from './screens/StartScreen/StartScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useEffect } from 'react';
import { ALREADY_LAUNCHED } from './config/config.js';

const AppStack = createStackNavigator();

const App = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);

    useEffect(() => {
        AsyncStorage.getItem(ALREADY_LAUNCHED).then(value => {
            if(value == null) {
                AsyncStorage.setItem(ALREADY_LAUNCHED, 'true');
                setIsFirstLaunch(true);
            } else {
                setIsFirstLaunch(false);
            }
        });
        
    }, []);

    if(isFirstLaunch === null){
        return null;
    } else if (isFirstLaunch === true) {
        return (
            <NavigationContainer>
            <AppStack.Navigator
            headerMode= "none"
            >
                <AppStack.Screen name="Onboarding" component={OnboardingScreen} />
                <AppStack.Screen name="Start" component={StartScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
        );
    } else {
        return <StartScreen />;
    }
}

export default App;
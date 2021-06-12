import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './styles';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

class HomeScreen extends React.Component {
    render() {
        return(
            <SafeAreaView>
            <View>
              <HeaderBar image={require("../../../assets/Ask-SCORE-Logo.png")} title={"Queries"} />
            </View>
          </SafeAreaView>
        )
    }
}

export default HomeScreen;
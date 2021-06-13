import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import styles from './styles';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { LOGO } from '../../config/styles.js';

class HomeScreen extends React.Component {
    render() {
        return(
            <SafeAreaView>
            <View>
              <HeaderBar image={LOGO} title={"Queries"} />
            </View>
          </SafeAreaView>
        )
    }
}

export default HomeScreen;
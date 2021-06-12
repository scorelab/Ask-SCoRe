import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import HeaderBar from '../../components/HeaderBar/HeaderBar';

class ForumScreen extends Component {
    render(){
        return(
          <SafeAreaView>
            <View>
              <HeaderBar image={require("../../../assets/Ask-SCORE-Logo.png")} title={"Forums"} />
            </View>
          </SafeAreaView>
        );
    }
}

export default ForumScreen;
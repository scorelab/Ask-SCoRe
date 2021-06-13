import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import { LOGO } from '../../config/routes.js';

class ForumScreen extends Component {
    render(){
        return(
          <SafeAreaView>
            <View>
              <HeaderBar image={LOGO} title={"Forums"} />
            </View>
          </SafeAreaView>
        );
    }
}

export default ForumScreen;
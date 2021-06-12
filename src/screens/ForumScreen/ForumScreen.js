import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ForumScreen extends Component {
    render(){
        return(
            <View style={{justifyContent: 'center', flex: 1}}>
              <Text style={{alignSelf: 'center'}}>
                Forum Screen
              </Text>
            </View>
        );
    }
}

export default ForumScreen;
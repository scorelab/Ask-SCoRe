/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {Component} from "react";
import {View, Text, TouchableOpacity, Image, SafeAreaView} from "react-native";
import {LOGO} from "../../config/styles.js";
import styles from "./styles";

class ForumScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <View style={{marginBottom: 15}}>
            <View style={styles.HeaderStyle1}>
              <Image source={LOGO} style={styles.ImageView} />
              <Text style={styles.HeaderStyle}>Forums</Text>
              <TouchableOpacity
                style={styles.AskButtonStyle}
                onPress={() => {
                  this.props.navigation.navigate("AddChat");
                }}>
                <Text style={styles.TextStyle}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.DividerView} />
            <View style={styles.DividerView} />
          </View>

          <View>
            <TouchableOpacity
              onPress={() => this.props.navigation.push("Chat")}>
              <View>
                <View style={{flexDirection: "row", marginLeft: 10}}>
                  <Image source={LOGO} style={styles.ImageView1} />
                  <Text style={styles.TextStyle1}>GSoC</Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.DividerView1} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
export default ForumScreen;

import React, {Component} from "react";
import {View, SafeAreaView} from "react-native";
import HeaderBar from "../../components/HeaderBar/HeaderBar";
import {LOGO} from "../../config/styles.js";

class NotificationScreen extends Component {
  render() {
    return (
      <SafeAreaView>
        <View>
          <HeaderBar image={LOGO} title={"Notifications"} />
        </View>
      </SafeAreaView>
    );
  }
}

export default NotificationScreen;

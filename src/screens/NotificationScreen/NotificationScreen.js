import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  COLOR_PRIMARY,
  COLOR_GRAY_SECONDARY,
  COLOR_GRAY_PRIMARY,
} from "../../config/styles";
import MediumActivity from "../MediumActivity/MediumActivity";
import GithubActivity from "../GithubActivity/GithubActivity";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

class NotificationScreen extends Component {
  state = {showingup: true};
  renderContent() {
    switch (this.state.showingup) {
      case true:
        return (
          <View>
            <MediumActivity />
          </View>
        );
      case false:
        return (
          <View>
            <GithubActivity />
          </View>
        );
      default:
        return <Text>Error</Text>;
    }
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.SafeAreaStyle} />
        <View style={styles.ViewStyle}>
          <View style={styles.WholeTabBar}>
            {this.state.showingup ? (
              <TouchableOpacity
                style={styles.SignupTabBar}
                onPress={() => {
                  this.setState({showingup: true});
                }}>
                <View>
                  <Icon
                    style={styles.IconStyle1}
                    size={28}
                    name={"logo-github"}
                  />
                  <Text style={{alignSelf: "center", color: "white"}}>
                    Github
                  </Text>
                </View>
                <View style={styles.DividerView} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.LoginTabBar}
                onPress={() => {
                  this.setState({showingup: true});
                }}>
                <View>
                  <Icon
                    style={styles.IconStyle}
                    size={28}
                    name={"logo-github"}
                  />
                </View>
                <View style={styles.DividerView1} />
              </TouchableOpacity>
            )}
            {this.state.showingup === false ? (
              <TouchableOpacity
                style={styles.SignupTabBar}
                onPress={() => {
                  this.setState({showingup: false});
                }}>
                <View>
                  <Icon
                    style={styles.IconStyle1}
                    size={28}
                    name={"newspaper-outline"}
                  />
                  <Text style={{alignSelf: "center", color: "white"}}>
                    Medium
                  </Text>
                </View>
                <View style={styles.DividerView} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.LoginTabBar}
                onPress={() => {
                  this.setState({showingup: false});
                }}>
                <View>
                  <Icon
                    style={styles.IconStyle}
                    size={28}
                    name={"newspaper-outline"}
                  />
                </View>
                <View style={styles.DividerView1} />
              </TouchableOpacity>
            )}
          </View>
          <View>{this.renderContent()}</View>
        </View>
      </>
    );
  }
}

export default NotificationScreen;

/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-alert */
import React, {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import {firebase} from "../../config/config";
import moment from "moment";
import styles from "./styles.js";
import {LOGO} from "../../config/styles.js";

class Addroom extends Component {
  state = {roomName: "", message: ""};

  createRoom(roomName) {
    const {message} = this.state;
    var timeDate = moment();
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        firebase
          .database()
          .ref(roomName)
          .push({
            name: doc.data().fullName,
            message,
            creation: new Date().toUTCString(),
            messageTime: timeDate.format("lll"),
            ImageURL: doc.data().downloadURL,
          })
          .then(data => {
            this.setState({roomName: "", message: ""});
            this.props.navigation.navigate("Forum");
          })
          .catch(error => {
            alert(error);
          });
      });
  }
  render() {
    const {roomName, message} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <View style={{marginBottom: 15}}>
              <View style={styles.HeaderStyle1}>
                <Image source={LOGO} style={styles.ImageView} />
                <Text style={styles.HeaderStyle}>Add room</Text>
                <TouchableOpacity
                  style={styles.AskButtonStyle}
                  onPress={() => this.props.navigation.navigate("Forum")}>
                  <Text style={styles.TextStyle}>BACK</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.DividerView} />
              <View style={styles.DividerView} />
            </View>
            <View style={styles.ViewStyle}>
              <Text style={styles.TextStyle1}>Enter the Room Name Here</Text>
              {this.state.roomName.length === 0 ? (
                <View>
                  <View style={styles.ViewStyle1}>
                    <TextInput
                      style={styles.TextStyle2}
                      title="CREATE A NEW CHAT ROOM"
                      placeholder="ROOM NAME"
                      value={this.state.roomName}
                      onChangeText={roomName => this.setState({roomName})}
                    />
                  </View>
                  <View style={styles.ViewStyle2}>
                    <TextInput
                      style={{}}
                      title="CREATE A NEW CHAT ROOM"
                      value={this.state.message}
                      onChangeText={message => this.setState({message})}
                      placeholder="Enter room description"
                      multiline
                    />
                  </View>
                  <TouchableOpacity
                    disabled={roomName.length === 0}
                    style={styles.TouchableStyle}
                    onPress={() => this.createRoom(this.state.roomName)}>
                    <Text style={{alignSelf: "center", fontSize: 20}}>
                      CREATE
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View style={styles.ViewStyle3}>
                    <TextInput
                      style={styles.TextStyle2}
                      title="CREATE A NEW CHAT ROOM"
                      placeholder="ROOM NAME"
                      value={this.state.roomName}
                      onChangeText={roomName => this.setState({roomName})}
                    />
                  </View>
                  {this.state.message.length === 0 ? (
                    <View style={styles.ViewStyle2}>
                      <TextInput
                        style={{}}
                        title="CREATE A NEW CHAT ROOM"
                        placeholder="Enter room description"
                        value={this.state.message}
                        onChangeText={message => this.setState({message})}
                        multiline
                      />
                    </View>
                  ) : (
                    <View style={styles.ViewStyle4}>
                      <TextInput
                        style={{}}
                        title="CREATE A NEW CHAT ROOM"
                        placeholder="Enter room description"
                        value={this.state.message}
                        onChangeText={message => this.setState({message})}
                        multiline
                      />
                    </View>
                  )}
                  <TouchableOpacity
                    disabled={roomName.length === 0}
                    style={styles.ViewStyle5}
                    onPress={() => this.createRoom(this.state.roomName)}>
                    <Text style={{alignSelf: "center", fontSize: 20}}>
                      CREATE
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

export default Addroom;

/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from "react";
import {Component} from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  FlatList,
  Platform,
} from "react-native";
import {firebase} from "../../config/config";
import moment from "moment";
import styles from "./styles.js";

class ChatScreen extends Component {
  state = {messageList: "", data: ""};

  UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam("data");
    this.setState(
      {
        data,
      },
      this.renderData,
    );
  }

  writeUserData(message) {
    var timeDate = moment();
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then(doc => {
        firebase
          .database()
          .ref(this.state.data + "/")
          .push({
            name: doc.data().fullName,
            message,
            creation: new Date().toUTCString(),
            messageTime: timeDate.format("lll"),
            imageURL: doc.data().downloadURL,
          })
          .then(data => {
            this.setState({message: ""});
          })
          .catch(error => {
            alert(error);
          });
      });
  }

  renderData() {
    const {messageList} = this.state;
    firebase
      .database()
      .ref(this.state.data + "/")
      .on("value", snapshot => {
        var messageArray = [];
        this.setState({messageList: Object.values(snapshot.val())});
      });
  }

  render() {
    const {messageList} = this.state;
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: "#51AD28"}} />
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{marginBottom: 5}}>
                <View style={styles.DividerView} />
              </View>
              <FlatList
                ref={ref => {
                  this.FlatListRef = ref;
                }}
                onContentSizeChange={() => this.FlatListRef.scrollToEnd()} // scroll it
                data={messageList}
                renderItem={({item}) => {
                  return (
                    <View>
                      <View style={styles.ViewStyle}>
                        <View style={{flexDirection: "column", flex: 1}}>
                          <View style={{flexDirection: "row"}}>
                            <Image
                              source={{uri: item.imageURL}}
                              style={styles.ImageView1}
                            />
                            <View>
                              <View
                                style={{
                                  flexDirection: "column",
                                  marginLeft: 5,
                                }}>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    marginBottom: 5,
                                  }}>
                                  <Text
                                    style={{fontWeight: "500", marginRight: 7}}>
                                    {item.name}
                                  </Text>
                                  <Text style={styles.TextStyle1}>
                                    {item.messageTime}
                                  </Text>
                                </View>
                                <Text style={{fontSize: 13, fontWeight: "300"}}>
                                  {item.message}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                      <View style={styles.DividerView1} />
                    </View>
                  );
                }}
                keyExtractor={(item, index) => "key" + index}
              />
            </View>
          </View>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
            <View style={{flexDirection: "row", height: 35}}>
              <View style={styles.ViewStyle1}>
                <TextInput
                  style={styles.TextInputStyle}
                  value={this.state.message}
                  placeholder="Enter Message here"
                  onChangeText={message => this.setState({message})}
                />
              </View>

              <View>
                <TouchableOpacity
                  style={styles.AskButtonStyle1}
                  onPress={() => this.writeUserData(this.state.message)}
                  value={this.state.message}>
                  <Text style={styles.TextStyle}>SEND</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </>
    );
  }
}
export default ChatScreen;

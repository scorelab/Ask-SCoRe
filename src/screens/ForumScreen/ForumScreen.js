/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {Component} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import {firebase} from "../../config/config.js";
import {LOGO} from "../../config/styles.js";
import styles from "./styles";

class ForumScreen extends Component {
  state = {dialogvisible: false, forumtext: "", roomArray: [], isAdmin: null};
  componentDidMount() {
    const {roomArray} = this.state;
    const userID = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref()
      .on("value", snapshot => {
        newroomArray = [];
        snapshot.forEach(element => {
          newroomArray.push(element.key);
          this.setState({roomArray: newroomArray});
          console.log(roomArray);
        });
      });
    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({isAdmin: doc.data().adminRights});
        }
      });
  }

  render() {
    const {roomArray, isAdmin} = this.state;
    return (
      <SafeAreaView>
        <View>
          <View style={{marginBottom: 15}}>
            <View style={styles.HeaderStyle1}>
              <Image source={LOGO} style={styles.ImageView} />
              <Text style={styles.HeaderStyle}>Forums</Text>
              {isAdmin ? (
                <TouchableOpacity
                  style={styles.AskButtonStyle}
                  onPress={() => {
                    this.props.navigation.navigate("AddChat");
                  }}>
                  <Text
                    style={{
                      color: "black",
                      fontWeight: "500",
                      textAlign: "center",
                      fontSize: 16,
                    }}>
                    +
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={styles.DividerView} />
            <View style={styles.DividerView} />
          </View>
          <FlatList
            data={roomArray}
            renderItem={({item}) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.push("Chat", {
                        data: item,
                      })
                    }>
                    <View>
                      <View style={{flexDirection: "row", marginLeft: 10}}>
                        <Image source={LOGO} style={styles.ImageView1} />
                        <Text
                          style={{
                            alignSelf: "center",
                            fontSize: 16,
                            marginHorizontal: 15,
                            marginBottom: 2,
                          }}>
                          {item}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.DividerView1} />
                </View>
              );
            }}
            keyExtractor={(item, index) => "key" + index}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default ForumScreen;

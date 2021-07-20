/* eslint-disable no-shadow */
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
  Linking,
  Alert,
} from "react-native";
import {firebase} from "../../config/config";
import moment from "moment";
import Icon from "react-native-vector-icons/Ionicons";
import ModalHeaderNavigationBar from "../../components/ModalHeaderNavigationBar/modalHeaderNavigationBar";
import {NO_IMAGE_LINK} from "../../config/styles.js";
import styles from "./styles.js";
import ImagePicker from "react-native-image-crop-picker";

class ChatScreen extends Component {
  state = {
    messageList: "",
    data: "",
    profilePresent: null,
    setImage: null,
    setDisplayImage: null,
    transferred: 0,
    messageImage: null,
    message: "",
  };

  UNSAFE_componentWillMount() {
    const data = this.props.navigation.getParam("data");
    const userID = firebase.auth().currentUser.uid;
    firebase
      .firestore()
      .collection("users")
      .doc(userID)
      .get()
      .then(doc => {
        if (doc.exists) {
          this.setState({profilePresent: doc.data().isImagePresent});
        }
      });
    this.setState(
      {
        data,
      },
      this.renderData,
    );
  }

  takePhotoFromLib = () => {
    const {setImage} = this.state;
    this.setState({transferred: 0});
    ImagePicker.openPicker({
      cropping: false,
    })
      .then(image => {
        const imageUri = image.path;
        this.setState({setImage: imageUri});
      })
      .catch("Unknown Error Occured");
  };

  uploadImage = async () => {
    const {setImage} = this.state;
    if (setImage == null) {
      return;
    }
    const uri = setImage;
    const childPath = `forum/${this.state.data}/${
      firebase.auth().currentUser.uid
    }/${Math.random().toString(36)}`;
    const response = await fetch(uri);
    const blob = await response.blob();

    const task = firebase.storage().ref().child(childPath).put(blob);

    const taskCompleted = () => {
      const {transferred, setDisplayImage} = this.state;
      task.snapshot.ref
        .getDownloadURL()
        .then(snapshot => {
          this.setState({setDisplayImage: snapshot});
        })
        .catch(error => {
          alert(error);
        });
    };

    const taskError = snapshot => {
      alert("Error Occured");
    };

    task.on(
      "state_changed",
      snapshot => {
        const {transferred} = this.state;
        this.setState({
          transferred:
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
        });
      },
      taskError,
      taskCompleted,
    );
  };

  writeUserData(message) {
    const {profilePresent, setDisplayImage} = this.state;
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
            imageURL: profilePresent ? doc.data().downloadURL : NO_IMAGE_LINK,
            messageImage: setDisplayImage,
          })
          .then(data => {
            this.setState({
              message: "",
              messageImage: null,
              setImage: null,
              setDisplayImage: null,
            });
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

  showAlert = () => {
    const {setImage, setDisplayImage} = this.state;
    Alert.alert("Alert", "", [
      {text: "Show", onPress: () => Linking.openURL(setDisplayImage)},
      {
        text: "Remove",
        onPress: () => {
          this.setState({
            setDisplayImage: null,
            setImage: null,
          });
        },
      },
      {text: "Cancel", onPress: () => null, style: "cancel"},
    ]);
  };

  render() {
    const {
      messageList,
      profilePresent,
      setImage,
      setDisplayImage,
      messageImage,
      message,
    } = this.state;
    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: "#51AD28"}} />
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
              <View style={{marginBottom: 5}}>
                <ModalHeaderNavigationBar
                  title={this.state.data}
                  onPress={() => this.props.navigation.goBack()}
                />
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
                                {item.messageImage ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      Linking.openURL(item.messageImage)
                                    }>
                                    <Image
                                      source={{uri: item.messageImage}}
                                      style={styles.ImageStyle}
                                    />
                                  </TouchableOpacity>
                                ) : null}
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
            <View
              style={{
                flexDirection: "row",
                minHeight: 35,
                alignSelf: "center",
              }}>
              <View style={styles.ViewStyle7}>
                {setDisplayImage ? (
                  <TouchableOpacity onPress={this.showAlert}>
                    <Image
                      source={{uri: setDisplayImage}}
                      style={styles.ImageStyle1}
                    />
                  </TouchableOpacity>
                ) : null}
                <TextInput
                  style={styles.TextInputStyle}
                  multiline
                  placeholderTextColor={"gray"}
                  value={this.state.message}
                  placeholder="Enter Message here"
                  onChangeText={message => this.setState({message})}
                />
              </View>

              <View style={{flexDirection: "row", marginLeft: 10}}>
                {setImage ? (
                  <TouchableOpacity>
                    <Icon
                      style={styles.IconStyle}
                      size={30}
                      name={"cloud-upload-outline"}
                      onPress={this.uploadImage}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Icon
                      style={styles.IconStyle}
                      size={30}
                      name={"image-outline"}
                      onPress={this.takePhotoFromLib}
                    />
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  style={styles.AskButtonStyle1}
                  disabled={message.length === 0 || setDisplayImage === 0}
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

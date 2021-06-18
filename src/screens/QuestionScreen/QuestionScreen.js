import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Linking } from 'react-native';
import { firebase } from '../../config/config';
import { LOGO } from '../../config/styles.js';
import styles from './styles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

class QuestionScreen extends  React.Component {
    state = {QueryInput : '', setimage : null, setDisplayImage: null};

    takephotofrommlib = () => {
        const {setimage} = this.state
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.path : image.path;
          this.setState({setimage: imageUri});
          console.log("image.path")
          console.log(setimage)
        }).catch("Unknown Error Occured")
      };

      uploadImage = async () => {
        const {setimage} = this.state
        if(setimage == null){
          return
        }
  
          const uri = setimage;
          const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
          console.log(childPath)
  
          const response = await fetch(uri);
          const blob = await response.blob();
  
          const task = firebase
              .storage()
              .ref()
              .child(childPath)
              .put(blob);
  
          const taskProgress = snapshot => {
              console.log(`transferred: ${snapshot.bytesTransferred}`)
          }
  
          const taskCompleted = () => {
              task.snapshot.ref.getDownloadURL().then((snapshot) => {
                  console.log(snapshot)
                  this.setState({setDisplayImage: snapshot})
              }).catch((error) => {
                console.log("Unknown Error Occured")
              })
          }
  
          const taskError = snapshot => {
              console.log(snapshot)
          }
  
          task.on("state_changed", taskProgress, taskError, taskCompleted);
      }

      show_alert = () => {
          const {setimage} = this.state
          const {setDisplayImage} = this.state
        Alert.alert(  
            'Alert Title',  
            'My Alert Msg',  
            [  
                {  
                    text: 'Remove',  
                    onPress: () => {this.setState({
                        setDisplayImage: null,
                        setimage: null
                    })},  
                    style: 'cancel',  
                },  
                {text: 'Show', onPress: () => Linking.openURL(setDisplayImage)},  
            ]  
        );  
      }
    render() {
        const {setDisplayImage, setimage} = this.state
    return(
    <SafeAreaView>
        <View>
        <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={LOGO} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Query</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.AskButtonStyle} >
                        <Text style = {{color: "black", fontWeight: '500', textAlign: 'center', fontSize: 16 }}>DONE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.DividerView} />
                <View style={styles.DividerView} />
            </View>
            <View style={{marginTop: 15}}>
                <View style = {styles.QuestionStyle}>
                    <View style={styles.nameHeadlineStyle}>
                        <Text style={{marginLeft: 10}}>Enter your Question here</Text>
                    </View>
                    <View style={{backgroundColor:'white', borderRadius:10, minHeight: 80, marginBottom: 10}}>
                        <TextInput 
                        style={{padding: 10, fontSize: 13, width: "90%", color: 'black' }} 
                        multiline 
                        placeholderTextColor={'gray'}
                        value={this.state.QueryInput}
                        placeholder = "Ask your query, by addressing your problem clearly!"
                        onChangeText={(QueryInput) => this.setState({QueryInput})}
                        />
                        {setDisplayImage ? 
                        <TouchableOpacity onPress={this.show_alert} >
                            <Image source={{uri: setDisplayImage}} style={{height: 100, aspectRatio: 1, alignSelf: 'center', borderRadius: 10}}/>
                        </TouchableOpacity>
                        : null}
                    </View>
                </View> 
            </View>
            <View style={styles.AskButtonStyle2}>
                {setDisplayImage ? null : setimage ? 
                <Icon style={{color: "black", marginRight: 10, alignSelf: "flex-end", }} size={30} name={'cloud-upload-outline'} onPress={this.uploadImage}/> 
                : 
                <Icon style={{color: "black", marginRight: 10, alignSelf: "flex-end", }} size={30} name={'image-outline'} onPress={this.takephotofrommlib}/>}
                
            <TouchableOpacity 
            onPress={() => {
                var timeDate = moment()
                const Useruid = firebase.auth().currentUser.uid
                const {QueryInput} = this.state
                if(QueryInput && QueryInput.length > 0){
                firebase.firestore().collection("queries").add({
                    id: Useruid,
                    QueryInput,
                    postdatetime: firebase.firestore.FieldValue.serverTimestamp(),
                    postTime: timeDate.format('lll'),
                    answer_present: false,
                    query_image: setDisplayImage
                })
                .then((docRef) => {
                    this.setState({
                        QueryInput: '',
                        setDisplayImage: null
                    })
                    alert("Query has been Added")
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    alert("Error occured while adding your Query")
                    console.error("Error adding document: ", error);
                });
            } else {
                alert("Please Enter Valid Query")
            }   
            }} 
                style={styles.AskButtonStyle1} >
                        <Text style = {{color: "black", fontWeight: '500', textAlign: 'center', fontSize: 16 }}>POST</Text>
                    </TouchableOpacity>
                    </View>
                    
        </View>
        </SafeAreaView>
        );
    }
};

export default QuestionScreen;
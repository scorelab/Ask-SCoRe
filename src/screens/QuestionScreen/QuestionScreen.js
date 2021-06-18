import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, TextInput, Alert, Linking } from 'react-native';
import { firebase } from '../../config/config';
import { LOGO } from '../../config/styles.js';
import styles from './styles';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import * as Progress from 'react-native-progress';

class QuestionScreen extends  React.Component {
    state = {QueryInput : '', setimage : null, setDisplayImage: null, transferred: 0};

    takephotofrommlib = () => {
        const {setimage} = this.state
        this.setState({transferred: 0})
        ImagePicker.openPicker({
          width: 300,
          height: 300,
          cropping: true,
        }).then((image) => {
          const imageUri = Platform.OS === 'ios' ? image.path : image.path;
          this.setState({setimage: imageUri});
        }).catch("Unknown Error Occured")
      };

      uploadImage = async () => {
        const {setimage} = this.state
        if(setimage == null){
          return
        }
          const uri = setimage;
          const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
  
          const response = await fetch(uri);
          const blob = await response.blob();
  
          const task = firebase
              .storage()
              .ref()
              .child(childPath)
              .put(blob);

          const taskCompleted = () => {
              const {transferred} = this.state
              task.snapshot.ref.getDownloadURL().then((snapshot) => {
                  this.setState({setDisplayImage: snapshot})
              }).catch((error) => {
                alert(error)
              })
          }
  
          const taskError = snapshot => {
            alert("Error Occured")
        }
  
        task.on("state_changed", snapshot => {
            const {transferred} = this.state
            this.setState({ transferred: Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000})
          }, taskError, taskCompleted);
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
        const {setDisplayImage, setimage, transferred} = this.state
    return(
    <SafeAreaView>
        <View>
        <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={LOGO} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Query</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.AskButtonStyle} >
                        <Text style = {styles.DoneStyle}>DONE</Text>
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
                    <View style={styles.ViewStyle}>
                        <TextInput 
                        style={styles.TextInputStyle} 
                        multiline 
                        placeholderTextColor={'gray'}
                        value={this.state.QueryInput}
                        placeholder = "Ask your query, by addressing your problem clearly!"
                        onChangeText={(QueryInput) => this.setState({QueryInput})}
                        />
                        {setDisplayImage ? 
                        <TouchableOpacity onPress={this.show_alert} >
                            <Image source={{uri: setDisplayImage}} style={styles.ImageStyle}/>
                        </TouchableOpacity>
                        : null}
                    </View>
                </View> 
            </View>
            <View style={styles.AskButtonStyle2}>
            {setDisplayImage ? null : setimage ? 
                 <Progress.Bar progress={transferred} width={230} style={styles.ProgressBarStyle}/> : null}
                {setDisplayImage ? null : setimage ? 
                <Icon style={styles.IconStyle} size={30} name={'cloud-upload-outline'} onPress={this.uploadImage}/> 
                : 
                <Icon style={styles.IconStyle} size={30} name={'image-outline'} onPress={this.takephotofrommlib}/>}
                
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
                        setDisplayImage: null,
                        setimage: null
                    })
                    alert("Query has been Added")
                })
                .catch((error) => {
                    alert("Error occured while adding your Query")
                });
            } else {
                alert("Please Enter Valid Query")
            }   
            }} 
                style={styles.AskButtonStyle1} >
                        <Text style = {styles.PostTextStyle}>POST</Text>
                    </TouchableOpacity>
                    </View>
                    
        </View>
        </SafeAreaView>
        );
    }
};

export default QuestionScreen;
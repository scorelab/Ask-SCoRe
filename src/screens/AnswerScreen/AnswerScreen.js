import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, FlatList, Alert, Linking} from 'react-native';
import { firebase } from '../../config/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { LOGO } from '../../config/styles.js';
import styles from './styles';
import moment from 'moment';

class AnswerScreen extends React.Component {
    userUid = firebase.auth().currentUser.uid
    state = {answerQuery : '', answerDetail: [], questionName: '', questionAskId : '', likeButton: false, queryImage: null, questionId: ''};
    getData() {
        const data = this.props.navigation.getParam('data');
        this.setState({
            data,
            qData
        }, this.renderData);
    }

    deleteData = () => {
        firebase.firestore().collection("queries").doc(this.state.data).delete().then(() => {
            this.props.navigation.navigate("Home")
            alert("Query Deleted")
        }).catch((error) => {
            alert(error)
        });
    }

    renderData(){
        const {answerDetail} = this.state
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").orderBy('answerDateTime', 'desc').onSnapshot((answerSnapShot) => {
            var ansEntity = []
            var ansArray = []
            answerSnapShot.forEach((doc) => {
                ansArray.push(doc.data());
            });
            ansArray.forEach((query) => {
                firebase.firestore().collection("users").doc(query.id).onSnapshot((userObject) => {
                    answerData = {
                        "answerUid" : query.answerUid,
                        "answerTime" : query.answerTime,
                        "answerQuery" : query.answerQuery,
                        "userAnswer" : userObject.data().fullName,
                        "likeAnswer" : query.likeButton,
                    }
                ansEntity.push(answerData)
                this.setState({answerDetail : ansEntity})
                })
            })
        })
        firebase.firestore().collection("queries").doc(this.state.data).get().then((doc) => {
            this.setState({questionName: doc.data().queryInput})
            this.setState({questionAskId: doc.data().id})
            this.setState({queryImage: doc.data().queryImage})
        })
        firebase.firestore().collection("queries").doc(this.state.data).get().then((doc) => {
            this.setState({questionId: doc.data().id})
        })
    }

    likedButton(ansUid, lb) {
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(ansUid).update({
            "likeButton": lb,
        })
        firebase.firestore().collection("queries").doc(this.state.data).update({
            answerPresent: true
        })  
    }

    showAlert = () => {
        const {setDisplayImage} = this.state
        Alert.alert(  
          'Alert Title',  
          'My Alert Msg',  
          [  
              {  
                  text: 'Cancel',  
                  onPress: () => console.log('Cancel Pressed'),  
                  style: 'cancel',  
              },  
              {text: 'Delete', onPress: this.deleteData},  
          ]  
      );  
    }

    dislikeButton(ansUid, lb) {
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(ansUid).update({
            "likeButton": lb,
        })
        firebase.firestore().collection("queries").doc(this.state.data).update({
            answerPresent: false
        })
    }

    addAnswer = () => {
        var timeDate = moment()
        const {answerQuery, likeButton} = this.state
        if(answerQuery && answerQuery.length > 0){
            firebase.firestore().collection("queries").doc(this.state.data).collection("answers").add({
                id: firebase.auth().currentUser.uid,
                answerQuery,
                answerTime: timeDate.format('lll'),
                likeButton,
                answerDateTime: firebase.firestore.FieldValue.serverTimestamp()
            }).then((docRef) => {
                this.setState({
                    answerQuery: ''
                })
                firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(docRef.id).update({
                    answerUid: docRef.id
                });
            }).catch((error) => {
                alert("Error occured while adding your Answer")
            });
        } else {
            alert("Please Enter Valid Answer")
        }
    }

    componentDidMount(){
        this.getData()
    }

    render() {
        const { answerDetail, questionName, questionAskId, likeButton, queryImage, questionId } = this.state
        userUid = firebase.auth().currentUser.uid
    return(
        <SafeAreaView>
        <View>
        <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={LOGO} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Answer Query</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.AskButtonStyle} >
                        <Text style = {styles.doneStyle}>DONE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.DividerView} />
                <View style={styles.DividerView} />
            </View>

            <View style={{marginVertical: 15}}>
                <View style = {styles.QuestionStyle}>
                    <View style={styles.nameHeadlineStyle}>

                        <View style={styles.ViewStyle}>
                            <Text style={styles.QuestionlabelStyle}>Question:-</Text>  
                            {userUid === questionId ? <TouchableOpacity onPress={this.showAlert} style={styles.TouchableIconStyle}>
                                <Icon style={styles.IconStyle} size={20} name={'trash-outline'} />
                            </TouchableOpacity> : null}
                        </View>
                        <Text style={styles.QuestionNameStyle}>{questionName}</Text>
                        { 
                        queryImage ? 
                        <TouchableOpacity onPress={() => Linking.openURL(queryImage)}>
                            <Image source={{uri: queryImage}} style={styles.ImageStyle}/>
                        </TouchableOpacity>
                         : null }
                    </View>
                    <View style={styles.ViewStyle1}>
                    <View style={styles.DividerView} />
                        <TextInput 
                            style={styles.textInputStyle} 
                            multiline
                            placeholderTextColor={'gray'}  
                            placeholder = "Ask your query, by addressing your problem clearly!"
                            value = {this.state.answerQuery} 
                            onChangeText={(answerQuery) => this.setState({answerQuery})}
                        />
                        <TouchableOpacity 
                        style={styles.AnswerButtonStyle}
                        onPress={this.addAnswer}
                        >
                            <Text style = {styles.AnswerStyle}>Answer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.DividerView1} />
                <FlatList
                    data={answerDetail}
                    renderItem = {({item}) => {
                        return (
                                <View style={{marginVertical: 10}}>                                        
                                        <View style = {styles.QuestionStyle}>
                                            <View style={styles.nameHeadlineStyle1}>
                                                <Text style={styles.userAnsStyle}>{item.userAnswer}</Text>
                                                <Text style={styles.ansTimeStyle}>{item.answerTime}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.Q_ansStyle}>{item.answerQuery}</Text>
                                                { 
                                                this.userUid === this.state.questionAskId ? 
                                                item.likeAnswer ? <View style={styles.AnswerButtonStyle1}>
                                                         <TouchableOpacity
                                                        onPress={() => this.dislikeButton(item.answerUid, !item.likeAnswer)}
                                                        >
                                                            <Text style = {styles.LikeStyle}>Unlike</Text>
                                                        </TouchableOpacity>
                                                    </View> : <View style={styles.AnswerButtonStyle}>
                                                         <TouchableOpacity
                                                        onPress={() => this.likedButton(item.answerUid, !item.likeAnswer)}
                                                        >
                                                            <Text style = {styles.LikeStyle}>Like</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : item.likeAnswer ? <View style={styles.AnswerButtonStyle2}>
                                                        <Icon style={styles.StarIconStyle} size={20} name={'star'} />
                                                    </View> : null
                                                }
                                            </View>
                                        </View>
                                    </View>
                        )
                    }}
                    keyExtractor={(item, index) => 'key'+index}
                    ListFooterComponent={<View style={{height: 520}}/>}
                />
        </View>  
        </SafeAreaView>
    )
    }
};

export default AnswerScreen;
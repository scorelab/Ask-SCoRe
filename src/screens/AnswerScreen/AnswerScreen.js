import React from 'react';
import {View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, FlatList, Alert, Linking} from 'react-native';
import { firebase } from '../../config/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { LOGO } from '../../config/styles.js';
import styles from './styles';
import moment from 'moment';

class AnswerScreen extends React.Component {
    user_uid = firebase.auth().currentUser.uid
    state = {AnswerQuery : '', answerdetail: [], Questionname: '', QuestionAskid : '', LikeButton: false, q_image: null, Questionid: ''};
    getData() {
        const data = this.props.navigation.getParam('data');
        this.setState({
            data,
            q_data
        }, this.renderdata);
    }

    deletedata = () => {
        firebase.firestore().collection("queries").doc(this.state.data).delete().then(() => {
            console.log("Question Deleted")
            this.props.navigation.navigate("Home")
            alert("Query Deleted")
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    renderdata(){
        const {answerdetail} = this.state
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").orderBy('ans_data_time', 'desc').onSnapshot((answerSnapShot) => {
            var ansEntity = []
            var ansArray = []
            answerSnapShot.forEach((doc) => {
                ansArray.push(doc.data());
            });
            ansArray.forEach((query) => {
                firebase.firestore().collection("users").doc(query.id).onSnapshot((userObject) => {
                    a_data = {
                        "answer_uid" : query.Answer_id,
                        "and_time" : query.AnsTime,
                        "q_ans" : query.AnswerQuery,
                        "user_ans" : userObject.data().fullName,
                        "liked_answer" : query.LikeButton,
                    }
                ansEntity.push(a_data)
                this.setState({answerdetail : ansEntity})
                })
            })
        })
        firebase.firestore().collection("queries").doc(this.state.data).get().then((doc) => {
            this.setState({Questionname: doc.data().QueryInput})
            this.setState({QuestionAskid: doc.data().id})
            this.setState({q_image: doc.data().query_image})
        })
        firebase.firestore().collection("queries").doc(this.state.data).get().then((doc) => {
            this.setState({Questionid: doc.data().id})
        })
    }

    iflikedButton(ansuid, lb) {
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(ansuid).update({
            "LikeButton": lb,
        })
        firebase.firestore().collection("queries").doc(this.state.data).update({
            answer_present: true
        })  
    }

    show_alert = () => {
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
              {text: 'Delete', onPress: this.deletedata},  
          ]  
      );  
    }

    ifDislikeButton(ansuid, lb) {
        firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(ansuid).update({
            "LikeButton": lb,
        })
        firebase.firestore().collection("queries").doc(this.state.data).update({
            answer_present: false
        })
    }

    UNSAFE_componentWillMount(){
        this.getData()
    }

    render() {
        const { answerdetail, Questionname, QuestionAskid, LikeButton, q_image, Questionid } = this.state
        user_uid = firebase.auth().currentUser.uid
    return(
        <SafeAreaView>
        <View>
        <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={LOGO} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Answer Query</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.AskButtonStyle} >
                        <Text style = {{color: "black", fontWeight: '500', textAlign: 'center', fontSize: 16 }}>DONE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.DividerView} />
                <View style={styles.DividerView} />
            </View>

            <View style={{marginVertical: 15}}>
                <View style = {styles.QuestionStyle}>
                    <View style={styles.nameHeadlineStyle}>

                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{marginLeft: 10, paddingLeft: 5, marginTop: 5, fontWeight: "700"}}>Question:-</Text>  
                            {user_uid === Questionid ? <TouchableOpacity onPress={this.show_alert} style={{ marginRight: 10, paddingLeft: 5, marginTop: 5, fontWeight: "700"}}>
                                <Icon style={{color: "gray", alignSelf: "flex-end", }} size={20} name={'trash-outline'} />
                            </TouchableOpacity> : null}
                        </View>
                        <Text style={{marginLeft: 10, marginRight:5, padding:5, marginBottom: 5}}>{Questionname}</Text>
                        { 
                        q_image ? 
                        <TouchableOpacity onPress={() => Linking.openURL(q_image)}>
                            <Image source={{uri: q_image}} style={{height: 100, aspectRatio: 1, alignSelf: 'center', borderRadius: 10, marginBottom: 10}}/>
                        </TouchableOpacity>
                         : null }
                    </View>
                    <View style={{backgroundColor:'white', borderRadius:10}}>
                    <View style={styles.DividerView} />
                        <TextInput 
                            style={{padding: 10, fontSize: 13, width: "100%", marginBottom:5, color: 'black' }} 
                            multiline
                            placeholderTextColor={'gray'}  
                            placeholder = "Ask your query, by addressing your problem clearly!"
                            value = {this.state.AnswerQuery} 
                            onChangeText={(AnswerQuery) => this.setState({AnswerQuery})}
                        />
                        <TouchableOpacity 
                        style={styles.AnswerButtonStyle}
                        onPress={() => {
                            var timeDate = moment()
                            const {AnswerQuery} = this.state
                            if(AnswerQuery && AnswerQuery.length > 0){
                            firebase.firestore().collection("queries").doc(this.state.data).collection("answers").add({
                                id: firebase.auth().currentUser.uid,
                                AnswerQuery,
                                AnsTime: timeDate.format('lll'),
                                LikeButton,
                                ans_data_time: firebase.firestore.FieldValue.serverTimestamp()
                            }).then((docRef) => {
                                this.setState({
                                    AnswerQuery: ''
                            })
                                alert("Answer has been Added")
                                firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(docRef.id).update({
                                    Answer_id: docRef.id
                                });
                            })
                            .catch((error) => {
                                alert("Error occured while adding your Answer")
                                console.error("Error adding document: ", error);
                            });
                        } else {
                            alert("Please Enter Valid Answer")
                            }
                        }}
                        >
                            <Text style = {{color: "black", fontWeight: '400', textAlign: 'center', fontSize: 14 }}>Answer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.DividerView1} />
                <FlatList
                    data={answerdetail}
                    renderItem = {({item}) => {
                        return (
                                <View style={{marginVertical: 10}}>                                        
                                        <View style = {styles.QuestionStyle}>
                                            <View style={styles.nameHeadlineStyle1}>
                                                <Text style={{marginLeft: 10, marginTop: 2}}>{item.user_ans}</Text>
                                                <Text style={{fontSize: 10, marginTop: 5, marginRight: 5, color:'white'}}>{item.and_time}</Text>
                                            </View>
                                            <View>
                                                <Text style={{padding: 10, fontSize: 13}}>{item.q_ans}</Text>
                                                { 
                                                this.user_uid === this.state.QuestionAskid ? 
                                                item.liked_answer ? <View style={styles.AnswerButtonStyle1}>
                                                         <TouchableOpacity
                                                        onPress={() => this.ifDislikeButton(item.answer_uid, !item.liked_answer)}
                                                        >
                                                            <Text style = {{color: "black", fontWeight: '400', textAlign: 'center', fontSize: 14 }}>Unlike</Text>
                                                        </TouchableOpacity>
                                                    </View> : <View style={styles.AnswerButtonStyle}>
                                                         <TouchableOpacity
                                                        onPress={() => this.iflikedButton(item.answer_uid, !item.liked_answer)}
                                                        >
                                                            <Text style = {{color: "black", fontWeight: '400', textAlign: 'center', fontSize: 14 }}>Like</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : item.liked_answer ? <View style={styles.AnswerButtonStyle2}>
                                                        <Icon style={{color: "gold", marginRight: 10, alignSelf: "flex-end", }} size={20} name={'star'} />
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
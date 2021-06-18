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
            this.props.navigation.navigate("Home")
            alert("Query Deleted")
        }).catch((error) => {
            alert(error)
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
                            {user_uid === Questionid ? <TouchableOpacity onPress={this.show_alert} style={styles.TouchableIconStyle}>
                                <Icon style={styles.IconStyle} size={20} name={'trash-outline'} />
                            </TouchableOpacity> : null}
                        </View>
                        <Text style={styles.QuestionNameStyle}>{Questionname}</Text>
                        { 
                        q_image ? 
                        <TouchableOpacity onPress={() => Linking.openURL(q_image)}>
                            <Image source={{uri: q_image}} style={styles.ImageStyle}/>
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
                                firebase.firestore().collection("queries").doc(this.state.data).collection("answers").doc(docRef.id).update({
                                    Answer_id: docRef.id
                                });
                            })
                            .catch((error) => {
                                alert("Error occured while adding your Answer")
                            });
                        } else {
                            alert("Please Enter Valid Answer")
                            }
                        }}
                        >
                            <Text style = {styles.AnswerStyle}>Answer</Text>
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
                                                <Text style={styles.userAnsStyle}>{item.user_ans}</Text>
                                                <Text style={styles.ansTimeStyle}>{item.and_time}</Text>
                                            </View>
                                            <View>
                                                <Text style={styles.Q_ansStyle}>{item.q_ans}</Text>
                                                { 
                                                this.user_uid === this.state.QuestionAskid ? 
                                                item.liked_answer ? <View style={styles.AnswerButtonStyle1}>
                                                         <TouchableOpacity
                                                        onPress={() => this.ifDislikeButton(item.answer_uid, !item.liked_answer)}
                                                        >
                                                            <Text style = {styles.LikeStyle}>Unlike</Text>
                                                        </TouchableOpacity>
                                                    </View> : <View style={styles.AnswerButtonStyle}>
                                                         <TouchableOpacity
                                                        onPress={() => this.iflikedButton(item.answer_uid, !item.liked_answer)}
                                                        >
                                                            <Text style = {styles.LikeStyle}>Like</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : item.liked_answer ? <View style={styles.AnswerButtonStyle2}>
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
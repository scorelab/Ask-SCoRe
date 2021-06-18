import React from 'react';
import { firebase } from '../../config/config';
import { View, Text, SafeAreaView, Image, TouchableOpacity, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { LOGO } from '../../config/styles.js';
import styles from './styles';

class HomeScreen extends React.Component{
    state = {querydetail : []};
    componentDidMount() {
        const {querydetail} = this.state
        firebase.firestore().collection("queries").orderBy('postdatetime', 'desc').onSnapshot((querySnapshot) => {
            var newentity = []
            var queryArray = []
            querySnapshot.forEach((doc) => {
                q_data = {
                    "id": doc.data().id,
                    "QueryInput": doc.data().QueryInput,
                    "postTime": doc.data().postTime,
                    "q_id": doc.id,
                    "postdatetime": doc.data().postdatetime,
                    "answer_present": doc.data().answer_present,
                    "q_image" : doc.data().query_image
                }
                queryArray.push(q_data);
            });
          
            queryArray.forEach((query) => {
                firebase.firestore().collection("users").doc(query.id).get().then((userObject) => {
                    data = {"name": userObject.data().fullName,
                    "QueryInput": query.QueryInput,
                    "Q_id": query.q_id,
                    "post_time": query.postTime,
                    "postdatetime": query.postdatetime,
                    "answer_present": query.answer_present,
                    "q_image": query.q_image
                }
                newentity.push(data)
                this.setState({querydetail : newentity})
                })
            })
        })
    }

    render() {
        const { querydetail } = this.state
    return(
        <SafeAreaView>
        <View>
            <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={LOGO} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Community</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.push("Question")} style={styles.AskButtonStyle} >
                        <Text style = {styles.AskStyle}>ASK</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.DividerView} />
                <View style={styles.DividerView} />
            </View>

            <FlatList
                data={querydetail}
                renderItem = {({item}) => {
                    return (
                            <TouchableOpacity onPress={() => this.props.navigation.push("Answer", {
                                data: item.Q_id,
                                q_data: item.QueryInput
                              })}>
                            <View style={{marginVertical: 10}}>     
                                    <View style = {styles.QuestionStyle}>
                                        <View style={styles.nameHeadlineStyle}>
                                            <Text style={styles.itemnameStyle}>{item.name}</Text>
                                            <Text style={styles.postTimeStyle}>{item.post_time}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.QueryStyle}>{item.QueryInput}</Text>
                                            { item.q_image ? <Image source={{uri: item.q_image}} style={styles.ImageStyle} /> : null}
                                            {item.answer_present ? 
                                            <View style={styles.AnswerButtonStyle1}>
                                                <Text style = {styles.textStyle}>Answered</Text>
                                            </View> : <View style={styles.AnswerButtonStyle}>
                                                <Text style = {styles.textStyle}>Answer</Text>
                                            </View>
                                            }
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                    )
                }}
                keyExtractor={(item, index) => 'key'+index}
                ListFooterComponent={<View style={{height: 170}}/>}
            />
        </View>
        </SafeAreaView>
      )
    }
};

export default withNavigation(HomeScreen);
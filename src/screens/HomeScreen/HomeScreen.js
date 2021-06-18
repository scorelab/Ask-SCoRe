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
                    "uid": doc.data().id,
                    "QueryInput": doc.data().QueryInput,
                    "postTime": doc.data().postTime,
                    "id": doc.id,
                    "postdatetime": doc.data().postdatetime,
                    "answerpresent": doc.data().answer_present,
                    "queryimage" : doc.data().query_image
                }
                queryArray.push(q_data);
            });
          
            queryArray.forEach((query) => {
                firebase.firestore().collection("users").doc(query.uid).get().then((userObject) => {
                    data = {"fullName": userObject.data().fullName,
                    "QueryInput": query.QueryInput,
                    "id": query.id,
                    "postTime": query.postTime,
                    "postdatetime": query.postdatetime,
                    "answerpresent": query.answerpresent,
                    "qimage": query.queryimage
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
                                data: item.id,
                                q_data: item.QueryInput
                              })}>
                            <View style={{marginVertical: 10}}>     
                                    <View style = {styles.QuestionStyle}>
                                        <View style={styles.nameHeadlineStyle}>
                                            <Text style={styles.itemnameStyle}>{item.fullName}</Text>
                                            <Text style={styles.postTimeStyle}>{item.postTime}</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.QueryStyle}>{item.QueryInput}</Text>
                                            { item.qimage ? <Image source={{uri: item.qimage}} style={styles.ImageStyle} /> : null}
                                            {item.answerpresent ? 
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
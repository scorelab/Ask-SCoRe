import { StyleSheet } from 'react-native';
import { COLOR_LIGHT_PRIMARY, COLOR_LIGHT_SECONDARY} from '../../config/styles';

export default StyleSheet.create({
    HeaderStyle : {
        fontSize: 30,
        flex: 1,
        marginLeft: 10, 
        marginTop: 5
    },

    ImageView : {
        width: 55,
        height: 55,
        marginHorizontal: 5
    },

    HeaderStyle1 : {
        flexDirection: 'row',
    },

    DividerView : {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginBottom:3,
        marginHorizontal: 10
    },

    AskButtonStyle : {
        width: "16%",
        height: 32,
        backgroundColor: COLOR_LIGHT_PRIMARY,
        borderRadius: 10,
        right: 10,
        justifyContent: 'center',
        marginTop: 7
    },

    QuestionStyle : {
        width : "90%",
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: Platform.OS === 'ios' ? '#fff' : null,
        borderColor: '#b8b8b8',
        shadowColor: Platform.OS === 'ios' ? '#000000' : '#000000',
        shadowOffset: {
        width: Platform.OS === 'ios' ? 0 : 0,
        height: Platform.OS === 'ios' ? 2 : 2,
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.9 : 0.8,
        shadowRadius: Platform.OS === 'ios' ? 3 : 40,
        elevation: Platform.OS === 'ios' ? 3 : 4,
        alignSelf: 'center'
    },

    nameHeadlineStyle : {
        width: "101%",
        paddingVertical: 2,
        backgroundColor: COLOR_LIGHT_SECONDARY,
        borderRadius: 7,
        alignSelf: 'center',
        justifyContent: 'space-between',
        top: 0,
        flexDirection: 'row',
    },

    AnswerButtonStyle : {
        width: "20%",
        paddingVertical: 2,
        backgroundColor: COLOR_LIGHT_PRIMARY,
        borderRadius: 5,
        alignSelf: 'flex-end',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
    },

    AnswerButtonStyle1 : {
        width: "20%",
        paddingVertical: 2,
        backgroundColor: COLOR_LIGHT_SECONDARY,
        borderRadius: 5,
        alignSelf: 'flex-end',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
    },
});
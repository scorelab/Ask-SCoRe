import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    WholeTabBar : {
        width: 300,
        height: 40,
        backgroundColor: '#dbdbdb',
        alignSelf: 'center',
        borderRadius: 20,
        flexDirection: 'row'
    },

    LoginTabBar : {
        height: "100%",
        width: "50%",
        backgroundColor: "#dbdbdb",
        borderRadius: 20
    },

    SignupTabBar : {
        height: "100%",
        width: "50%",
        backgroundColor: "#51AD28",
        borderRadius: 20
    },

    ImageView : {
        height: 80,
        width:80,
        marginBottom:20
    },

    BarStyle : {
        textAlign: 'center', 
        marginTop: 8, 
        color: '#d4d4d4', 
        fontSize: 20, 
        fontWeight: '800'
    },

    BarStyle1 : {
        textAlign: 'center', 
        marginTop: 8, 
        color: '#51AD28', 
        fontSize: 20, 
        fontWeight: '800'
    },

    ViewStyle : {
        backgroundColor: 'white', 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: "20%"
        
    }
});
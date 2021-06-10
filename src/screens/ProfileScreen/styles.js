import { StyleSheet } from 'react-native';
import { COLOR_PRIMARY } from '../../config/styles';

export default StyleSheet.create({
    LoginButtonView : {
        width: "100%", 
        height: 50, 
        backgroundColor: COLOR_PRIMARY, 
        justifyContent: 'center', 
        borderRadius: 20
      },
    
      LoginButtonText: {
        textAlign: 'center',
        fontSize: 20,
        color: 'white',
        fontWeight: '800'
      },
});
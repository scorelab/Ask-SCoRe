import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';
import styles from './styles';

const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor = selected ? '#51AD28' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={styles.buttonView}
        {...props}
    >
        <Text style={styles.textView}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={styles.buttonView}
        {...props}
    >
        <Text style={styles.textView}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={styles.buttonView}
        {...props}
    >
        <Text style={styles.textView}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.replace("Start")}
        onDone={() => navigation.navigate("Start")}
        pages={[
          {
            backgroundColor: '#fff',
            image: <Image style={{width: 350, height: 200}} source={require('../../../assets/OB1.png')} />,
            title: <Text style={{fontSize: 45, fontWeight: '200', marginBottom: 20}}>Community</Text>,
            subtitle: <Text style={{marginBottom: 50, letterSpacing: 2}}>Support and Help Each Other</Text>,
          },
          {
            backgroundColor: '#fff',
            image: <Image style={{width: 300, height: 276}} source={require('../../../assets/OB2.png')} />,
            title: <Text style={{fontSize: 45, fontWeight: '200', marginBottom: 20}}>Collaboration</Text>,
            subtitle: <Text style={{marginBottom: 50, letterSpacing: 2}}>Collaborate and sync on Projects</Text>,
          },
          {
            backgroundColor: '#fff',
            image: <Image style={{width: 300, height: 180}} source={require('../../../assets/OB3.png')} />,
            title: <Text style={{fontSize: 45, fontWeight: '200', marginBottom: 20}}>Communicate</Text>,
            subtitle: <Text style={{marginBottom: 50, letterSpacing: 2}}>Communication is what makes team strong</Text>,
          },
          {
            backgroundColor: '#fff',
            image: <Image style={{width: 300, height: 250}} source={require('../../../assets/OB4.png')} />,
            title: <Text style={{fontSize: 45, fontWeight: '200', marginBottom: 20}}>Queries</Text>,
            subtitle: <Text style={{marginBottom: 50, letterSpacing: 2}}>Get your queries Resolved</Text>,
          },
        ]}
      />
    );
};

export default OnboardingScreen;
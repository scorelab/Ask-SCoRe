import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image, ScrollView, Platform } from 'react-native';
import { firebase } from '../../config/config';
import ImagePicker from 'react-native-image-crop-picker';
import styles from './styles';

const ProfileScreen = () => {

    const [name, setName] = useState("")
    const [occupation, setOccupation] = useState("")
    const [interest, setInterest] = useState("")
    const [country, setCountry] = useState("")
    const [editfield, setEditfield] = useState(false)
    const [image, setImage] = useState(null)
    const [displayImage, setDisplayImage] = useState("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png");

    const userID1 = firebase.auth().currentUser.uid
    const ref = firebase.firestore().collection("users").doc(userID1);

    useEffect(() => {
        ref.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                setName(doc.data().fullName);
                setInterest(doc.data().interest)
                setCountry(doc.data().country)
                setOccupation(doc.data().occupation)
                setDisplayImage(doc.data().downloadURL)
                console.log(name);
                
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });     
  }, [])

    const uploadImage = async () => {
      if(image == null){
        savePostData(displayImage) 
        return
      }
        const uri = image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            }).catch((error) => {
              console.log("Unknown Error Occured")
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }
    
    const savePostData = (downloadURL) => {
      setEditfield(false)
      setDisplayImage(downloadURL)
      console.log("Image Data")
      console.log(downloadURL)
        ref.update({
                country,
                occupation,
                interest,
                downloadURL,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then(() => {
                console.log("Edit profile Completed")
                alert("Updated Profile")
            }).catch((error) => {
              console.log("Unknown Error Occured")
         })
    }

  const takephotofrommlib = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.path : image.path;
      setImage(image.path);
      console.log("image.path")
      console.log(image.path)
    }).catch("Unknown Error Occured")
  };

    return (  
      <SafeAreaView style={styles.SafeStyle}>
        <View style={{marginBottom: 20}}>
            <View style={{marginBottom: 15}}>
                <View style={styles.HeaderStyle1}>
                    <Image source={require("../../../assets/Ask-SCORE-Logo.png")} style={styles.ImageView} />
                    <Text style={styles.HeaderStyle}>Profile</Text>

                    { editfield ? 
                      <TouchableOpacity onPress={uploadImage} style={styles.AskButtonStyle} >
                        <Text style = {styles.EditDoneStyle}>DONE</Text>
                      </TouchableOpacity>
                    : 
                    <TouchableOpacity onPress={() => setEditfield(true)} style={styles.AskButtonStyle} >
                        <Text style = {styles.EditDoneStyle}>EDIT</Text>
                    </TouchableOpacity>
                    }
                </View>
                <View style={styles.DividerView} />
                <View style={styles.DividerView} />
            </View>
        </View>
        
        <ScrollView style={{height: "100%"}} bounces={false}>   
        <View style={styles.ViewStyle}>
            <View style = {{marginVertical: 10}}>
              <Image style={styles.ImageProfileStyle} source={{uri: displayImage}} resizeMode={"cover"}/>
            
            { editfield ? 
            <TouchableOpacity onPress={takephotofrommlib}>
                <Text style={styles.PickImageStyle}>Pick Image</Text>
            </TouchableOpacity>
            : null }
        </View>

            <View style = {styles.container2}>
              <View style = {styles.container4}>
                <Text style = {styles.title1}>Full Name</Text>
                <View style={styles.line1} />
                    <View style = {styles.container3}>
                        <View style={styles.ViewStyle2}>
                        <TextInput
                            style={{color:'black'}}
                            value={name}
                            editable = {false}
                            keyboardType="numeric"
                        />
                        </View>
                    </View>
                </View>


                <View style={styles.line} />

                <View style = {styles.container4}>
                <Text style = {styles.title1}>Email</Text>
                <View style={styles.line1} />
                <View style = {styles.container3}>
                    <View style={styles.ViewStyle2}>
                    <TextInput
                    style={{color:'black'}}
                          value={firebase.auth().currentUser.email}
                          editable = {false}
                          keyboardType="numeric"
                        />
                    </View>
                </View>
                </View>
                <View style={styles.line} />

                <View style = {styles.container4}>
                <Text style = {styles.title1}>Occupation</Text>
                <View style={styles.line1} />
                <View style = {styles.container3}>
                    <View style={styles.ViewStyle2}>
                    <TextInput
                    style={{color:'black'}}
                          value={occupation}
                          editable = {editfield}
                          onChangeText={(text) => setOccupation(text)}
                        />
                    </View>
                </View>
                </View>

                <View style={styles.line} />

                <View style = {styles.container4}>
                <Text style = {styles.title1}>Interest</Text>
                <View style={styles.line1} />
                <View style = {styles.container3}>
                    <View style={styles.ViewStyle2}>
                    <TextInput
                    style={{color:'black'}}
                          value={interest}
                          editable = {editfield}
                          onChangeText={(text) => setInterest(text)}
                        />
                    </View>
                </View>
                </View>

                <View style={styles.line} />

                <View style = {styles.container4}>
                <Text style = {styles.title1}>Country</Text>
                <View style={styles.line1} />
                <View style = {styles.container3}>
                    <View style={styles.ViewStyle2}>
                    <TextInput
                    style={{color:'black'}}
                          value={country}
                          editable = {editfield}
                          onChangeText={(text) => setCountry(text)}
                        />
                    </View>
                </View>
                </View>

                <View style={styles.line} />

            <View style={styles.LogoutButtonStyle}>
              <TouchableOpacity style= {styles.LoginButtonView} onPress={() => firebase.auth().signOut()}>
                <Text style={styles.LoginButtonText}>Logout</Text>
              </TouchableOpacity>
            </View>
            </View>
        </View>
        </ScrollView>
        </SafeAreaView>
    )
};

export default ProfileScreen;
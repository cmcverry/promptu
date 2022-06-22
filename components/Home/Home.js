import React, { useState } from 'react';
import {View, Button, Text, TextInput} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { getAuth, updateProfile} from "firebase/auth";
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import fb from '../../setup.js';

const db = getFirestore(fb);
const auth = getAuth();

const Home = ({navigation}, props) => {

    //React hook
    const [text, onChangeText] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.title}>PROMPTU</Text>
            <Text style={styles.sub}>Choose a username or simply click enter to automatically have one generated for you!</Text>
            <View style={{flexDirection:"row"}}>
                    <TextInput
                    style={styles.input}
                    placeholder={"Example: JohnDoe"}
                    onChangeText={onChangeText}
                    value={text}
                    />
                <View style={styles.userbutton}>
                    <Button 
                        onPress={ async ()=> 
                        {if (text == '') {
                            onChangeText('');
                        } else {
                            await updateProfile(auth.currentUser, {
                                displayName: text
                            });
                            await setDoc(doc(db, "users", auth.currentUser.uid), {
                                username: text
                            });
                        } 
                        onChangeText('')
                        navigation.navigate("Prompts")
                            }}
                        title='Enter'> </Button>
                </View>
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Home;
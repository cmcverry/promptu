import React from 'react';
import {View, Text, FlatList, StatusBar, Pressable} from 'react-native';
import styles from './PromptListStyles';
import Prompt from '../Prompt/Prompt';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import fb from '../../authSetup.js';
import { getAuth} from "firebase/auth";

const db = getFirestore(fb);
const promptsRef = collection(db, "prompts");

let prompts = [];
onSnapshot(promptsRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            prompts.push({...doc.data()})
            })
        return prompts
    })

const PromptList = ({navigation}) => {
    const auth = getAuth();
    const username = auth.currentUser.displayName
    console.log(username)

    return (
            
            <View style={styles.container}> 
                <Text style={styles.title}>PROMPTU</Text>
                <Text style={styles.usernameStyle}>Welcome, {username} </Text>
                <FlatList
                data={prompts}
                renderItem={({item}) => 
                    <Pressable onPress={()=> navigation.navigate("Topic", item)}>
                    <Prompt prompt={item} /></Pressable>
                } 
                keyExtractor={(item, index) => index.toString()}
                />
            <StatusBar style="auto" />
            </View>         
    );
};

export default PromptList;
import React from 'react';
import {View, Text, FlatList, StatusBar, Pressable} from 'react-native';
import styles from './PromptListStyles';
import Prompt from '../Prompt/Prompt';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { LinearGradient } from 'expo-linear-gradient';
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

    return (      
            <View style={styles.container}>
                {/* <Text style={styles.title}>PROMPTU</Text> */}
                <LinearGradient
                    colors={['rgba(236,143,12,0.8)', 'transparent']}
                    style={styles.background}
                />
                <View style={styles.topTextContainer}>
                    <Text style={styles.promptlistText}>Your display name:</Text >
                    <Text style={styles.username}>{username}</Text>
                    <Text style={styles.promptlistText}>Select a prompt and join in on the discussion!</Text>
                </View>
                <FlatList
                data={prompts}
                renderItem={({item}) => 

                    <Pressable onPress={()=> navigation.navigate("Discuss the Prompt", item)}>
                        <Prompt prompt={item} />
                    </Pressable>
                } 
                keyExtractor={(item, index) => index.toString()}
                />
            <StatusBar style="auto" />
            </View>         
    );
};

export default PromptList;
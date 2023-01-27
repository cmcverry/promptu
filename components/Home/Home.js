import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './HomeStyles';
import { LinearGradient } from 'expo-linear-gradient';
import {db} from '../../setup';
import { getAuth, signInAnonymously, onAuthStateChanged, updateProfile } from "firebase/auth";
import {setDoc, doc } from 'firebase/firestore';
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";


const Home = ({navigation}) => {

    const auth = getAuth();

    const [username, setUsername] = useState(null)

    useEffect(() => {

        // Auth state listener
        // Checks for unauthenticated users
        // If so, performs anonymous authentication and assigns random display name to user
        onAuthStateChanged(auth, (user) => {
        if (!user) {
            signInAnonymously(auth)
            .then(() => {
                const user = auth.currentUser;

                if (!user.displayName) {
                    const randomName = uniqueNamesGenerator({ dictionaries: [adjectives, colors, animals] });
                    updateProfile(user, {
                        displayName: randomName
                    }).then(() => {
                        setDoc(doc(db, "users", user.uid), {
                        username: user.displayName,
                        });
                    }).catch((error) => {
                        console.log(error)
                });
                }
                setTimeout(() => {setUsername(user.displayName)}, 1500);
            })
            .catch((error) => {
                console.log(error)
            });
            }
            else {
                setTimeout(() => {setUsername(user.displayName)}, 1500);
            }
        });
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(236,143,12,0.8)', 'transparent']}
                style={styles.background}
            />
            <View style={styles.containerContent}>
                <Text style={styles.title}>PROMPTU</Text>
                <Text style={styles.sub}>
                    Welcome to Promptu, a prompt-based anonymous message board!
                    {"\n"}
                </Text>
                { !username ? (
                    <Text style={styles.sub}> Setting up... </Text>
                ): <View style={styles.postSetup}>
                    <Text style={styles.sub}>
                        A display name has been generated and assigned to you.
                        {"\n"}
                        {"\n"}
                        You are: <Text style={styles.username}>{username}</Text>.
                        {"\n"}
                    </Text>
                    <TouchableOpacity onPress={()=> navigation.navigate("Today's Prompts")}>
                        <Text style={styles.continueButton}>Continue to Prompts</Text>
                    </TouchableOpacity>
                </View>
                }
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

export default Home;
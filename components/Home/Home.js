import {View, Text, Pressable} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import styles from './HomeStyles';
import { LinearGradient } from 'expo-linear-gradient';


const Home = ({navigation}, props) => {

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['rgba(236,143,12,0.8)', 'transparent']}
                style={styles.background}
            />
            <Text style={styles.title}>PROMPTU</Text>
            <Text style={styles.sub}>
                Welcome to Promptu, a prompt-based anonymous message board!
                {"\n"}
                {"\n"}
                Woohoo! A display name has been automatically generated and assigned to you. You are good to go!
                {"\n"}
                {"\n"}
            </Text>
            <Pressable onPress={ async ()=> navigation.navigate("Today's Prompts")}>
                <Text style={styles.continueButton}>Continue to Prompts</Text>
            </Pressable>
            <Text style={styles.sub}>Click continue to check out today's prompts!</Text>
            <StatusBar style="auto" />
        </View>
    );
}

export default Home;
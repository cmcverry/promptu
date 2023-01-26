import React from 'react';
import {View, Text} from 'react-native';
import styles from './PromptStyles';

const Prompt = (props) => {
    const {prompt, hashtags, listId} = props.prompt;
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.promptNumber}>{listId + 1}.</Text>
                <View style={styles.promptText}>
                    <Text style={styles.text}>{prompt}
                        {"\n"}
                        {"\n"}
                        <Text style={styles.hashtags}>{hashtags}</Text>
                    </Text>   
                </View>          
            </View>
        </View>
    );
};

export default Prompt;
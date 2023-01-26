import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
    },

    content: {
        backgroundColor: 'lightgray',
        width: Dimensions.get('window').width * .8,
        maxWidth: 1000,
        borderWidth: 2,
        borderRadius: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignSelf: 'center',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 1
        }
    },

    promptText: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    
    text: {
        width: Dimensions.get('window').width * .7,
        maxWidth: 1000 * .9,
        fontFamily: 'monospace',
        fontSize: 14,
        padding: 10,
        paddingTop: 20,
        fontWeight: '500',
        alignSelf: 'center',
        flexWrap: 'wrap'
    },
    hashtags: {
        fontFamily: 'monospace',
        color: '#808080',
        fontSize: 12,
        fontWeight: '500'
    },

    promptNumber: {
        paddingLeft: 20,
        paddingTop: 20,
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }

});

export default styles; 
import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C69EC',
        height: '100%',
    },

    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '75%',
  
      },

      topTextContainer: {
        zIndex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: 'black',
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 3,
        shadowOffset: {
            height: 2,
            width: 1
        },
        paddingBottom: 20
      },

    promptlistText: {
        width: '90%',
        textAlign: "center",
        padding: 10,
        fontFamily: 'monospace',
        fontSize: 15,
        color: 'white'
    },

    username: {
        width: '90%',
        textAlign: 'center',
        fontFamily: 'monospace',
        fontSize: 22,
        color: 'white',
        marginBottom: 20,

    },
});

export default styles; 
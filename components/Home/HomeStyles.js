import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: '#0C69EC'
    },

    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '75%',

    },

    containerContent: {
        marginTop: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
      color: "#DEB57B",
      textShadowColor: '#673E54',
      zIndex: 2,
      textShadowOffset: {width: 4, height: 4},
      marginBottom: '5%',
      width: '100%',
      textAlign: "center",
      fontFamily: 'monospace',
      fontSize: 60,
    },

    sub: {
      zIndex: 2,
      marginBottom: '5%',
      width: '85%',
      textAlign: "center",
      fontFamily: 'monospace',
      fontSize: 18,
      color: "white"
      
    },

    postSetup: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    continueButton:  {
      width: 300,
      textAlign: 'center',
      fontFamily: 'monospace',
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#B48644",
      color: "white",
      fontSize: 22,
      shadowColor: "#000",
      shadowOffset: {
        width: 3,
        height: 3
      },
      shadowOpacity: 0.5,
      marginBottom: '5%',
    },

    username: {
      color: '#DEB57B',
      textShadowColor: '#673E54',
      fontSize: 20,
      textShadowOffset: {width: 3, height: 2},
    }

  });

  export default styles;
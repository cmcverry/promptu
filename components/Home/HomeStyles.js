import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0C69EC'
    },

    background: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: '66%',

    },

    title: {
        color: "lightgray",
        textShadowColor: 'darkblue',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 5,
        marginBottom: '5%',
        width: '100%',
        textAlign: "center",
        fontFamily: 'monospace',
        fontSize: 60,
        fontWeight: '500'
    },

    sub: {
      zIndex: 2,
      marginBottom: '5%',
      width: '85%',
      borderRadius: 20,
      textAlign: "center",
      fontFamily: 'monospace',
      fontSize: 18,
      fontWeight: '500',
      padding: '20px',
      color: "rgb(236,143,12)",
      color: "white"
      
    },

    input: {
      height: 35,
      width: 260,
      marginRight: 10,
      marginBottom: 20,
      borderWidth: 1,
      padding: 5,
      backgroundColor: "white",
      fontFamily: 'monospace'
    },

    continueButton:  {
      borderRadius: 20,
      padding: 20,
      backgroundColor: "#B48644",
      color: "white",
      fontSize: 20
    },

  });

  export default styles;
import { StyleSheet, Dimensions} from "react-native";

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#0C69EC',
      height: '100%'
  },

  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '75%',

  },

  promptContainer: {
      marginTop: 5,
      backgroundColor: 'lightgray',
      paddingTop: 5,
      width: Dimensions.get('window').width * .9,
      maxWidth: 1000,
      borderWidth: 2,
      borderRadius: 20,
      justifyContent: 'center',
      alignSelf: 'center',
      flexDirection: 'column',
      shadowColor: "#000000",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
          height: 1,
          width: 1
      }
  },

  title: {
      marginTop: '3%',
      width: '100%',
      textAlign: "center",
      fontFamily: 'monospace',
      fontSize: 60,
      fontWeight: '500'
  },
    
  text: {
      width: Dimensions.get('window').width * .8,
      maxWidth: 1000 *.85,
      fontFamily: 'monospace',
      fontSize: 14,
      padding: 10,
      paddingTop: 20,
      fontWeight: '500',
      alignSelf: 'left',
      flex: 1,
      flexWrap: 'wrap'
  },

  hashtags: {
      fontFamily: 'monospace',
      color: '#808080',
      fontSize: 12,
      fontWeight: '500',
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 20,
    alignSelf: "flex-end",
    backgroundColor: '#3570C2',
    right: 10
  },

  buttonClose: {
    backgroundColor: "#3570C2",
  },
  
  
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },

  modalView: {
    margin: 20,
    backgroundColor: "lightgray",
    borderRadius: 20,
    padding: 35,
    width: Dimensions.get('window').width * .9,
    maxWidth: 900,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: Dimensions.get('window').width * .7, height:200, textAlignVertical: 'top',
    maxWidth: 900 * .8,
  }
});

export default styles; 
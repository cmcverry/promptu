import { StyleSheet, Dimensions, Platform} from "react-native";

const styles = StyleSheet.create({

    commentContainer: {
        marginBottom: 5,
        backgroundColor: 'lightgray',
        width: Dimensions.get('window').width * .9,
        maxWidth: 800,
        borderWidth: 2,
        borderRadius: 20,
        alignSelf: 'center',
        flexDirection: 'row',
    },
    
    voteButtons: {
        marginLeft: 10,
        alignSelf: 'center',
        flexDirection: 'column',
    },

    voteCount: {
        marginRight: 10,
        alignSelf: "center",

    },

    voteStyle: {
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: 'monospace'
    },

    commentText: {
        flexWrap: "wrap",
        flex: 1,
        // marginBottom: 10,
        // marginTop: 5,
        padding: 5,
        // borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: 'black',
        paddingBottom: 50
    },

    userText: { 
        flexWrap: 'wrap',
        fontSize: 15,
        paddingRight: 10,
        fontWeight: 'bold',
        fontFamily: 'monospace',
        
    },

    bodyText: {
        fontFamily: 'monospace',
    },

    
    badgeButton: {
        // width: "5%",
        // alignSelf: 'center',
        
    },
    flagButton: {
        // width: "10%",
        // margin: 10,
        marginTop: 'auto',
        marginBottom: 'auto',
        marginRight: 10,
        marginLeft: 10,
        alignSelf: 'left',
    },   

    buttonClose: {
        backgroundColor: "#2196F3",
      },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 20,
        alignSelf: "center",
        right: 10
      },

      badge: {
        // flex: 1,
    },

    badgeCount: {
      // flex: 1,
      // margin: 10,

  },

  badgeStyle: {
    fontWeight: "bold",
    fontFamily: 'monospace'
},

  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap"
  },

  badgeInnerContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingRight: 10
  },

  userContainer: {
  flexDirection: 'row'
  },

  // trashContainer: {
  //   flexDirection: 'row',
  // },

  confirmTrash: {
    color: 'white',
    backgroundColor: "#0C69EC",
    textAlign: 'center',
    borderRadius: 20,
    width: 50,
  },
  cancelTrash: {
    color: 'white',
    backgroundColor: "#B48644",
    width: 50,
    textAlign: 'center',
    marginBottom: 2,
    borderRadius: 20
  },

  awardBadgeButtons: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',

    // textAlign: 'center',
    marginBottom: 2,
    borderRadius: 20,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black'

  },

  trashInterface: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    backgroundColor:"lightgray",
    padding: 10,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    width: 180,
    right: 20,
    top: -40
  },

  awardInterface: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 5,
    backgroundColor:"lightgray",
    padding: 5,
    paddingRight: 20,
    paddingLeft: 20,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    width: 180,
    right: 20,
    top: -45
  },

  trashButtonText: {
    color: 'white',
  },

  exitAwardsButton: {
    left: 60,
    paddingRight: 3,
    paddingLeft: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20
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
    maxWidth: 900 * .8
  }

    
});

export default styles; 
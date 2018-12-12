import { StyleSheet } from 'react-native'
import { ApplicationStyles,Colors,Fonts } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  inputContainer:{
    backgroundColor:Colors.grey,
    margin:5,
    paddingRight:20
  },
  text:{
    ...Fonts.style.h5
  },
  transparentButton:{
    backgroundColor:Colors.white,
    margin:10
  },
  submitButton:{
    backgroundColor:Colors.black,
    margin:20,
    marginBottom:40
  },
  error:{
      color:'red',
      alignSelf:'center',
      ...Fonts.style.description,
      margin:10
  },
  message:{
      color:Colors.green,
      alignItems:'center'
  },
  modal: {
    alignItems: 'center',
    width: "86%",
    height: "90%",
    borderRadius: 39,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom:10,
    paddingBottom:40
},
})
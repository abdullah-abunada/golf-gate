import { StyleSheet } from 'react-native'
import { ApplicationStyles,Colors } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,

  inputContainer:{
    backgroundColor:Colors.grey,
    margin:10
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
      alignSelf:'center'
  },
  message:{
      color:Colors.green,
      alignItems:'center'
  }
})
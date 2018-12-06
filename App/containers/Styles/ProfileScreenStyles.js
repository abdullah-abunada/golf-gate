import { StyleSheet } from 'react-native'
import { ApplicationStyles,Colors,Metrics } from '../../Themes'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  nameContainer:{
    justifyContent:'center',
    alignItems:'center',
    margin:15,
    padding:10
  },
  iContainer:{
    flexDirection:'row',
    backgroundColor:Colors.grey,
    justifyContent:'flex-end',
    alignItems:'center',
    margin:5,
    padding:10
  },
  fab:{
position:'absolute',
right:15,
bottom:-20
  },
})
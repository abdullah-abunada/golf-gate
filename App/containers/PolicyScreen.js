import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import {Icon,Thumbnail} from 'native-base'
//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import { Colors,Fonts,Strings,Images} from '../Themes'


class PolicyScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.PolicyScreen,
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  render () {
    return (
      <View style={{flex:1}}>
       <View style={{ flex:1 , justifyContent: 'center',alignItems:'center' }}>
            <Thumbnail square style={{width:200, height:75}} source={Images.logo} />
          </View>
        <ScrollView  style={{flex:3,padding:15}}>
          <Text style={{...Fonts.style.description}}>{Strings.ar.policy}</Text>
      </ScrollView>
      </View>
    )
  }
}

export default PolicyScreen
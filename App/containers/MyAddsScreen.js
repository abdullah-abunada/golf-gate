import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import {Icon} from 'native-base'
//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

import { Colors } from '../Themes'
// Styles
import styles from './Styles/MyAddsScreenStyles'

class MyAddsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.myAds,
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>MyAddsScreen</Text>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(MyAddsScreen)
export default MyAddsScreen
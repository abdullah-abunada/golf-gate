import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView,Button } from 'react-native'
import Navigator from '../Navigation/Navigator'
//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {

  navigate = ()=> {
    Navigator.navigate("App")
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>RegisterScreen</Text>
          <Button title="wass" onPress={this.navigate}/>
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

//export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
export default RegisterScreen
import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView ,AsyncStorage} from 'react-native'
import { Button } from 'react-native-elements'

import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import styles from './Styles/HomeScreenStyle'

class HomeScreen extends Component {


  async componentWillMount(){

      const user = await AsyncStorage.getItem('user')
      if(!user) {
        console.log('doenst exist')
        this.props.navigation.navigate('LoginScreen')
      }
      else{
        console.log('exist');
        console.log(user);
        this.props.setUser(JSON.parse(user))
      }
  }
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>{this.props.user.name}</Text>
          <Button
            large
            rightIcon={{ name: 'code' }}
            title='LARGE WITH RIGHT ICON'
            onPress={()=>this.props.logout()} />
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user : state.auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      setUser: ( value) => dispatch(AuthActions.setUser(value)),
      logout: ( ) => dispatch(AuthActions.logout()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
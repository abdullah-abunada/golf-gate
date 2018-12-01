
import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Button, Icon, Text, Form, Item, Input, Label,Thumbnail} from 'native-base';

import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import { Colors, Strings, Metrics,Images } from '../Themes'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render() {
    return (

      <View style={styles.container}>
        

          <View style={{ flex: 1, backgroundColor: '#987946' }}>
          <Text style={{color:Colors.grey}} >{this.props.authToken}</Text>
          <Text style={{color:Colors.grey}} >{this.props.error}</Text>
          </View>



          <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
            <Thumbnail square large source={Images.logo} />
          </View>


          <View style={{ flex: 2, justifyContent: 'space-around' }}>

            <Item regular>
              <Input placeholder={Strings.ar.email} textBox
              onChangeText={(value) => { this.props.handleInput('email', value) }}
              value={this.props.email} />
              <Icon name='swap' />
            </Item>
            <Item regular>
              <Input placeholder={Strings.ar.password} textBox
              onChangeText={(value) => { this.props.handleInput('password', value) }}
              value={this.props.password} />
              <Icon name='swap' />
            </Item>


            <Button small  transparent full onPress={() => this.props.navigation.navigate("RegisterScreen")}>
              <Text style={{color:Colors.grey}} >{Strings.ar.forgetPassword}</Text>
            </Button>
          
            <Button  full color={Colors.black} onPress={()=> this.props.attemptLogin(this.props.email, this.props.password)}>
              <Text style={{color:Colors.white}}>{Strings.ar.login}</Text>
              <Icon name='home' />
            </Button>

           
            <Button full transparent>
              <Text style={{color:Colors.dark}}>{Strings.ar.signup}</Text>
              <Icon name='home' color={Colors.dark} />
            </Button>
           
          </View>

        </View>


    )
  }
}

const mapStateToProps = (state) => {
  return {
      email: state.auth.email,
      password: state.auth.password,
      fetching: state.auth.fetching,
      error: state.auth.error,
      authToken: state.auth.user.token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      attemptLogin: (email, password) => dispatch(AuthActions.loginRequest(email, password)),
      handleInput: (prop, value) => dispatch(AuthActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
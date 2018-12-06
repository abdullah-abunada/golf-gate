import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Icon, Input, Item } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'

import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import { Metrics, Strings, Colors } from '../Themes'
// Styles
import styles from './Styles/RegisterScreenStyles'

class RegisterScreen extends Component {

  static navigationOptions= {
    headerMode: 'screen',
    title:'register'
}

  render() {
    return (

      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        <View style={{ height: Metrics.screenHeight }}>
          <View style={{ flex: 2, justifyContent: 'space-around' }}>
            
          <Item regular>
              <Input placeholder={Strings.ar.name} textBox
              onChangeText={(value) => { this.props.handleInput('name', value) }}
              value={this.props.name} />
              <Icon name='swap' />
            </Item>

            <Item regular>
              <Input placeholder={Strings.ar.mobile} textBox
              onChangeText={(value) => { this.props.handleInput('mobile', value) }}
              value={this.props.mobile} />
              <Icon name='swap' />
            </Item>

            <Item regular>
              <Input placeholder={Strings.ar.address} textBox
              onChangeText={(value) => { this.props.handleInput('address', value) }}
              value={this.props.address} />
              <Icon name='swap' />
            </Item>

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

            <Item regular>
              <Input placeholder={Strings.ar.verify_password} textBox
              onChangeText={(value) => { this.props.handleInput('verify_password', value) }}
              value={this.props.verify_password} />
              <Icon name='swap' />
            </Item>
            
          </View>
          <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
            <Button
              title={'wass'}
              onPress={()=> this.props.attemptRegister(this.props.name, this.props.mobile, this.props.address, this.props.email, this.props.password)}
              buttonStyle={{backgroundColor:Colors.black}} />
          </View>
        </View>
      </KeyboardAwareScrollView>

    )
  }
}

const mapStateToProps = (state) => {
  return {
      email: state.auth.email,
      password: state.auth.password,
      verify_password: state.auth.verify_password,
      name: state.auth.name,
      mobile: state.auth.mobile,
      address: state.auth.address,
      fetching: state.auth.fetching,
      error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      attemptRegister: (name,mobile,address,email, password) => dispatch(AuthActions.registerRequest(name,mobile,address,email, password)),
      handleInput: (prop, value) => dispatch(AuthActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
//export default RegisterScreen
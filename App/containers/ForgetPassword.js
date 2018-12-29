import React, { Component } from 'react'
import { View, Image } from 'react-native'

import { Icon, Input, Item, Text, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BarIndicator } from 'react-native-indicators'
import ConfirmedModal from '../components/confirmedModal'
import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import { Metrics, Strings, Colors, Fonts } from '../Themes'


// Styles
import styles from './Styles/AddAdScreenStyles'

class ForgetPassword extends Component {

  static navigationOptions = {
    title: Strings.ar.forgetPassword
  }

  _toggleModal = () => {
    this.props.handleInput("isModalVisible",!this.props.isModalVisible);
    this.props.navigation.navigate('LoginScreen')
  }


  step1 = () => {
    console.warn('renserStep1')
    return (
      <View style={{ flex: .5, justifyContent: 'space-around' }}>
        <Text style={{ ...Fonts.style.h5, margin: 10, alignSelf: 'center' }}>
        ادخل ايمايلك
        </Text>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.email} textBox
            onChangeText={(value) => { this.props.handleInput('email', value) }}
            value={this.props.email} />
        </Item>
        <Button full dark onPress={this.handle1}>
          <Text style={{ ...Fonts.style.h5,color:Colors.white}}>{Strings.ar.send}</Text>
        </Button>
      </View>
    )
  }
  handle1 = () => {  
    console.warn('h1')
    const { email} = this.props
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email != '') {
      if (emailReg.test(email)) {
            this.props.checkMail(email)
      } else this.props.handleInput('error',Strings.ar.errorInEmailForm)
    } else this.props.handleInput('error', Strings.ar.error.fillAll)
  }

  step2 = () => {
    console.warn('2')
    return (
      <View style={{ flex: .5, justifyContent: 'space-around' }}>
      <Text style={{ ...Fonts.style.h5, margin: 10, alignSelf: 'center' }}>
        ادخل الكود الدي ارسلناه لك على الايمايل
        </Text>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.code} textBox keyboardType='numeric'
            onChangeText={(value) => { this.props.handleInput('code', value) }}
            value={this.props.code} />
        </Item>
        <Button full dark onPress={this.handle2}>
          <Text style={{ ...Fonts.style.h5,color:Colors.white }}>{Strings.ar.send}</Text>
        </Button>
      </View>
    )
  }

  handle2 = () => {  
    console.warn('h2')
    const { code} = this.props
    if (code != '') {
            this.props.checkCode(code)
    } else this.props.handleInput('error', Strings.ar.error.fillAll)
  }

  step3 = () => {
    console.warn('3')
    return (
      <View style={{ flex: .5, justifyContent: 'space-around' }}>
      <Text style={{ ...Fonts.style.h5, margin: 10, alignSelf: 'center' }}>
        ادخل كلمة المرور الجديدة
        </Text>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.password} textBox
            onChangeText={(value) => { this.props.handleInput('password', value) }}
            value={this.props.password} />
        </Item>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.confirmPassword} textBox
            onChangeText={(value) => { this.props.handleInput('verify_password', value) }}
            value={this.props.verify_password} />
        </Item>
        <Button full dark onPress={this.handle3}>
          <Text style={{ ...Fonts.style.h5 ,color:Colors.white}}>{Strings.ar.send}</Text>
        </Button>
      </View>
    )
  }

  handle3 = () => {
    console.warn('h3')
    const {  password, verify_password,email} = this.props
        if(password.length>4){
          if (password === verify_password) {
            this.props.newPassword( email, password,verify_password)
          } else this.props.handleInput('error', Strings.ar.errorMatchPassword)
        }else  this.props.handleInput('error', Strings.ar.error.tooShort)
  }

  renderContent = () => {
    const {step} = this.props
    console.warn(step)
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5} />;
    }
    return (
      <View style={{ height: Metrics.screenHeight - 80}}>
       {this.props.isModalVisible && <ConfirmedModal message={'تم تغيير كلمة المرور بنجاح'} partnership onConfirm={this._toggleModal}/>}
        <Text style={{ ...Fonts.style.description, margin: 10, color: 'red', alignSelf: 'center' }}>{this.props.error}</Text>
        
          {step===1 && this.step1()}
          {step===2 && this.step2()}
          {step===3 && this.step3()}
        
      </View>
    )
  }
  render() {
    return (
      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        {this.renderContent()}
      </KeyboardAwareScrollView>

    )
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    verify_password: state.auth.verify_password,
    code: state.auth.code,
    fetching: state.auth.fetching,
    error: state.auth.error,
    step:state.auth.step,
    isModalVisible:state.auth.isModalVisible
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleInput: (prop, value) => dispatch(AuthActions.handleInput(prop, value)),
    checkMail: ( value) => dispatch(AuthActions.checkMail( value)),
    checkCode: ( value) => dispatch(AuthActions.checkCode( value)),
    newPassword: ( email,password,confirm_password) => dispatch(AuthActions.newPassword( email,password,confirm_password)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgetPassword)

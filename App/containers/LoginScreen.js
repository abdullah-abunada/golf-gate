
import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Container, Content, Button, Icon, Text, Form, Item, Input, Label, Thumbnail } from 'native-base';
import AdsActions from '../Redux/AdRedux'
import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";
import { BarIndicator } from 'react-native-indicators'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Fonts, Strings, Images, Colors, Metrics } from '../Themes'
// Styles
import styles from './Styles/AddAdScreenStyles'

class LoginScreen extends Component {

  static navigationOptions = {
    header: null
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5} />;
    }
    return (
      <View style={{ flex: 2, justifyContent: 'space-around' }}>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.email} textBox
            onChangeText={(value) => { this.props.handleInput('email', value) }}
            value={this.props.email} />
        </Item>
        <Item regular style={styles.inputContainer} >
          <Input placeholder={Strings.ar.password} textBox
            secureTextEntry
            onChangeText={(value) => { this.props.handleInput('password', value) }}
            value={this.props.password} />
        </Item>

        <Text style={{ ...Fonts.style.description, margin: 10, color: 'red', alignSelf: 'center' }}>{this.props.error}</Text>


        <Button full transparent dark small onPress={() => this.props.navigation.navigate("ForgetPassword")}>
          <Text style={{ ...Fonts.style.description, color: 'black' }}>{Strings.ar.forgetPassword}</Text>
        </Button>

        <Button full dark onPress={this.handleLogin}>
          <Text style={{ ...Fonts.style.h5,color:Colors.white}}>{Strings.ar.login}</Text>
        </Button>


        <Button full transparent dark onPress={() => this.props.navigation.navigate("RegisterScreen")}>
          <Text style={{ ...Fonts.style.h5, color: 'black' }}>{Strings.ar.signup}</Text>
        </Button>
      </View>
    )
  }

  handleLogin = () => {
    const { email, password } = this.props
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email != '' && password != '') {
      if (emailReg.test(email)) {
        this.props.attemptLogin(this.props.email, this.props.password)
      } else this.props.handleInput('error', Strings.ar.errorInEmailForm)
    } else this.props.handleInput('error', Strings.ar.error.fillAll)
  }

  componentWillMount() {
    this.props.adminAdsRequest(false)
  }

  render() {
    return (

      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        <View style={{ height: Metrics.screenHeight, paddingBottom: 40 }}>
          <View style={{ flex: 1.5, marginTop: 18 }} >
            {this.props.admin_ads && <Image style={{ flex: 1, width: null }}
              source={{ uri: this.props.admin_ads[Math.floor(Math.random() * this.props.admin_ads.length)].ads_image }} />
            }
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Thumbnail style={{ width: 200, height: 75 }} source={Images.logo} />
          </View>
          {this.renderContent()}
        </View>
      </KeyboardAwareScrollView>


 
    )
  }
}

const mapStateToProps = ({ auth, ads }) => {
  return {
    email: auth.email,
    password: auth.password,
    fetching: auth.fetching,
    error: auth.error,
    authToken: auth.user.token,
    admin_ads: ads.admin_ads,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (email, password) => dispatch(AuthActions.loginRequest(email, password)),
    handleInput: (prop, value) => dispatch(AuthActions.handleInput(prop, value)),
    adminAdsRequest: (navigate) => dispatch(AdsActions.adminAdsRequest(navigate))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
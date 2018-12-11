import React, { Component } from 'react'
import { View, Image } from 'react-native'

import { Icon, Input, Item, Text, Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { ImagePicker, Permissions } from 'expo';
import { BarIndicator } from 'react-native-indicators'

import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import { Metrics, Strings, Colors, Fonts } from '../Themes'


// Styles
import styles from './Styles/AddAdScreenStyles'

class RegisterScreen extends Component {

  static navigationOptions = {
    title: Strings.ar.signup
  }

  state={
    image : null
  }
  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5} />;
    }
    return (
      <View style={{ height: Metrics.screenHeight - 80 }}>
        <View style={{ flex: 2, justifyContent: 'space-around' }}>
          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.name} textBox
              onChangeText={(value) => { this.props.handleInput('name', value) }}
              value={this.props.name} />
          </Item>

          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.mobile} textBox
              keyboardType="numeric"
              onChangeText={(value) => { this.props.handleInput('mobile', value) }}
              value={this.props.mobile} />
          </Item>

          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.address} textBox
              onChangeText={(value) => { this.props.handleInput('address', value) }}
              value={this.props.address} />
          </Item>

          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.email} textBox
              onChangeText={(value) => { this.props.handleInput('email', value) }}
              value={this.props.email} />
          </Item>

          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.password} textBox
              onChangeText={(value) => { this.props.handleInput('password', value) }}
              value={this.props.password} />
          </Item> 

          <Item regular style={styles.inputContainer} >
            <Input placeholder={Strings.ar.verify_password} textBox
              onChangeText={(value) => { this.props.handleInput('verify_password', value) }}
              value={this.props.verify_password} />
          </Item>

          <Button full dark transparent onPress={this._pickImage}>
            <Text style={{ ...Fonts.style.h5, color: 'black' }}>{Strings.ar.uploadImage}</Text>
            <Icon name='camera' style={{ color: Colors.black }} />
          </Button>
              <Text style={{ ...Fonts.style.description,margin:10, color: 'red', alignSelf: 'center' }}>{this.props.error}</Text>
              {this.state.image
           &&<Image
              source={{uri: this.state.image}}
              style={{ width: 50, height: 50 ,alignSelf:'center'}}
            />
            }
        </View>
        <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
          <Button full dark onPress={this.validate}>
            <Text style={{ ...Fonts.style.h5 }}>{Strings.ar.signup}</Text>
          </Button>
        </View>
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

  validate = () => {
    
    const { email, password, verify_password, name, mobile, address } = this.props
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (email != '' && password != '' && verify_password != '' && name != '' && mobile != '' && address != '') {
      if (emailReg.test(email)) {
        if(password.length>4){
          if (password === verify_password) {
            this.props.attemptRegister(name, mobile, address, email, password,this.state.image)
          } else this.props.handleInput('error', Strings.ar.errorMatchPassword)
        }else  this.props.handleInput('error', Strings.ar.error.tooShort)
      } else this.props.handleInput('error',Strings.ar.errorInEmailForm)
    } else this.props.handleInput('error', Strings.ar.error.fillAll)
  }

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true,
                                                                    allowsEditing: false,
                                                                    aspect: [4, 3]});
      if (!pickerResult.cancelled) {
        let imageUri = pickerResult ? `data:image/png;base64,${pickerResult.base64}` : null;
        this.setState({image:imageUri}) 
      }
    }
  };
}

 

const mapStateToProps = (state) => {
  return {
    email: state.auth.email,
    image: state.auth.image,
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
    attemptRegister: (name, mobile, address, email, password, image) => dispatch(AuthActions.registerRequest(name, mobile, address, email, password, image)),
    handleInput: (prop, value) => dispatch(AuthActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
//export default RegisterScreen
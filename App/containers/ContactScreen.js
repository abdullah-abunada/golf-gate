import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { Icon, Input, Item, Text,Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BarIndicator } from 'react-native-indicators'

import ContactActions from '../Redux/ContactRedux'
import { connect } from "react-redux";


import { Fonts,Strings, Colors } from '../Themes'

// Styles
import styles from './Styles/AddAdScreenStyles'
import AdsCard from '../components/AdsCard';

class ContactScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.contactUs,
      headerRight: (<Icon name='menu' style={{ color: Colors.white }} onPress={() => navigation.openDrawer()} />)
    };
  };


  handleSend =()=>{
    const {subject,message} = this.props
    if(subject!=''&& message!='')
    this.props.contactRequest(subject, message,this.props.user_id)
    else {
      this.props.handleInput('error',Strings.ar.errorLoginMessage)
    }
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5} />;
    }
    return (
      <View style={{ flex: 1 }}>
      <View style={{ flex: 4 }}>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.subject}</Text>
        <Item regular  style={styles.inputContainer} >
          <Input placeholder={Strings.ar.subject} textBox
            onChangeText={(value) => { this.props.handleInput('subject', value) }}
            value={this.props.subject} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.message}</Text>
        <Item regular  style={styles.inputContainer} >
          <Input placeholder={Strings.ar.message} textBox
            style={{ height: 250 }}
            onChangeText={(value) => { this.props.handleInput('message', value) }}
            value={this.props.message}
            multiline />
        </Item>
        <Text style={{...Fonts.style.description,color:'red',alignSelf:'center'}}>{this.props.error}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button full dark onPress={this.handleSend}>
          <Text style={{ ...Fonts.style.h5,color:'white' }}>{Strings.ar.send}</Text>
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
}

const mapStateToProps = ({ contact ,auth}) => {
  const { message, subject, fetching,error } = contact
  return {
    subject, message, fetching,error,user_id:auth.user.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contactRequest: (subject, message,user_id) => dispatch(ContactActions.contactRequest(subject, message,user_id)),
    handleInput: (prop, value) => dispatch(ContactActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen)

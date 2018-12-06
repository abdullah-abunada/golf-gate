import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { Icon, Input, Item,Text} from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-elements'
import {BarIndicator} from 'react-native-indicators'

import ContactActions from '../Redux/ContactRedux'
import { connect } from "react-redux";


import { Metrics, Strings, Colors } from '../Themes'

// Styles
import styles from './Styles/ContactScreenStyles'

class ContactScreen extends Component {

    static navigationOptions = {
      title: Strings.ar.contactUs,
    };


    renderContent = () => {
      if (this.props.fetching) {
        return <BarIndicator color={Colors.grey} count={5}/>;
      }
      return (
        <Button
        large
        onPress={()=>this.props.contactRequest(this.props.subject,this.props.message)} />
      )
    }
  render() {
    return (

      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        <View style={{ height: Metrics.screenHeight }}>
          <View style={{ flex: 4 }}>
          <Text>{Strings.ar.subject}</Text>
            <Item regular>
              <Input placeholder={Strings.ar.subject} textBox
                onChangeText={(value) => { this.props.handleInput('subject', value) }}
                value={this.props.subject} />
              <Icon name='swap' />
            </Item>
            <Text>{Strings.ar.message}</Text>
            <Item regular>
              <Input placeholder={Strings.ar.message} textBox
                style={{height:300}}
                onChangeText={(value) => { this.props.handleInput('message', value) }}
                value={this.props.message}
                multiline />
              <Icon name='swap' />
            </Item>

          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {this.renderContent()}
          </View>
        </View>
      </KeyboardAwareScrollView>

    )
  }
}

const mapStateToProps = ({contact}) => {
  const {message,subject,fetching} = contact
  return {
    subject,message,fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    contactRequest: (subject, message) => dispatch(ContactActions.contactRequest(subject, message)),
    handleInput: (prop, value) => dispatch(ContactActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactScreen)

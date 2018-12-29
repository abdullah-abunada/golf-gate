import React, { Component } from 'react'
import { View } from 'react-native'
import ModalBox from "react-native-modalbox"
import { Text, Button } from 'native-base'

import { Fonts, Strings, Colors } from '../Themes'



export default class ConfirmedModal extends Component {


  renderPayment() {
    if (this.props.price.price != "") return (
      <Text style={{ ...Fonts.style.h5, alignSelf: 'center', color: Colors.dark, textAlign: 'center' }}>
        نرجو تحويل مبلغ {this.props.price.price} ريال
          </Text>)
  }
  renderText() {
    if (this.props.partnership) return (
      <Text style={{ ...Fonts.style.h5, alignSelf: 'center', color: Colors.dark, textAlign: 'center',marginBottom:80 }}>
        {this.props.message}
      </Text>)

    return (
      <Text style={{ ...Fonts.style.h5, alignSelf: 'center', color: Colors.dark, marginBottom: 80, textAlign: 'center' }}>
        {Strings.ar.partnershipRequest}
        {'\n'}{'\n'}
        {this.renderPayment()}
        {'\n'}{'\n'}
        {this.props.price.message}
      </Text>

    )
  }


  render() {
    return (
      <ModalBox style={{ flex: 1}}
        isOpen={true}
        position="center"
        backdrop={false}
        coverScreen={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          {this.renderText()}
          <Button full success onPress={this.props.onConfirm}>
            <Text style={{ ...Fonts.style.h5, color: Colors.white }}>موافق</Text>
          </Button>
        </View>
      </ModalBox>

    )
  }
}



import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ModalBox from "react-native-modalbox"


import { Fonts, Strings, Colors } from '../Themes'



export default class ConfirmedModal extends Component {


  render() {
    return (
      <ModalBox style={{ flex: 1, maring: 150, padding: 20 }}
        isOpen={true}
        position="center"
        backdrop={false}
        coverScreen={true}>
        <View style={{ flex: 1 }}>
          <Text style={{ ...Fonts.style.h5, alignSelf: 'center', color: Colors.dark, marginBottom: 20 }}>
            {Strings.ar.errorInEmailForm}
          </Text>
          <Button full  success onPress={this.props.onConfirm}>
            <Text style={{ ...Fonts.style.h5, color: Colors.black }}>موافق</Text>
          </Button>
        </View>
      </ModalBox>

    )
  }
}



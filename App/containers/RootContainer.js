import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigation from '../Navigation/AppNavigation'
import Navigator from '../Navigation/Navigator'


// Styles


export default class RootContainer extends Component {

  render() {
    return (
        <View style={{flex:1}}>
          <StatusBar barStyle='light-content' />
          <AppNavigation ref={navigatorRef => Navigator.setNavigator(navigatorRef)} />
        </View>
    )
  }
}


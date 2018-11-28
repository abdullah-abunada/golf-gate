import React, { Component } from 'react'
import { StatusBar, View } from 'react-native'
import AppNavigation from '../Navigation/AppNavigation'
import Navigator from '../Navigation/Navigator'


// Styles
import styles from './Styles/RootContainerStyles'



export default class RootContainer extends Component {

  render() {
    return (
        <View style={styles.applicationView}>
          <StatusBar barStyle='dark-content' />
          <AppNavigation ref={navigatorRef => Navigator.setNavigator(navigatorRef)} />
        </View>
    )
  }
}


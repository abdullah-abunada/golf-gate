import React, { Component } from 'react'
import { ScrollView, Image, BackHandler ,Button} from 'react-native'
import styles from './Styles/DrawerContentStyles'
import { Images } from '../Themes'
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import LoginActions from '../Redux/LoginRedux'


export default class DrawerContent extends Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', () => {
      NavigationActions.drawerClose()
    })
  }

  handlePressLogin = () => {
    NavigationActions.drawerClose()
    NavigationActions.login()
  }


  render () {
    return (
      <ScrollView style={styles.container}>
        <Image source={Images.logoJhipster} style={styles.logo} />
        <Button title='Login' onPress={this.handlePressLogin} />
      </ScrollView>
    )
  }
}





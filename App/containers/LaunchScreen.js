import React from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import navBar from '../Navigation/NavItems'
import { Images } from '../Themes'
import {LinearGradient} from 'expo'
// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends React.Component {
  render () {
    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>
            <Image source={Images.logoJhipster} style={styles.logo} />
            {navBar.hamburgerButton}
            {navBar.backButton}
          </View>

          <View style={styles.section} >
            <Image source={Images.ready} />
            <LinearGradient location={{start:[1,0],end:[0.2,0]}} colors={['#FF9800','#F44336']}>
            <Text style={styles.sectionText}>
              {"This is where you'll see a live preview of your fully functioning app using Ignite."}
            </Text>
            </LinearGradient>
          </View>

        </ScrollView>
      </View>
    )
  }
}

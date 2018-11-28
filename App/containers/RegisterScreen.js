import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { Icon, Input, Item } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Metrics, Strings, Colors } from '../Themes'
import { Button } from 'react-native-elements'

//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/RegisterScreenStyle'

class RegisterScreen extends Component {


  render() {
    return (

      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        <View style={{ height: Metrics.screenHeight }}>
          <View style={{ flex: 2, justifyContent: 'space-around' }}>
            <Item regular>
              <Input placeholder={Strings.ar.email} textBox />
              <Icon name='swap' />
            </Item>
            <Item regular>
              <Input placeholder={Strings.ar.email} textBox />
              <Icon name='swap' />
            </Item>
            <Item regular>
              <Input placeholder={Strings.ar.email} textBox />
              <Icon name='swap' />
            </Item>
            <Item regular>
              <Input placeholder={Strings.ar.email} textBox />
              <Icon name='swap' />
            </Item>
          </View>
          <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
            <Button
              title='BUTTON'
              large
              buttonStyle={{backgroundColor:Colors.black}} />
          </View>
        </View>
      </KeyboardAwareScrollView>

    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
export default RegisterScreen
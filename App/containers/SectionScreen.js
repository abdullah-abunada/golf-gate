import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SectionScreenStyle'

class SectionScreen extends Component {
  render () {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>SectionScreen</Text>
          <Button
            large
            rightIcon={{ name: 'code' }}
            title='LARGE WITH RIGHT ICON'
            onPress={()=>this.props.navigation.navigate("AdsDetailsScreen")} />
        </KeyboardAvoidingView>
      </ScrollView>
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

//export default connect(mapStateToProps, mapDispatchToProps)(SectionScreen)
export default SectionScreen
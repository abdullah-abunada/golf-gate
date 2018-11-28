import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <KeyboardAvoidingView behavior='position'>
          <Text>MainScreen</Text>
          <Button
            large
            rightIcon={{ name: 'code' }}
            title='LARGE WITH RIGHT ICON'
            onPress={()=>this.props.navigation.navigate("HomeScreen")} />
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

//export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
export default MainScreen
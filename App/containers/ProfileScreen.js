import React, { Component } from 'react'
import { View, Image } from 'react-native'
import { Text, Icon,Button} from 'native-base'
import {  } from 'react-native-elements'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors } from '../Themes'
// Styles
import styles from './Styles/ProfileScreenStyles'

class ProfileScreen extends Component {

  renderForm = () => {
    return (
      <View style={{ flex: 2, justifyContent: 'center' }}>
        <View style={styles.nameContainer}>
          <Text>{this.props.user.name}</Text>

        </View>
        <View style={styles.iContainer}>
          <Text>{this.props.user.address}</Text>
          <Icon name='swap' />
        </View>
        <View style={styles.iContainer}>
          <Text>{this.props.user.mobile}</Text>
          <Icon name='swap' />
        </View>
        <View style={styles.iContainer}>
          <Text>{this.props.user.email}</Text>
          <Icon name='swap' />
        </View>
      </View>
    )
  }


  render() {
    return (
      <View style={{flex:1}}>
        <View style={{ flex: 2,backgroundColor:Colors.green}}>
          <Image style={{ flex: 1, width: null,height:500 }}
            source={{ uri: this.props.user.image }} />
        </View>
        {this.renderForm()}
        <View style={{ flex: 1 }}>
        
        </View>

      </View>

    )
  }
}

const mapStateToProps = ({auth}) => {
  return {
    user:auth.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
//export default ProfileScreen
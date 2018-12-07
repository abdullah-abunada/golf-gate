import React, { Component } from 'react'
import { View, Text, Image, AsyncStorage ,FlatList} from 'react-native'
import { Button } from 'react-native-elements'
import {Icon} from 'native-base'

import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";


import styles from './Styles/HomeScreenStyles'
import {Metrics,Colors,Strings} from '../Themes'

class HomeScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.HomeScreen,
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  async componentWillMount() {
    const user = await AsyncStorage.getItem('user')
    if (!user) {
      this.props.navigation.navigate('LoginScreen')
    }
    else {
      this.props.setUser(JSON.parse(user))
    }
  }

  state = {
    dataObjects: [
      {  uri:'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&h=350' },
      {  uri: 'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&h=350' }
    ]
  }


  renderRow({ item }) {
    return (
      <View style={{height:Metrics.screenHeight / 2 , margin : Metrics.baseMargin , backgroundColor : Colors.grey}}>
      <Image  style={{flex: 1,width:null,height:50}}
              source={{ uri: item.uri }}/>
      </View>
    )
  }




  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index


  oneScreensWorth = 20



  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.state.dataObjects}
          renderItem={this.renderRow}
          numColumns={1}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
        />
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (value) => dispatch(AuthActions.setUser(value))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
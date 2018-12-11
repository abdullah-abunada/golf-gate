import React, { Component } from 'react'
import { View, Text, Image, AsyncStorage ,FlatList} from 'react-native'
import { Button } from 'react-native-elements'
import {Icon} from 'native-base'
import {BarIndicator} from 'react-native-indicators'

import AuthActions from '../Redux/AuthRedux'
import AdsActions from '../Redux/AdRedux'
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
      !this.props.admin_ads && this.props.adminAdsRequest()
    }
  }




  renderRow({ item }) {
    return (
      <View key={item.id} style={{height:Metrics.screenHeight / 3 , margin : Metrics.baseMargin , backgroundColor : Colors.grey}}>
      <Image  style={{flex: 1,width:null,height:50}}
              source={{ uri: item.ads_image }}/>
      </View>
    )
  }


  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5}/>;
    }
    return (
      <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.admin_ads}
          renderItem={this.renderRow}
          numColumns={1}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
        />
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
        {this.renderContent()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    admin_ads:state.ads.admin_ads,
    fetching: state.ads.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (value) => dispatch(AuthActions.setUser(value)),
    adminAdsRequest: () => dispatch(AdsActions.adminAdsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
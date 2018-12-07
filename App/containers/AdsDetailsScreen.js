import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { Button } from 'react-native-elements'
import {Icon} from 'native-base'
import AdsCard from '../components/AdsCard'

import AdsAction from '../Redux/AdRedux'
import { connect } from "react-redux";

import { Colors } from '../Themes'

import styles from './Styles/AdsDetailsScreenStyles'

class AdsDetailsScreen extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('sub_cat'),
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };
  
  componentWillMount() {
    // this.props.adsRequest()
    }
  
    renderRow({ item }) {
      return (
        <AdsCard key={item.id}
        key={item.id} 
        title={item.title} 
        price={item.price} 
        description={item.description}
        image={item.image}/>
      )
    }
  
  
  
  
    // The default function if no Key is provided is index
    // an identifiable key is important if you plan on
    // item reordering.  Otherwise index is fine
    keyExtractor = (item, index) => index
  
  
    oneScreensWorth = 20
  
  
    renderContent = () => {
      if (true)
        return (
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.props.ads}
            renderItem={this.renderRow}
            numColumns={1}
            keyExtractor={this.keyExtractor}
            initialNumToRender={this.oneScreensWorth}
          />
        )
    }
    render() {
      return (
        <View style={styles.container}>
         <Button
          large
          rightIcon={{ name: 'code' }}
          title='LARGE WITH RIGHT ICON'
          onPress={() => this.props.navigation.navigate("AdsDetailsScreen")} />
          {this.renderContent()}
        </View>
      )
    }


}

const mapStateToProps = ({ ads }) => {
  return {
   ads: ads.ads,
   fetching: ads.fetching,
   error : ads.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adsRequest: () => dispatch(AdsAction.adsRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsDetailsScreen)
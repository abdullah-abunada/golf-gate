import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, Image, ScrollView,I18nManager} from 'react-native'
import { Card, Text, Button, Icon } from 'native-base';
import { Linking } from 'react-native';

import ReportModal from '../components/reportModal'
import { Metrics, Strings, Fonts, Colors } from '../Themes'
import styles from './Styles/AdsCardStyle'

export default class AdsCard extends Component {


  state = {
    isModalVisible: false,
    reportedAd:null
  }

_toggleModal = () => {
  this.setState({ isModalVisible: !this.state.isModalVisible });
}
 
componentWillMount(){
  this.setState({isModalVisible:false})
}

  render() {
    return (

      <Card style={{ height: Metrics.screenHeight / 3, padding: 5 }}>
       {this.state.isModalVisible && <ReportModal  ad={this.props.id} onConfirm={this._toggleModal}/>}
        <View style={{ flex: 2, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>


          <View style={{ flex: 3, flexDirection: 'column', marginRight: 5 }}>
            <View style={{ flex: .5 }}>
              <Text style={{ ...Fonts.style.h6, color: Colors.black }}>{this.props.title}</Text>
            </View>

            <ScrollView style={{ flex: 2 }}>
              <Text style={{ ...Fonts.style.description, color: Colors.black }}>{this.props.description}</Text>
            </ScrollView>
          </View>


          <View style={{ flex: 1 }}>
            <Image style={{ flex: 1, width: null }}
              source={{ uri: this.props.image }} />
          </View>


        </View>

        <View style={{ flex: 1, margin: 5 }}>
          <View style={{ flex: 1, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',alignItems:'center'}}>
            <View style={{ flex: 3, justifyContent: 'flex-end' }}>
              <Text style={{ ...Fonts.style.description, color: Colors.black, alignSelf: 'flex-end' }}>{this.props.address}</Text>
            </View>
            <View style={{ flex: 1 , justifyContent: 'flex-end' }}>
              <Text style={{ ...Fonts.style.description, color: Colors.green }}>{Strings.ar.address}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',alignItems:'center' }}>
            <View style={{ flex: 3, justifyContent: 'flex-end' }}>
              <Text style={{ ...Fonts.style.description, color: Colors.black, alignSelf: 'flex-end' }}>{this.props.price}</Text>
            </View>
            <View style={{ flex: 1 , justifyContent: 'flex-end' }}>
              <Text style={{ ...Fonts.style.description, color: Colors.green }}>{Strings.ar.price}</Text>
            </View>
          </View>
        </View>

        <View style={{ flex: .5, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
          <View style={{ flex: 1, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', alignItems: 'flex-end', justifyContent: 'flex-start', marginRight: 10 }}>
            {this.props.edit && <Button small transparent onPress={this._toggleModal} >
              <Icon active name="alert" style={{ color: Colors.black }} />
            </Button>}
            <Button small transparent onPress={() => Linking.openURL(`whatsapp://send?&phone=${this.props.whatsapp}`)} >
              <Icon active type='MaterialCommunityIcons' name="whatsapp" style={{ color: Colors.green }} />
            </Button>
          </View>
          <View style={{ flex: 1, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Button success small onPress={() => Linking.openURL('tel://' + this.props.phone)}>
              <Icon active type='MaterialCommunityIcons' name="phone" style={{ color: Colors.white }} />
              <Text style={{ ...Fonts.style.description, color: Colors.white }}>{Strings.ar.call}</Text>
            </Button>
          </View>
        </View>
      </Card>
    )
  }
}

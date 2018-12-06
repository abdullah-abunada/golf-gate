import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View,Image } from 'react-native'
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Grid, Row, Col } from 'native-base';
import { Rating } from 'react-native-elements'

import { Metrics, Strings } from '../Themes'
import styles from './Styles/AdsCardStyle'

export default class AdsCard extends Component {
  // // Prop type warnings
  // static propTypes = {
  //   someProperty: PropTypes.object,
  //   someSetting: PropTypes.bool.isRequired,
  // }
  //
  // // Defaults for props
  // static defaultProps = {
  //   someSetting: false
  // }

  render() {
    return (

      <Card style={{ height: Metrics.screenHeigh/4,padding:10}}>
        <View style={{ flex:1.5, flexDirection: 'row' }}>


          <View style={{ flex: 3,flexDirection:'column' }}>
            <View style={{ flex: 1,flexDirection:'row'}}>
              <Rating
                imageSize={20}
                readonly
                startingValue={4}
              />
              <View style={{ flex: 3, flexDirection: 'row' }}>
                <Text>{this.props.title}</Text>
              </View>
            </View>

            <View style={{ flex: 2, flexDirection: 'row' }}>
                <Text>{this.props.description}</Text>
            </View>
          </View>


          <View style={{ flex: 1 }}>
          <Image  style={{flex: 1,width:null}}
              source={{ uri: this.props.image }}/>
          </View>


        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row'}}>
          <View style={{ flex: 3 ,justifyContent:'flex-end' }}>
              <Text>Algeria{this.props.address}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{Strings.ar.address}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 3 ,justifyContent:'flex-end' }}>
              <Text>{this.props.price}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text>{Strings.ar.price}</Text>
            </View>

          </View>
        </View>

        <View style={{ flex: 1 ,flexDirection:'row'}}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', marginRight: 10 }}>
            <Button >
            <Text>{Strings.ar.report}</Text>
            </Button>
            <Button >
              <Icon active name="chatbubbles" />
            </Button>
          </View>
          <View style={{ flex: 1,flexDirection:'row', justifyContent: 'flex-end' }}>
            <Button success>
              <Text>{Strings.ar.call}</Text>
            </Button>
          </View>
        </View>
      </Card>
    )
  }
}

import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native'
import { Card } from 'native-base'


import { Metrics,Colors,Fonts} from '../Themes'


export default class CategoriesCard extends Component {
    render() {
        return (
            <Card  style={{ height: Metrics.screenHeight / this.props.size, flex:1,backgroundColor:Colors.green,borderRadius:10}}>
                <TouchableOpacity onPress={this.props.navigate} style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
                        <Text style={{...Fonts.style.h5,color:Colors.white}}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </Card>
        )
    }
}

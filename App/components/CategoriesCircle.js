import React, { Component } from 'react'
// import PropTypes from 'prop-types';
import { View, TouchableOpacity, Text } from 'react-native'
import { Card } from 'native-base'


import { Metrics,Colors,Fonts} from '../Themes'


export default class CategoriesCircle extends Component {
    render() {
        return (
            <View  style={{backgroundColor:this.props.color,borderRadius:60,borderWidth:1,borderColor:Colors.green,alignSelf:'center',margin:30,flex:1}}>
                <TouchableOpacity onPress={this.props.navigate} style={{justifyContent: 'center', alignItems: 'center',flex:1}}>
                    <View style={{ justifyContent: 'center', alignItems: 'center',flex:1 }}>
                        <Text style={{...Fonts.style.h5,color:Colors.dark}}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

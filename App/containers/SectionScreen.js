import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { Button } from 'react-native-elements'
import {BarIndicator} from 'react-native-indicators'

import CategoriesAction from '../Redux/CategoriesRedux'
import { connect } from "react-redux";
 

// Styles
import styles from './Styles/MainScreenStyles'
import { Metrics, Strings, Colors } from '../Themes'

class SectionScreen extends Component {

  componentWillMount() {
    console.warn("mount")
      this.props.subCategoriesRequest(this.props.navigation.getParam('cat_id'))
    }
  
    renderRow({ item }) {
      return (
        <View key={item.sub_category_id} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{item.sub_category}</Text>
        </View>
      )
    }
  
  
  
  
    // The default function if no Key is provided is index
    // an identifiable key is important if you plan on
    // item reordering.  Otherwise index is fine
    keyExtractor = (item, index) => index
  
  
    oneScreensWorth = 20
  
  
    renderContent = () => {
      if (this.props.fetching) {
        return <BarIndicator color={Colors.black} count={5}/>;
      }
      return (
          <FlatList
            contentContainerStyle={styles.listContent}
            data={this.props.subCategories}
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
  
  const mapStateToProps = ({ categories }) => {
    return {
      subCategories: categories.subCategories,
      fetching: categories.fetching,
      error : categories.error
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      subCategoriesRequest: (cat_id) => dispatch(CategoriesAction.subCategoriesRequest(cat_id))
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(SectionScreen)
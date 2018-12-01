import React, { Component } from 'react'
import { View, FlatList, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'


import CategoriesAction from '../Redux/CategoriesRedux'
import { connect } from "react-redux";


// Styles
import styles from './Styles/MainScreenStyle'

class MainScreen extends Component {


  componentWillMount() {
    //  this.props.categoriesRequest()
  }

  renderRow({ item }) {
    return (
      <View key={item.id} style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text>{item.name}</Text>
      </View>
    )
  }




  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index


  oneScreensWorth = 20


  renderContent = () => {
    //if (true)
    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={this.props.categories}
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
        {this.renderContent()}
      </View>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    categories: state.categories.categories,
    fetching: state.categories.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    categoriesRequest: () => dispatch(CategoriesAction.categoriesRequest())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
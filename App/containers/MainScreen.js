import React, { Component } from 'react'
import { View, FlatList, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import {BarIndicator} from 'react-native-indicators'
import {Icon} from 'native-base'

import CategoriesAction from '../Redux/CategoriesRedux'
import { connect } from "react-redux";

 
// Styles
import { Metrics, Strings, Colors } from '../Themes'
import styles from './Styles/MainScreenStyles'

class MainScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.email,
      headerRight: (<Icon name='swap' onPress={()=>navigation.openDrawer()}/>)
    };
  };

  componentWillMount() {
   this.props.categoriesRequest()
  }

  renderRow({ item }) {
    return (
      <Button
      large
      key={item.id}
      title={item.name}
      onPress={() => this.props.navigation.navigate("SectionScreen",{cat_id:item.id})} />
    )
  }




  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index


  oneScreensWorth = 20


  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5}/>;
    }
    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={this.props.categories}
        renderItem={this.renderRow.bind(this)}
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
          onPress={() => this.props.navigation.navigate("SectionScreen")} />
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
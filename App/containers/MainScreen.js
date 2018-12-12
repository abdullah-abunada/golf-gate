import React, { Component } from 'react'
import { View, FlatList, Text, KeyboardAvoidingView } from 'react-native'
import { Button } from 'react-native-elements'
import {BarIndicator} from 'react-native-indicators'
import {Icon} from 'native-base'

import CategoriesCard from '../components/CategoriesCard'
import CategoriesAction from '../Redux/CategoriesRedux'
import { connect } from "react-redux";

 
// Styles
import {  Strings, Colors } from '../Themes'
import styles from './Styles/MainScreenStyles'

class MainScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.MainScreen,
      headerRight: (<Icon name='menu' style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  componentWillMount() {
   this.props.categoriesRequest()
  }

  renderRow({ item }) {
    return (
      <CategoriesCard size={7} text={item.name} navigate={() => 
        item.isSub ? 
        this.props.navigation.navigate("AdsDetailsScreen",{sub_cat_id:item.sub_category_id,city_id:0,sub_cat:item.sub_category})
        :this.props.navigation.navigate("SectionScreen",{cat_id:item.id,cat_name:item.name})
      }/>
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
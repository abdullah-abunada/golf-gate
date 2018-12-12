import React, { Component } from 'react'
import { View, FlatList, Image } from 'react-native'
import { Icon, Item, Picker } from 'native-base'
import { Button } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'
import CategoriesCard from '../components/CategoriesCard'
import CategoriesAction from '../Redux/CategoriesRedux'
import AdAction from '../Redux/AdRedux'
import { connect } from "react-redux";


// Styles
import styles from './Styles/AddAdScreenStyles'

import {  Strings, Colors } from '../Themes'

class SectionScreen extends Component {


  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('cat_name'),
      headerRight: (<Icon name='menu' style={{ color: Colors.white }} onPress={() => navigation.openDrawer()} />)
    };
  };
  

  componentWillMount() {
    this.props.subCategoriesRequest(this.props.navigation.getParam('cat_id'))
    this.props.citiesRequest()
  }

  renderRow({ item }) {
    return (
      <CategoriesCard size={9} key={item.sub_category_id} text={item.sub_category} 
      navigate={() => this.props.navigation.navigate("AdsDetailsScreen",
       { sub_cat_id: item.sub_category_id, city_id:this.props.selectedCity,sub_cat: item.sub_category })} />
    )
  }


  keyExtractor = (item, index) => index


  oneScreensWorth = 20

  renderCityPicker = () => {
    if (this.props.cities) return this.props.cities.map((item) => {
      return (
        <Picker.Item key={item.id} label={item.city} value={item.id} />
      )
    })
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.black} count={5} />;
    }
    return (
      <View style={{flex:3}}>
       
       <Item style={styles.inputContainer}>
          <Picker
            mode="dropdown"
            placeholder={Strings.ar.chooseCity}
            selectedValue={this.props.selectedCity}
            onValueChange={(value) => this.props.handleInput('selectedCity', value)}
            style={{ width: 120 }}>
            {this.renderCityPicker()}
          </Picker>
        </Item>
        <FlatList
          contentContainerStyle={styles.listContent}
          data={this.props.subCategories}
          renderItem={this.renderRow.bind(this)}
          numColumns={2}
          keyExtractor={this.keyExtractor}
          initialNumToRender={this.oneScreensWorth}
        />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1.5, backgroundColor: Colors.black }}>
         {this.props.admin_ads && <Image style={{ flex: 1, width: null, height: 50 }}
            source={{ uri: this.props.admin_ads[Math.floor(Math.random()*this.props.admin_ads.length)].ads_image }} />
        }
        </View>
        {this.renderContent()}
      </View>
    )
  }

}

const mapStateToProps = ({ categories,ads }) => {
  return {
    subCategories: categories.subCategories,
    admin_ads : ads.admin_ads,
    cities:categories.cities,
    fetching: categories.fetching,
    error: categories.error,
    selectedCity:ads.selectedCity
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subCategoriesRequest: (cat_id) => dispatch(CategoriesAction.subCategoriesRequest(cat_id)),
    citiesRequest: () => dispatch(CategoriesAction.citiesRequest()),
    handleInput: (prop, value) => dispatch(AdAction.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SectionScreen)
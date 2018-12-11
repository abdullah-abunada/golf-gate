import React, { Component } from 'react'
import { View, FlatList } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import { Icon, Text,Button } from 'native-base'
import AdsCard from '../components/AdsCard'


import AdsAction from '../Redux/AdRedux'
import { connect } from "react-redux";

import { Colors, Strings, Fonts } from '../Themes'

import styles from './Styles/AdsDetailsScreenStyles'

class AdsDetailsScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: navigation.getParam('sub_cat'),
      headerRight: (<Icon name='menu' style={{ color: Colors.white }} onPress={() => navigation.openDrawer()} />)
    };
  };




  componentWillMount() {
    const {navigation} = this.props
    this.props.adRequest({ sub_category:navigation.getParam('sub_cat_id'), city_id:navigation.getParam('city_id') , page:this.props.actual_page})
  }

  renderRow({ item }) {
    return (
      <AdsCard 
        key={item.id}
        id={item.id}
        title={item.title}
        price={item.price}
        description={item.des}
        address={item.address}
        image={item.image}
        phone={item.phone}
        whatsapp={item.whatsapp}/>
    )
  }


  _listEmptyComponent = () => {
     return(
    <Text style={{...Fonts.style.description,color:Colors.black,marginTop:30,textAlign:'center'}}>
        {Strings.ar.noResults}
    </Text>)
  }


  // The default function if no Key is provided is index
  // an identifiable key is important if you plan on
  // item reordering.  Otherwise index is fine
  keyExtractor = (item, index) => index


  oneScreensWorth = 20


  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.black} count={5} />;
    }
    return (
   
      <FlatList
        contentContainerStyle={{marginBottom:50}}
        data={this.props.ads}
        renderItem={this.renderRow}
        ListEmptyComponent={this._listEmptyComponent}
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
        <View style={{ height: 50, backgroundColor: Colors.grey, flexDirection: 'row',position:'absolute',bottom:0,left:0,right:0, justifyContent: 'center', alignItems: 'center' }}>
          {this.props.actual_page > 1 && <Icon type='MaterialCommunityIcons' name='chevron-left' style={{ color: Colors.dark }} onPress={this._next} />}
          <Text style={{ ...Fonts.style.description, marginHorizontal: 30 }}>{Strings.ar.page}    {this.props.actual_page} / {this.props.last_page}</Text>
          {this.props.actual_page !== this.props.last_page && <Icon type='MaterialCommunityIcons' name='chevron-right' style={{ color: Colors.dark }} onPress={this._next} />}
        
        </View>
      </View>
    )
  }


}

const mapStateToProps = ({ ads }) => {
  return {
    ads: ads.ads,
    fetching: ads.fetching,
    error: ads.error,
    actual_page:ads.actual_page,
    last_page:ads.last_page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    adRequest: (params) => dispatch(AdsAction.adRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdsDetailsScreen)
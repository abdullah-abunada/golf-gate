import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import { Icon, Text,Segment,Button } from 'native-base'
import AdsCard from '../components/AdsCard'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import AdsAction from '../Redux/AdRedux'

import { Colors,Fonts } from '../Themes'
// Styles
import styles from './Styles/MyAddsScreenStyles'

class MyAddsScreen extends Component {

  state={
    selected:0
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.myAds,
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  componentWillMount() {
    this.props.myAdsRequest(this.props.user_id)
  }

  
  _listEmptyComponent = () => {
    return(
   <Text style={{...Fonts.style.h5,color:Colors.black,marginTop:200,textAlign:'center'}}>
       {Strings.ar.noResults}
   </Text>)
 }


  renderRow({ item }) {
    return (
      <AdsCard key={item.id}
        key={item.id}
        title={item.title}
        price={item.price}
        description={item.des}
        address={item.address}
        image={item.image}
        phone={item.phone}
        whatsapp={item.whatsapp}
        date={item.created_date}
        report={()=>this.setState({reportedAd:item.id,isModalVisible:true})} />
    )
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5}/>;
    }
   // const ads = this.props.ads.filter((item)=> this.state.selected===0?item)
    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={this.props.ads}
        ListEmptyComponent={this._listEmptyComponent}
        renderItem={this.renderRow.bind(this)}
        numColumns={1}
        keyExtractor={this.keyExtractor}
        initialNumToRender={this.oneScreensWorth}
      />
    )
  }

  render () {
    return (
      <View style={styles.container}>
       {<Segment style={{backgroundColor:'transparent'}}>
              <Button success onPress={()=>this.setState({selected:0})}  active={this.state.selected==1}><Text style={{...Fonts.style.h5}}>{Strings.ar.now}</Text></Button>
              <Button success onPress={()=>this.setState({selected:1})}  active={this.state.selected==0}><Text  style={{...Fonts.style.h5}}>{Strings.ar.previous}</Text></Button>
       </Segment> }
       {
         this.renderContent()
       }
      </View>
    )
  }
}

const mapStateToProps = ({ ads,auth }) => {
  return {
    ads: ads.ads,
    fetching: ads.fetching,
    error: ads.error,
    user_id:auth.user.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myAdsRequest: (params) => dispatch(AdsAction.myAdsRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddsScreen)

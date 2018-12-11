import React, { Component } from 'react'
import { FlatList, View } from 'react-native'
import { BarIndicator } from 'react-native-indicators'
import { Icon, Text,Segment,Button } from 'native-base'
import AdsCard from '../components/AdsCard'
import { connect } from 'react-redux'

// Add Actions - replace 'Your' with whatever your reducer is called :)
import AdsAction from '../Redux/AdRedux'

import { Colors } from '../Themes'
// Styles
import styles from './Styles/MyAddsScreenStyles'

class MyAddsScreen extends Component {

  state={
    now:true
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.myAds,
      headerRight: (<Icon name='menu'style={{ color: Colors.white}} onPress={()=>navigation.openDrawer()}/>)
    };
  };

  componentWillMount() {
    this.props.myAdsRequest()
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
        report={()=>this.setState({reportedAd:item.id,isModalVisible:true})} />
    )
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5}/>;
    }
   // const ads = this.props.ads.filter((item)=> this.state.selected?item)
    return (
      <FlatList
        contentContainerStyle={styles.listContent}
        data={this.props.ads}
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
       {/* <Segment>
              <Button first><Text>Puppies</Text></Button>
              <Button last active><Text>Cubs</Text></Button>
       </Segment>*/ }
       {
         this.renderContent()
       }
      </View>
    )
  }
}

const mapStateToProps = ({ ads }) => {
  return {
    ads: ads.ads,
    fetching: ads.fetching,
    error: ads.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    myAdsRequest: (params) => dispatch(AdsAction.myAdsRequest(params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAddsScreen)

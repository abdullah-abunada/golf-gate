import React, { Component } from 'react'
import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";
// import PropTypes from 'prop-types';
import { I18nManager, Text } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Thumbnail,Icon } from 'native-base';
import Navigator from '../Navigation/Navigator'
import { BarIndicator } from 'react-native-indicators';
import { Colors, Images, Strings } from '../Themes/'

class SideDrawer extends Component {


  renderContent = ()=>{
    if (this.props.fetching) {
      return <BarIndicator color={Colors.black} count={5}/>;
    }
    return (
    <Row size={2} style={styles.CotainerStyle}>
      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("HomeScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.HomeScreen}</Text>
        <Icon active type='MaterialCommunityIcons' name="home" style={{ color: Colors.green }} />
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("MainScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.classes}</Text>
        <Icon active type='MaterialCommunityIcons' name="file-document-box" style={{ color: Colors.green }} />
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("ProfileScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.ProfileScreen}</Text>
        <Icon active type='MaterialCommunityIcons' name="face-profile" style={{ color: Colors.green }} />
      </Button>
      <Button block  transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("MyAddsScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.myAds}</Text>
        <Icon active type='MaterialCommunityIcons' name="equal-box" style={{ color: Colors.green }} />
      </Button>
      <Button block  transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("AddAdScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.addAd}</Text>
        <Icon active type='MaterialCommunityIcons' name="plus-box" style={{ color: Colors.green }} />
      </Button>
      <Button block  transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("PartnershipScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.partnership}</Text>
        <Icon active type='MaterialCommunityIcons' name="check-decagram" style={{ color: Colors.green }} />
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("PolicyScreen") }}>
 
        <Text style={styles.labelStyle}>{Strings.ar.PolicyScreen}</Text>
        <Icon active type='MaterialCommunityIcons' name="file" style={{ color: Colors.green }} />
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("ContactScreen") }}>

        <Text style={styles.labelStyle}>{Strings.ar.contactUs}</Text>
        <Icon active type='MaterialCommunityIcons' name="send" style={{ color: Colors.green }} />
      </Button>

      <Button block transparent style={[styles.buttonStyle, { marginTop: 15 }]}
        onPress={() => this.props.logout()}>

        <Text style={styles.labelStyle}>{Strings.ar.logout}</Text>
        <Icon active type='MaterialCommunityIcons' name="exit-to-app" style={{ color: Colors.green }} />
      </Button>
    </Row>)

  }
  render() {
    return (
      <Grid style={{backgroundColor:Colors.white,marginRight: I18nManager.isRTL? 90 : null }}>
        <Row size={.5} style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'column',paddingTop:40}}>
          <Thumbnail
            source={this.props.image ? { uri: this.props.image } : Images.defaultProfile}
            style={{ width: 100, height: 100,margin:30 }} />
          <Text style={styles.labelStyle}>{this.props.username}</Text>
        </Row>
        {this.renderContent()}
      </Grid>

    )
  }
}


const mapStateToProps = ({ auth }) => {
  return {
    username: auth.user.name,
    image: auth.user.image,
    fetching : auth.fetching
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(AuthActions.logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer)


const styles = {
  CotainerStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent:'center'
  },
  labelContainer: {
    justifyContent: 'flex-end'
  },
  labelStyle: {
    color:Colors.black,
    fontSize: 18
  },
  buttonStyle: {
    paddingRight: 20,
    justifyContent:'flex-end'
  }
}

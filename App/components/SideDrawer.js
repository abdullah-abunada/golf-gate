import React, { Component } from 'react'
import AuthActions from '../Redux/AuthRedux'
import { connect } from "react-redux";
// import PropTypes from 'prop-types';
import { View, Text } from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Button, Thumbnail } from 'native-base';
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
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("MainScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.MainScreen}</Text>
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("ProfileScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.ProfileScreen}</Text>
      </Button>
      <Button block  transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("MyAddsScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.addAd}</Text>
      </Button>
      <Button block  transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("AddAdScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.addAd}</Text>
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("PolicyScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.PolicyScreen}</Text>
      </Button>

      <Button block transparent style={styles.buttonStyle}
        onPress={() => { Navigator.navigate("ContactScreen") }}>
        <Text style={styles.labelStyle}>{Strings.ar.contactUs}</Text>
      </Button>

      <Button block transparent style={[styles.buttonStyle, { marginTop: 30 }]}
        onPress={() => this.props.logout()}>
        <Text style={styles.labelStyle}>{Strings.ar.logout}</Text>
      </Button>
    </Row>)

  }
  render() {
    return (
      <Grid style={{backgroundColor:Colors.grey}}>
        <Row size={1} style={{ alignItems: 'center', justifyContent: 'center',flexDirection:'column',paddingTop:40}}>
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


import React, { Component } from 'react'
import { ScrollView, View } from 'react-native'

import { Icon, Input, Item, Text,Button } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BarIndicator } from 'react-native-indicators'

import ContactActions from '../Redux/ContactRedux'
import { connect } from "react-redux";


import { Fonts,Strings, Colors } from '../Themes'

// Styles
import styles from './Styles/AddAdScreenStyles'


class PartnershipScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: Strings.ar.partnership,
      headerRight: (<Icon name='menu' style={{ color: Colors.white }} onPress={() => navigation.openDrawer()} />)
    };
  };

  state={
    image : null
  }

  handleSend =()=>{
    const {name,mobile} = this.props
    if(subject!=''&& mobile!='' &&this.state.image)
    this.props.partnershipRequest(name, message,this.props.user_id)
    else {
      this.props.handleInput('error',Strings.ar.error.fillAll)
    }
  }

  renderContent = () => {
    if (this.props.fetching) {
      return <BarIndicator color={Colors.grey} count={5} />;
    }
    return (
      <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center',padding:20}}>
      <View style={{ flex: 4 }}>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.subject}</Text>
        <Item regular  style={styles.inputContainer} >
          <Input placeholder={Strings.ar.name} textBox
            onChangeText={(value) => { this.props.handleInput('name', value) }}
            value={this.props.name} />
        </Item>
        <Text  style={{ ...Fonts.style.h5 }}>{Strings.ar.message}</Text>
        <Item regular  style={styles.inputContainer} >
          <Input placeholder={Strings.ar.mobile} textBox
            keyboardType='name-phone-pad'
            onChangeText={(value) => { this.props.handleInput('mobile', value) }}
            value={this.props.mobile}
            multiline />
        </Item>
        <Button full dark transparent onPress={this._pickImage}>
            <Text style={{ ...Fonts.style.h5, color: 'black' }}>{Strings.ar.uploadImage}</Text>
            <Icon name='camera' style={{ color: Colors.black }} />
          </Button>
              {this.state.image
           &&<Image
              source={{uri: this.state.image}}
              style={{ width: 50, height: 50 ,alignSelf:'center'}}
            />
            }
        <Text style={{...Fonts.style.description,color:'red',alignSelf:'center'}}>{this.props.error}</Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button full dark onPress={this.handleSend}>
          <Text style={{ ...Fonts.style.h5,color:'white' }}>{Strings.ar.send}</Text>
        </Button>     
      </View>
    </View>
    )
  }
  render() {
    return (

      <KeyboardAwareScrollView style={styles.container} enableOnAndroid>
        {this.renderContent()}
      </KeyboardAwareScrollView>

    )
  }

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({base64: true,
                                                                    allowsEditing: false,
                                                                    aspect: [4, 3]});
      if (!pickerResult.cancelled) {
        let imageUri = pickerResult ? `data:image/png;base64,${pickerResult.base64}` : null;
        this.setState({image:imageUri}) 
      }
    }
  };
}

const mapStateToProps = ({ contact ,auth}) => {
  const { name, mobile, fetching,error } = contact
  return {
    mobile, name, fetching,error,user_id:auth.user.user_id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    partnershipRequest: (name, mobile,image) => dispatch(ContactActions.partnershipRequest(name, mobile,image)),
    handleInput: (prop, value) => dispatch(ContactActions.handleInput(prop, value)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnershipScreen)

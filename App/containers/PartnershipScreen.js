import React, {Component} from 'react'
import {AsyncStorage, Image, View} from 'react-native'

import {Icon, Input, Item, Text, Button} from 'native-base'
import {ImagePicker, Permissions} from 'expo';
import {BarIndicator} from 'react-native-indicators'
import ConfirmedModal from '../components/confirmedModal'
import ContactActions from '../Redux/ContactRedux'
import {connect} from "react-redux";


import {Fonts, Strings, Colors} from '../Themes'

// Styles
import styles from './Styles/AddAdScreenStyles'


class PartnershipScreen extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: Strings.ar.partnership,
            headerRight: (<Icon name='menu' style={{color: Colors.white}} onPress={() => navigation.openDrawer()}/>)
        };
    };

    state = {
        image: null
    }

    async componentWillMount() {
        const user = await AsyncStorage.getItem('user')
        if (user) {
            this.props.setUser(JSON.parse(user))
        }
    }

    _toggleModal = () => {
        this.props.handleInput("isModalVisible", !this.props.isModalVisible);
        this.props.navigation.navigate('MainScreen')
    }

    handleSend = () => {
        const {name, mobile} = this.props
        if (name != '' && mobile != '' && this.state.image)
            this.props.partnershipRequest(this.props.user_id, this.state.image)
        else {
            this.props.handleInput('error', Strings.ar.error.fillAll)
        }
    }

    renderContent = () => {
        if (this.props.fetching) {
            return <BarIndicator color={Colors.grey} count={5}/>;
        }
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {this.props.isModalVisible &&
                <ConfirmedModal message={this.props.sentSuccess} partnership onConfirm={this._toggleModal}/>}
                <Text style={{...Fonts.style.h5, margin: 10}}>{Strings.ar.name}</Text>
                <Item regular style={styles.inputContainer}>
                    <Input placeholder={Strings.ar.name} textBox
                           onChangeText={(value) => {
                               this.props.handleInput('name', value)
                           }}
                           value={this.props.name}/>
                </Item>
                <Text style={{...Fonts.style.h5, margin: 10}}>{Strings.ar.mobile}</Text>
                <Item regular style={styles.inputContainer}>
                    <Input placeholder={Strings.ar.mobile} textBox
                           keyboardType='phone-pad'
                           onChangeText={(value) => {
                               this.props.handleInput('mobile', value)
                           }}
                           value={this.props.mobile}
                    />
                </Item>
                <Button full dark transparent onPress={this._pickImage}>
                    <Text style={{...Fonts.style.h5, color: 'black'}}>{Strings.ar.uploadImage}</Text>
                    <Icon name='camera' style={{color: Colors.black}}/>
                </Button>
                {this.state.image
                && <Image
                    source={{uri: this.state.image.uri}}
                    style={{width: 50, height: 50, alignSelf: 'center'}}
                />
                }
                <Text style={{
                    ...Fonts.style.description,
                    color: 'red',
                    alignSelf: 'center',
                    margin: 20
                }}>{this.props.error}</Text>


                <Button full dark onPress={this.handleSend}>
                    <Text style={{...Fonts.style.h5, color: 'white'}}>{Strings.ar.send}</Text>
                </Button>
            </View>
        )
    }

    render() {
        if (!this.props.user_id) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon type='MaterialCommunityIcons' name="cat"
                          style={{color: Colors.green, fontSize: 80, textAlign: 'center', justifyContent: 'center'}}/>
                    <Text style={{...Fonts.style.h5, color: Colors.black, textAlign: 'center', marginBottom: 50}}>
                        {Strings.ar.notAuth}
                    </Text>
                </View>
            )
        } else {
            return (
                <View style={{flex: 1, padding: 20}} enableOnAndroid>
                    {this.renderContent()}
                </View>
            )
        }
    }

    _pickImage = async () => {
        const {
            status: cameraRollPerm
        } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        // only if user allows permission to camera roll
        if (cameraRollPerm === 'granted') {
            let pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: false,
                aspect: [4, 3],
            });
            if (!pickerResult.cancelled) {

                this.setState({image: pickerResult})
            }
        }
    }
}

const mapStateToProps = ({contact, auth}) => {
    const {name, mobile, fetching, error, sentSuccess, isModalVisible} = contact
    return {
        mobile, name, fetching, error, sentSuccess, user_id: auth.user.user_id, isModalVisible
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        partnershipRequest: (user_id, image) => dispatch(ContactActions.partnershipRequest(user_id, image)),
        handleInput: (prop, value) => dispatch(ContactActions.handleInput(prop, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PartnershipScreen)

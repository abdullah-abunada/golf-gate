import React, {Component} from 'react'
import {ScrollView, View} from 'react-native'
import ModalBox from "react-native-modalbox"
import {Icon, Input, Item, Text, Button} from 'native-base'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {BarIndicator} from 'react-native-indicators'

import ContactActions from '../Redux/ContactRedux'
import {connect} from "react-redux";


import {Fonts, Strings, Colors} from '../Themes'

// Styles
import styles from '../containers/Styles/AddAdScreenStyles'

class ReportModal extends Component {


    handleSend = () => {
        const {why} = this.props
        if (why != '')
            this.props.reportRequest(this.props.user_id, why, this.props.ad)
        else {
            this.props.handleInput('error', Strings.ar.error.fillAll)
        }
    }

    renderContent = () => {
        if (this.props.fetching) {
            return <BarIndicator color={Colors.grey} count={5}/>;
        }
        if (!this.props.user_id) {
            return (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Icon type='MaterialCommunityIcons' name="cat"
                          style={{color: Colors.green, fontSize: 80, textAlign: 'center', justifyContent: 'center'}}/>
                    <Text style={{...Fonts.style.h5, color: Colors.black, textAlign: 'center', marginBottom: 50}}>
                        {Strings.ar.notAuth}
                    </Text>
                    <Button full bordered onPress={this.props.onConfirm}>
                        <Text style={{...Fonts.style.h5, color: Colors.black}}>عودة</Text>
                    </Button>
                </View>
            )
        }
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 4}}>
                    <Text style={{
                        ...Fonts.style.h5,
                        alignSelf: 'center',
                        color: Colors.dark,
                        marginBottom: 20
                    }}>{Strings.ar.report}</Text>
                    <Item regular style={styles.inputContainer}>
                        <Input placeholder={Strings.ar.why} textBox style={{height: 250}}
                               onChangeText={(value) => {
                                   this.props.handleInput('why', value)
                               }}
                               value={this.props.subject}/>
                    </Item>
                    <Text style={{
                        ...Fonts.style.description,
                        color: 'red',
                        margin: 10,
                        alignSelf: 'center'
                    }}>{this.props.error}</Text>
                    <Text style={{
                        ...Fonts.style.description,
                        color: 'green',
                        margin: 10,
                        alignSelf: 'center'
                    }}>{this.props.sentSuccess}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'space-around', alignItems: 'center', flexDirection: 'row'}}>
                    <Button full dark onPress={this.handleSend}>
                        <Text style={{...Fonts.style.h5, color: 'white'}}>{Strings.ar.send}</Text>
                    </Button>
                    <Button full bordered onPress={this.props.onConfirm}>
                        <Text style={{...Fonts.style.h5, color: Colors.black}}>خروج</Text>
                    </Button>
                </View>
            </View>
        )
    }

    render() {
        return (
            <ModalBox style={{flex: 1, maring: 100, padding: 20, borderRadius: 10}}
                      isOpen={true}
                      position="center"
                      backdrop={false}
                      coverScreen={true}>
                <View style={{flex: 1}}>
                    {this.renderContent()}
                </View>
            </ModalBox>

        )
    }
}

const mapStateToProps = ({contact, auth}) => {
    const {why, fetching, error, sentSuccess} = contact
    return {
        why, fetching, error, sentSuccess, user_id: auth.user.user_id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        reportRequest: (user_id, why, advertisement_id) => dispatch(ContactActions.reportRequest(user_id, why, advertisement_id)),
        handleInput: (prop, value) => dispatch(ContactActions.handleInput(prop, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportModal)

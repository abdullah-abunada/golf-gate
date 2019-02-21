import React, {Component} from 'react'
import {View, Image} from 'react-native'
import {Text, Icon, Button} from 'native-base'
import {} from 'react-native-elements'
import {connect} from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import {Colors, Images, Fonts, Strings} from '../Themes'
// Styles
import styles from './Styles/ProfileScreenStyles'

class ProfileScreen extends Component {


    static navigationOptions = ({navigation}) => {
        return {
            headerTitle: Strings.ar.ProfileScreen,
            headerRight: (<Icon name='menu' style={{color: Colors.white}} onPress={() => navigation.openDrawer()}/>)
        };
    };

    renderForm = () => {
        return (
            <View style={{flex: 2, justifyContent: 'center', padding: 10}}>
                <View style={styles.nameContainer}>
                    <Text style={{...Fonts.type.h3}}>{this.props.user.name}</Text>

                </View>
                <View style={styles.iContainer}>
                    <Text>{this.props.user.address}</Text>
                    <Icon name='map-marker' type="MaterialCommunityIcons"
                          style={{color: Colors.green, marginLeft: 10}}/>
                </View>
                <View style={styles.iContainer}>
                    <Text>{this.props.user.mobile}</Text>
                    <Icon name='phone' type="MaterialCommunityIcons" style={{color: Colors.green, marginLeft: 10}}/>
                </View>
                <View style={styles.iContainer}>
                    <Text>{this.props.user.email}</Text>
                    <Icon name='email' type="MaterialCommunityIcons" style={{color: Colors.green, marginLeft: 10}}/>
                </View>
            </View>
        )
    }


    render() {
        if (!this.props.user.user_id) {
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
                <View style={{flex: 1}}>
                    <View style={{flex: 2, backgroundColor: Colors.green}}>
                        <Image style={{flex: 1, width: null, height: 500}}
                               source={this.props.user.image ? {uri: this.props.user.image} : Images.defaultProfile}/>
                    </View>
                    {this.renderForm()}
                    <View style={{flex: 1}}>
                    </View>
                </View>
            )
        }
    }
}

const mapStateToProps = ({auth}) => {
    return {
        user: auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
//export default ProfileScreen
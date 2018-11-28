
import React, { Component } from 'react'
import { View } from 'react-native'
import { Container, Content, Button, Icon, Text, Form, Item, Input, Label,Thumbnail} from 'native-base';


//import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Strings, Metrics,Images } from '../Themes'
// Styles
import styles from './Styles/LoginScreenStyle'

class LoginScreen extends Component {
  render() {
    return (

      <View style={styles.container}>
        

          <View style={{ flex: 1, backgroundColor: '#987946' }}>
          </View>



          <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
            <Thumbnail square large source={Images.logo} />
          </View>


          <View style={{ flex: 2, justifyContent: 'space-around' }}>

            <Item regular>
              <Input placeholder={Strings.ar.email} textBox/>
              <Icon name='swap' />
            </Item>
            <Item regular>
              <Input placeholder={Strings.ar.password} textBox/>
              <Icon name='swap' />
            </Item>


            <Button small  transparent full onPress={() => this.props.navigation.navigate("RegisterScreen")}>
              <Text style={{color:Colors.grey}} >{Strings.ar.forgetPassword}</Text>
            </Button>
          
            <Button  full color={Colors.black}>
              <Text style={{color:Colors.white}}>{Strings.ar.login}</Text>
              <Icon name='home' />
            </Button>

           
            <Button full transparent>
              <Text style={{color:Colors.dark}}>{Strings.ar.signup}</Text>
              <Icon name='home' color={Colors.dark} />
            </Button>
           
          </View>

        </View>


    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

//export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
export default LoginScreen
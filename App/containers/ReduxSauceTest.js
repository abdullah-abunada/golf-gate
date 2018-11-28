import React from 'react';
import { StyleSheet, Text, WebView, View } from 'react-native';

import { Container, Button, Content, Item, Form, Label, Input, Thumbnail, Spinner } from 'native-base'


import LoginActions from '../Redux/TestRedux'
import { connect } from "react-redux";


class ReduxSauceTest extends React.Component {
    render() {
        return (

            <View>
                <Form>
                    <Item floatingLabel>
                        <Label>Username</Label>
                        <Input value={this.props.username}
                            onChangeText={(value) => {
                                this.props.attemptLogin(value, value)
                            }} />
                    </Item>
                </Form>
                <Button onPress={() => alert(this.props.username)}>
                    <Text> Click me </Text>
                </Button>
            </View>


        );
    }
}


const mapStateToProps = (state) => {
    return {
      username : state.test.username
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(ReduxSauceTest)
  
/*
linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
               */
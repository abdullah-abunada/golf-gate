import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, View, WebView } from 'react-native'
import { Button as Button2 } from 'react-native-elements'
import { Col, Row, Grid } from 'react-native-easy-grid';
import { Container, Button, Content, Item, Form, Label, Input, Thumbnail, Spinner } from 'native-base'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
// Styles
import styles from './Styles/LoginScreenStyle_zz'
import Colors from "../Themes/Colors";
import Metrics from '../Themes/Metrics'


import LoginActions from '../Redux/LoginRedux'
import { connect } from "react-redux";


class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false
        }

    }


    onLoginPressed = () => {

    }


    login = () => {
        /* this.setState({ load: true });
          setTimeout(function () {
              Actions.jump('trajetSearch');
          }, 2000);
           <WebView
                source={require('./src/widget/particles.html')}
                style={{flex:1,zIndex:0}}
                />    */
        this.props.attemptLogin(this.props.username, this.props.password)
    }

    render() {
        return (
            <Container>
                <WebView
                    source={require('../widget/particles.html')}
                    style={{ flex: 1, zIndex: 0 }}
                />
                <KeyboardAwareScrollView
                    style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, zIndex: 1 }}
                    enableOnAndroid>
                    {this.renderContent()}
                </KeyboardAwareScrollView>
            </Container>

        )
    }

    renderContent() {
        if (this.props.fetching) {
          return  <Spinner color='blue' />
        }
        return (
            <Grid style={{ height: Metrics.screenHeight }}>
                <Row size={4} style={{ justifyContent: 'flex-end', flexDirection: 'column', alignItems: 'center' }}>
                    <Thumbnail square
                        source={require('../../assets/logo_transparent.png')}
                        style={{ width: 180, height: 180, alignSelf: 'center' }} />
                </Row>
                <Row size={2} style={styles.containerStyle}>
                    <Form>
                        <Item floatingLabel>
                            <Label style={{ color: Colors.c1 }}>Username</Label>
                            <Input style={{ color: Colors.c2 }}
                                onChangeText={(value) => { this.props.handleInput('username', value) }}
                                value={this.props.username} />
                        </Item>
                        <Item floatingLabel last>
                            <Label style={{ color: Colors.c1 }}>Password</Label>
                            <Input secureTextEntry style={{ color: Colors.c2 }}
                                onChangeText={(value) => { this.props.handleInput('password', value) }}
                                value={this.props.password} />
                        </Item>
                    </Form>

                </Row>
                <Row size={.5} style={styles.rowContainerStyle}>
                    <Col size={1} style={styles.rowContainerStyle}>
                        <Button2
                            loading={this.props.fetching}
                            title="Login"
                            containerStyle={{ flex: -1 }}
                            linearGradientProps={{
                                colors: ['#FF9800', '#F44336'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            onPress={this.login}
                            disabled={this.props.fetching}
                        />
                        <Button2
                            loading={this.props.fetching}
                            title=""
                            icon={
                                <Icon
                                    name='search'
                                    size={15}
                                    color='white'
                                />
                            }
                            containerStyle={{ flex: -1 }}
                            buttonStyle={{
                                width: 50,
                                borderRadius: 50,
                                height: 45,
                            }}
                            linearGradientProps={{
                                colors: ['#16a085', '#27ae60'],
                                start: [1, 0],
                                end: [0.2, 0],
                            }}
                            disabled={this.props.fetching}
                            onPress={this.login}
                        />
                        <Button block style={{ backgroundColor: Colors.c2 }} onPress={this.login}>
                            <Text style={styles.textButtonStyle}>Login</Text>
                        </Button>
                    </Col>
                    <Col size={1} style={styles.rowContainerStyle}>
                        <Button block style={{ backgroundColor: Colors.DarkBlue }}
                            onPress={() => {
                                //  Actions.jump('register');
                            }}>
                            <Text style={styles.textButtonStyle}>register</Text>
                        </Button>
                    </Col>
                </Row>
                <Row size={.5} style={styles.rowContainerStyle}>
                    <Col size={1}>
                        <View style={{ borderColor: '#ccc', borderWidth: 1 }} />
                    </Col>
                    <Col size={1} style={{ alignItems: 'center' }}>
                        <Text>or login with</Text>
                    </Col>
                    <Col size={1}>
                        <View style={{ borderColor: '#ccc', borderWidth: 1 }} />
                    </Col>
                </Row>
                <Row size={.5} style={styles.rowContainerStyle}>
                    <Col size={1} style={styles.rowContainerStyle}>
                        <Button block style={{ backgroundColor: Colors.c1 }} onPress={() => {
                            this.login();
                        }}>

                            <Text style={styles.textButtonStyle}>Facebook</Text>
                        </Button>

                    </Col>
                    <Col size={1} style={styles.rowContainerStyle}>
                        <Button block style={{ backgroundColor: Colors.c1 }} onPress={() => {
                            this.login();
                        }}>

                            <Text style={styles.textButtonStyle}>Google</Text>
                        </Button>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username: state.login.username,
        password: state.login.password,
        fetching: state.login.fetching,
        error: state.login.error,
        authToken: state.login.authToken
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
        handleInput: (prop, value) => dispatch(LoginActions.handleInput(prop, value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)

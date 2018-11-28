import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator ,createAppContainer } from 'react-navigation';


//screens

import ContactScreen from '../containers/ContactScreen';
import HomeScreen from '../containers/HomeScreen';
import RegisterScreen from '../containers/RegisterScreen';
import ProfileScreen from '../containers/ProfileScreen';
import PolicyScreen from '../containers/PolicyScreen';
import LoginScreen from '../containers/LoginScreen';

//styles
import styles from './Styles/NavigationContainerStyles'


//drawer content
//import SideDrawer from "../Components/SideDrawer";



// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.


const HomeStack = createStackNavigator(
    {
        HomeScreen: { screen: HomeScreen },
    }, {
        navigationOptions: {
            initialRouteName: 'HomeScreen',
            headerMode: 'screen'
        }
    });

const AuthStack = createStackNavigator({
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen }
}, {
        // Default config for all screens
        headerMode: 'none',
        initialRouteName: 'LoginScreen',
        navigationOptions: {
            headerStyle: styles.header
        }
    })

const AppStack = createDrawerNavigator(
    {
        HomeStack: { screen: HomeStack },
        ProfileScreen: { screen: ProfileScreen }, 
        ContactScreen: { screen: ContactScreen },
        PolicyScreen: { screen: PolicyScreen }

    },
    {
         //contentComponent: props => <SideDrawer/>,
         initialRouteName: 'HomeStack',
         drawerPosition :'right',
         navigationOptions: {
             //headerStyle: styles.header
         }
    }
);




const PrimaryNav = createSwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'Auth',
    }
);


export default createAppContainer(PrimaryNav);

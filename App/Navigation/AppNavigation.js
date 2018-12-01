import React from 'react';
import { createStackNavigator, createDrawerNavigator, createSwitchNavigator ,createAppContainer } from 'react-navigation';


//screens

import RegisterScreen from '../containers/RegisterScreen';
import LoginScreen from '../containers/LoginScreen';

import HomeScreen from '../containers/HomeScreen';
import MainScreen from '../containers/MainScreen';
import SectionScreen from '../containers/SectionScreen';
import AdsDetailsScreen from '../containers/AdsDetailsScreen';

import ProfileScreen from '../containers/ProfileScreen';
import PolicyScreen from '../containers/PolicyScreen';
import AddAdScreen from '../containers/AddAdScreen';
import MyAddsScreen from '../containers/MyAddsScreen';
import ContactScreen from '../containers/ContactScreen';

//styles
import styles from './Styles/NavigationContainerStyles'


//drawer content
//import SideDrawer from "../Components/SideDrawer";



// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.


const HomeStack = createStackNavigator(
    {
        MainScreen: { screen: MainScreen },
        AdsDetailsScreen: { screen: AdsDetailsScreen },
        SectionScreen: { screen: SectionScreen }

    }, {
        navigationOptions: {
            initialRouteName: 'MainScreen',
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
        HomeScreen: { screen: HomeScreen },
        HomeStack: { screen: HomeStack },
        ProfileScreen: { screen: ProfileScreen }, 
        AddAdScreen: { screen: AddAdScreen },
        MyAddsScreen: { screen: MyAddsScreen },        
        PolicyScreen: { screen: PolicyScreen },
        ContactScreen: { screen: ContactScreen }
    },
    {
         //contentComponent: props => <SideDrawer/>,
         initialRouteName: 'HomeStack',
         headerMode: 'screen',
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
        initialRouteName: 'App',
    }
);


export default createAppContainer(PrimaryNav);

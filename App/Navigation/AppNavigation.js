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

//
import ContactScreen from '../containers/ContactScreen';

//styles
import styles from './Styles/NavigationContainerStyles';


//drawer content
import SideDrawer from "../components/SideDrawer";



// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.


const HomeStack = createStackNavigator(
    {
        MainScreen: { screen: MainScreen },
        AdsDetailsScreen: { screen: AdsDetailsScreen },
        SectionScreen: { screen: SectionScreen }

    }, {
        defaultNavigationOptions: {
        headerStyle: styles.header,
        headerTitleStyle: styles.title,
        headerRightContainerStyle:styles.iconContainer,
        headerTitleContainerStyle:styles.headerContainer
        },
        initialRouteName: 'MainScreen',
        headerMode: 'float'
    });


const AuthStack = createStackNavigator({
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen }
}, {
        // Default config for all screens
        initialRouteName: 'LoginScreen',
        headerMode:'screen'   
    })

const AppStack = createDrawerNavigator(
    {
        HomeScreen: createStackNavigator({ screen: HomeScreen },{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}}),
        HomeStack: { screen: HomeStack },
        ProfileScreen:createStackNavigator ({ screen: ProfileScreen },{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}}), 
        AddAdScreen: createStackNavigator({ screen: AddAdScreen },{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}}),
        MyAddsScreen: createStackNavigator({ screen: MyAddsScreen},{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}}),        
        PolicyScreen:createStackNavigator ({ screen: PolicyScreen },{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}}),
        ContactScreen: createStackNavigator({ screen: ContactScreen},{defaultNavigationOptions: {
            headerStyle: styles.header,
            headerTitleStyle: styles.title,
            headerRightContainerStyle:styles.iconContainer,
            headerTitleContainerStyle:styles.headerContainer}})
    },
    {
         contentComponent: props => <SideDrawer/>,
         initialRouteName: 'HomeScreen',
         drawerPosition :'right'
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


export default createAppContainer(PrimaryNav)

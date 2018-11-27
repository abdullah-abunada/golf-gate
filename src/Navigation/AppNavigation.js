import React from 'react';
import {StackNavigator, SwitchNavigator, DrawerNavigator} from 'react-navigation';
import LoginScreen from '../Containers/LoginScreen';

import styles from './Styles/NavigationStyles'



import SideDrawer from "../Components/SideDrawer";



// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.


const HomeStack = StackNavigator(
    {
      //  HomeScreen: {screen: HomeScreen},
        
    }, {
        navigationOptions: {
        /*    initialRouteName: 'HomeScreen',
            headerMode: 'screen',
            headerStyle: styles.header,
            headerTitleStyle:styles.title*/
        }
    });




const AppStack = DrawerNavigator(
    {
     //   HomeStack: {screen: HomeStack},

    },
    {
        contentComponent: props => <SideDrawer/>,
        initialRouteName: 'HomeStack',
        navigationOptions: {
            headerStyle: styles.header
        },
    }
);
/*
const AppStack = DrawerNavigator({
    HomeScreen: {screen: HomeScreen}
}, {
    // Default config for all
    initialRouteName: 'HomeScreen',
    navigationOptions: {
        headerStyle: styles.header
    },
     contentComponent: () => <Text>Map Component</Text>,
});*/

const AuthStack = StackNavigator({
    LoginScreen: {screen: LoginScreen},
    RegisterScreen: {screen: RegisterScreen}
}, {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
        headerStyle: styles.header
    }
})

const PrimaryNav = SwitchNavigator(
    {
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'App',
    }
);


export default PrimaryNav

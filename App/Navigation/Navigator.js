import { NavigationActions } from 'react-navigation';

class NavigationActionsClass {

    setNavigator(navigator) {
        this.navigator = navigator
    }

    navigate = (routeName,params) => {
        this.navigator.dispatch(
            NavigationActions.navigate({
                type: 'Navigation/NAVIGATE',
                routeName,
                params
            }),
        );
    }
}


export default Navigator = new NavigationActionsClass()



import React from 'react';
import RootContainer from './App/containers/RootContainer'
import { I18nManager,BackAndroid ,Platform} from 'react-native';
import createStore from './App/Redux'
import { Provider } from 'react-redux'
import {AppLoading,Font,Updates} from 'expo'


I18nManager.allowRTL(false)
I18nManager.forceRTL(false)
if(I18nManager.isRTL){
  Updates.reload()
}

const store = createStore()

export default class App extends React.Component {

  state = {
    fontLoaded: false
}


async componentDidMount() {

  await Font.loadAsync({
      'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf')
  });
  this.setState({fontLoaded: true});
}


  render() {

    if (!this.state.fontLoaded)
        return (<AppLoading/>)
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}


/*
  Keystore password: cd4085ca2fff46989b5adad751e3f727
  Key alias:         QHdhc3NpbWhlbm5vdW5lL2Jhd2FiYQ==
  Key password:      63cf28b27f0f4b7d996731a3b8ab0bf6
 */
import React from 'react';
import RootContainer from './App/containers/RootContainer'

import createStore from './App/Redux'
import { Provider } from 'react-redux'

import {AppLoading,Font} from 'expo'

// create our store
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



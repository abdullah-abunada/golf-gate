import React from 'react';
import RootContainer from './App/containers/RootContainer'

import createStore from './App/Redux'
import { Provider } from 'react-redux'

// create our store
const store = createStore()

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}



import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import LoginActions from '../Redux/LoginRedux'
import {Actions as NavigationActions} from 'react-native-router-flux'

export const selectAuthToken = (state) => state.login.authToken



// attempts to login
export function * login (api, { username, password }) {
  const authObj = {
    username: username,
    password: password,
    rememberMe: true
  }

    const response = yield call(api.login, authObj)
    yield delay(1000)
    if(response.ok) 
      {
        yield put(LoginActions.loginSuccess(response.data.id_token))
      }
    else  yield put(LoginActions.loginFailure('WRONG'))
  
 // const response = yield call(api.login, authObj)

  // success?
 
}

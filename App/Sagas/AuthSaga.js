import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AuthActions from '../Redux/AuthRedux'
import { AsyncStorage } from 'react-native'



export const selectAuthToken = (state) => state.login.authToken



// attempts to login
export function* login(api, { email, password }) {

  const authObj = {
    email: email,
    password: password
  }

  console.log("---------------inside login---------------------------")

  const response = yield call(api.login, authObj)
  if (response.ok) {
    yield call(api.setAuthToken, response.data.user.token)
    yield put(AuthActions.loginSuccess(response.data.user))
  }
  else {
    yield put(AuthActions.loginFailure('WRONG'))
  }

}

export function* register(api, { name, mobile, address, email, password }) {
  const authObj = {
    name: name,
    mobile: mobile,
    address: address,
    email: email,
    password: password
  }

  console.log("---------------inside login")
  console.log("---------------------------------authObj")
  console.log(authObj)

  const response = yield call(api.register, authObj)
  if (response.ok) {
    console.log(response.data.user)
    yield put(AuthActions.loginSuccess(response.data.user))
  }
  else {
    yield put(AuthActions.loginFailure('WRONG'))
  }

}


// attempts to logout
export function* logout(api) {

  const response = yield call(api.logout)
  if (response.ok) {
    console.log('logout Succuessful')
    yield call(api.removeAuthToken)
    yield put(AuthActions.logoutSuccess())
  }
  else{
    console.log("logout ki zebiiiiiiiiiiiiiiiiiiiii")
  }

}

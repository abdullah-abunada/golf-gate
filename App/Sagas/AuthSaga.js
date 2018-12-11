import { call, put, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import AuthActions from '../Redux/AuthRedux'







// attempts to login
export function* login(api, { email, password }) {

  const authObj = {
    email: email,
    password: password
  }

  const response = yield call(api.login, authObj)
  if (response.ok) {
    if (response.data.success) {
      yield call(api.setAuthToken, response.data.user.token)
      yield put(AuthActions.loginSuccess(response.data.user))
    }
    else {
      yield put(AuthActions.loginFailure(response.data.msg))
    }

  }
  else {
    yield put(AuthActions.loginFailure('WRONG'))
  }
}

export function* setUser(api, { user }) {
  yield call(api.setAuthToken, user.token)
}


export function* register(api, { name, mobile, address, email, password, image }) {
  const authObj = {
    name: name,
    mobile: mobile,
    address: address,
    email: email,
    password: password,
    image: image
  }

  //console.warn(authObj.image.slice(0,100))
  const response = yield call(api.register, authObj)
  if (response.ok) {
    console.warn("okk")
    if (response.data.success){
      console.warn("success")
      yield put(AuthActions.loginSuccess(response.data.user))
    }
    else {
      console.warn("notsuccess")
      yield put(AuthActions.loginFailure(response.data.msg))
    } 
  }
  else {
    console.warn(response)
    yield put(AuthActions.loginFailure('WRONG'))
  }

}


// attempts to logout
export function* logout(api, { }) {

  const response = yield call(api.logout)
  if (response.ok) {
    yield call(api.removeAuthToken)
    yield put(AuthActions.logoutSuccess())
  }
  else {

  }

}

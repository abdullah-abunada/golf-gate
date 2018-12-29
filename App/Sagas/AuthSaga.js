import { call, put, select } from 'redux-saga/effects'
import {Strings} from '../Themes'
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
      yield put(AuthActions.resetForm())
      yield put(AuthActions.loginSuccess(response.data.user))
    }
    else {
      yield put(AuthActions.loginFailure(Strings.ar.errorLoginMessage))
    }

  }
  else {
    yield put(AuthActions.loginFailure('خطا من السيرفر'))
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
    if (response.data.success){
      yield put(AuthActions.resetForm())
      yield put(AuthActions.loginSuccess(response.data.user))
    }
    else {
      yield put(AuthActions.loginFailure(Strings.ar.errorSignupMessage))
    } 
  }
  else {
    yield put(AuthActions.loginFailure(Strings.ar.error.sendingError))
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


//// forget password


export function* sendMail(api, { email }) {

  const authObj = {
    email
  }

  const response = yield call(api.sendMail, authObj)
  if (response.ok) {
    console.warn(response.data)
    if (response.data.success) {
      yield put(AuthActions.forgetSuccess(2))
    }
    else {
      yield put(AuthActions.loginFailure(response.data.msg))
    }

  }
  else {
    yield put(AuthActions.loginFailure('خطا من السيرفر'))
  }
}

export function* sendCode(api, { code}) {

  const authObj = {
    code
  }

  const response = yield call(api.sendCode, authObj)
  if (response.ok) {
    console.warn(response.data)
    if (response.data.success) {
      yield put(AuthActions.forgetSuccess(3))
    }
    else {
      yield put(AuthActions.loginFailure(response.data.msg))
    }

  }
  else {
    yield put(AuthActions.loginFailure('خطا من السيرفر'))
  }
}

export function* setPassword(api, { email, password,confirm_password }) {

  const authObj = {
    email: email,
    password: password,confirm_password
  }

  console.warn(authObj)

  const response = yield call(api.setPassword, authObj)
  if (response.ok) {
    console.warn(response.data)
    if (response.data.success) {
      yield put(AuthActions.resetForm())
      yield put(AuthActions.forgetSuccess(0))
    }
    else {
      yield put(AuthActions.loginFailure(response.data.error))
    }
  }
  else {
    yield put(AuthActions.loginFailure('خطا من السيرفر'))
  }
}

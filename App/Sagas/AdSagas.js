/* ***********************************************************
* A short word on how to use this automagically generated file.
* We're often asked in the ignite gitter channel how to connect
* to a to a third party api, so we thought we'd demonstrate - but
* you should know you can use sagas for other flow control too.
*
* Other points:
*  - You'll need to add this saga to sagas/index.js
*  - This template uses the api declared in sagas/index.js, so
*    you'll need to define a constant in that file.
*************************************************************/

import { call, put} from 'redux-saga/effects'
import {delay} from 'redux-saga'
import AdActions from '../Redux/AdRedux'
import Navigator from '../Navigation/Navigator'
import {Strings} from '../Themes'

//import { RNToasty } from 'react-native-toasty'

export function * adminAdsRequest (api,{navigate}) {
  const response = yield call(api.adminAdsRequest)
  if (response.ok) {
    yield put(AdActions.adminAdSuccess(response.data))
    if(navigate){
      yield delay(3000)
      Navigator.navigate('MainScreen')
    }
  } else {
    if(navigate)Navigator.navigate('MainScreen')
  }
}


export function * adRequest (api,{params}) {

  const response = yield call(api.getad,params)
  if (response.ok) {
    yield put(AdActions.adSuccess(response.data))
  } else {
    yield put(AdActions.adFailure())
  }
}

export function * myAdsRequest (api,{params}) {
  const response = yield call(api.getMyAds,params)
  console.warn(response.data)
  if (response.ok) {
    yield put(AdActions.adSuccess(response.data))
  } else {
    yield put(AdActions.adFailure())
  }
}

export function * addAd (api, {addContent,user_id ,image}) {
  const obj = {
    ...addContent,
    image,
    user_id
  }
  // make the call to the api
  const response = yield call(api.addAd,obj)
  // success?
  if (response.ok) {
    console.warn(response.data)
    if(response.data.success)  {
         yield put(AdActions.addAdSuccess(response.data.msg))
    }
    else{
       yield put(AdActions.addAdFailure(response.data.msg))
    }
  } else {
    yield put(AdActions.addAdFailure(Strings.ar.error.sendingError))
  }
}

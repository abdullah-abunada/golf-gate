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

import { call, put,select} from 'redux-saga/effects'
import ContactActions from '../Redux/ContactRedux'
import { AuthSelectors } from '../Redux/AuthRedux'

export function * contactUs (api, {subject,message}) {

  const obj = {
    subject:subject,
    message:message,
    user_id : 12
  }
  console.warn(obj.subject)
  // make the call to the api
  const response = yield call(api.contactUs,obj)
  console.warn(response)
  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    console.warn(response.data)
    yield put(ContactActions.contactSuccess(response.data))
  } else {
    yield put(ContactActions.contactFailure())
  }
}

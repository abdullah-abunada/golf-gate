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
import { Strings } from '../Themes'

export function * contactUs (api, {subject,message,user_id}) {

  const obj = {
    subject:subject,
    message:message,
    user_id 
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
    yield put(ContactActions.contactSuccess(""))
  } else {
    yield put(ContactActions.contactFailure(""))
  }
}

export function * partnership (api, {user_id,image}) {

  let uriParts = image.uri.split('.');
  let fileType = uriParts[uriParts.length - 1];

  let formData = new FormData();
  formData.append('image', {
    uri:image.uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`,
  });
  formData.append('user_id',user_id );
  console.warn(formData)
  // make the call to the api
 const response = yield call(api.partnership,formData)

  // success?
  if (response.ok) {
    if (response.data.success) {
      yield put(ContactActions.resetForm()) 
      yield put(ContactActions.contactSuccess(response.data.msg))
    }
    else {
      yield put(ContactActions.contactFailure(response.data.msg))
    }
  } else {
    yield put(ContactActions.contactFailure(Strings.ar.error.sendingError))
  }
}

export function * report (api, {user_id,why,advertisement_id}) {

  const obj = {
    user_id,why,advertisement_id
  }

  const response = yield call(api.report,obj)

  // success?
  if (response.ok) {
    // You might need to change the response here - do this with a 'transform',
    // located in ../Transforms/. Otherwise, just pass the data back from the api.
    yield put(ContactActions.resetForm()) 
    yield put(ContactActions.contactSuccess(Strings.ar.success.sentSuccessfuly))
  } else {
    yield put(ContactActions.contactFailure(Strings.ar.error.sendingError))
  }
}

import { takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AuthTypes } from '../Redux/AuthRedux'
import { CategoriesTypes } from '../Redux/CategoriesRedux'

// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import {login,register} from './AuthSaga'
import {getCategories} from './CategoriesSagas'



/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api =  API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeEvery(AuthTypes.LOGIN_REQUEST, login, api),
    takeEvery(AuthTypes.REGISTER_REQUEST, register, api),


    takeEvery(CategoriesTypes.CATEGORIES_REQUEST, getCategories, api),
  ])
}

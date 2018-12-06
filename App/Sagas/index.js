import { takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AuthTypes } from '../Redux/AuthRedux'
import { CategoriesTypes } from '../Redux/CategoriesRedux'
import { AdTypes } from '../Redux/AdRedux'
import { ContactTypes } from '../Redux/ContactRedux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import {login,register,setUser} from './AuthSaga'
import {getCategories,getSubCategories,getCities} from './CategoriesSagas'
import {addAd} from './AdSagas'
import {contactUs} from './ContactSagas'


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
    takeEvery(AuthTypes.SET_USER, setUser, api),
    takeEvery(CategoriesTypes.CATEGORIES_REQUEST, getCategories, api),
    takeEvery(CategoriesTypes.SUB_CATEGORIES_REQUEST, getSubCategories, api),
    takeEvery(CategoriesTypes.CITIES_REQUEST, getCities, api),
    takeEvery(ContactTypes.CONTACT_REQUEST, contactUs, api),
    takeEvery(AdTypes.ADD_AD_REQUEST, addAd, api)
  ])
}

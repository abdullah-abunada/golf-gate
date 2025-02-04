import { takeEvery, all } from 'redux-saga/effects'
import API from '../Services/Api'

/* ------------- Types ------------- */
import { AuthTypes } from '../Redux/AuthRedux'
import { CategoriesTypes } from '../Redux/CategoriesRedux'
import { AdTypes } from '../Redux/AdRedux'
import { ContactTypes } from '../Redux/ContactRedux'
// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import {login,register,setUser,logout,sendCode,sendMail,setPassword} from './AuthSaga'
import {getCategories,getSubCategories,getCities,getPrice} from './CategoriesSagas'
import {addAd,adminAdsRequest,adRequest,myAdsRequest} from './AdSagas'
import {contactUs,report,partnership} from './ContactSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api =  API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeEvery(AuthTypes.LOGIN_REQUEST, login, api),
    takeEvery(AuthTypes.LOGOUT, logout, api),
    takeEvery(AuthTypes.REGISTER_REQUEST, register, api),
    takeEvery(AuthTypes.SET_USER, setUser, api),
    takeEvery(AuthTypes.CHECK_MAIL, sendMail, api),
    takeEvery(AuthTypes.CHECK_CODE, sendCode, api),
    takeEvery(AuthTypes.NEW_PASSWORD, setPassword, api),

    takeEvery(CategoriesTypes.CATEGORIES_REQUEST, getCategories, api),
    takeEvery(CategoriesTypes.SUB_CATEGORIES_REQUEST, getSubCategories, api),
    takeEvery(CategoriesTypes.CITIES_REQUEST, getCities, api),
    takeEvery(CategoriesTypes.PRICE_REQUEST, getPrice, api),

    takeEvery(ContactTypes.REPORT_REQUEST, report, api),  
    takeEvery(ContactTypes.CONTACT_REQUEST, contactUs, api),
    takeEvery(ContactTypes.PARTNERSHIP_REQUEST, partnership, api),

    takeEvery(AdTypes.ADD_AD_REQUEST, addAd, api),
    takeEvery(AdTypes.ADMIN_ADS_REQUEST, adminAdsRequest, api),
    takeEvery(AdTypes.AD_REQUEST, adRequest, api),
    takeEvery(AdTypes.MY_ADS_REQUEST, myAdsRequest, api)
    
    
  ])
}

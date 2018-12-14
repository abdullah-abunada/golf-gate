import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {Strings} from '../Themes'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  adRequest: ['params'],
  myAdsRequest:['params'],
  adminAdsRequest : [],
  addAdRequest: ['addContent', 'user_id','image'],
  addAdSuccess: [],
  adSuccess: ['payload'],
  adminAdSuccess: ['payload'],
  handleInput: ['prop', 'value'],
  adFailure: null,
  addAdFailure: ['message']
})

export const AdTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
  addCategoryId: 1,
  sub_category_id: null,
  title: '',
  address: '',
  city_id: 0,
  selectedCity:0,
  phone: '',
  whatsapp: '',
  description: '',
  price: null,
  admin_ads: null,
  ads:null,
  actual_page:1,
  last_page:1,
  fetching: null,
  payload: null,
  error: '',
  success: ''
})

/* ------------- Selectors ------------- */

export const AdSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
//handle input changes
export const handleInput = (state, { prop, value }) => state.merge({ [prop]: value })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

  // request the data from an api

  export const requestMyAds = (state, { data }) =>
  state.merge({ fetching: true,ads:null, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { advertisements,last_page } = action.payload
  console.warn(action.payload)
  return state.merge({ fetching: false, error: null, ads : advertisements,last_page})
}

export const adminAdSuccess = (state, action) => {
  const { admin_ads } = action.payload
  return state.merge({ fetching: false, error: null, admin_ads })
}

export const addAdSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, success: Strings.ar.success.sentSuccessfully })
}

export const addAdFailure = (state, action) => {
  const { message } = action
  return state.merge({ fetching: false, error: Strings.ar.error.sendingError })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: Strings.ar.error.sendingError })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AD_REQUEST]: request,
  [Types.MY_ADS_REQUEST]: requestMyAds,
  [Types.ADMIN_ADS_REQUEST]: request,
  [Types.ADD_AD_REQUEST]: request,
  [Types.AD_SUCCESS]: success,
  [Types.ADMIN_AD_SUCCESS]: adminAdSuccess,
  [Types.AD_FAILURE]: failure,
  [Types.ADD_AD_SUCCESS]: addAdSuccess,
  [Types.ADD_AD_FAILURE]: addAdFailure,
  [Types.HANDLE_INPUT]: handleInput
})

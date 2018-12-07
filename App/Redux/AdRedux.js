import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  adRequest: ['data'],
  addAdRequest: ['addContent','user_id'],
  addAdSuccess: [], 
  adSuccess: ['payload'], 
  handleInput : ['prop','value'],
  adFailure: null,
  addAdFailure:['message']
})

export const AdTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  data: null,
    addCategoryId:1,
    sub_category_id :null,
    title :'add a new add',
    address:'address',
    city_id:1,
    phone:'0556797946',
    whatsapp:'0556797946',
    description:'this is a description for my new add',
    image:null,
    price : 1000,
  ads: [{
    user_id:15,
    sub_category_id:1,
    title:'wassim s ad',
    address:'oued smar, el harrash',
    city_id:1,
    phone:'002135468',
    whatsapp:'002134568',
    description:'this is wassim s add description',
    image:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&h=350',
    price:1000
  },{
    user_id:15,
    sub_category_id:1,
    title:'wassim s ad',
    address:'oued smar, el harrash',
    city_id:1,
    phone:'002135468',
    whatsapp:'002134568',
    description:'this is wassim s add description',
    image:'https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&h=350',
    price:1000
  }],
  
  fetching: null,
  payload: null,
  error: '',
  success:''
})

/* ------------- Selectors ------------- */

export const AdSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({[prop]:value })

// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, payload })
}

export const addAdSuccess = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, success:'added with success' })
}

export const addAdFailure = (state, action) => {
  const { message } = action
  return state.merge({ fetching: false, error:message })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true, payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.AD_REQUEST]: request,
  [Types.ADD_AD_REQUEST]: request,
  [Types.AD_SUCCESS]: success,
  [Types.AD_FAILURE]: failure,
  [Types.ADD_AD_SUCCESS]: addAdSuccess,
  [Types.ADD_AD_FAILURE]: addAdFailure,
  [Types.HANDLE_INPUT]: handleInput
})

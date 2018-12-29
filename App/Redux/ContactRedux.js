import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {Strings} from '../Themes'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contactRequest: ['subject','message','user_id'],
  partnershipRequest: ['user_id','image'],
  reportRequest: ['user_id','why','advertisement_id'],
  contactSuccess: ['payload'],
  contactFailure: ['payload'],
  handleInput : ['prop','value'],
  resetForm:[]
})

export const ContactTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  message :'',
  subject :'',
  name:'',
  mobile:'',
  data: null,
  fetching: null,
  payload: null,
  error: "",
  why:"",
  sentSuccess:"",
  isModalVisible:false
})

/* ------------- Selectors ------------- */

export const ContactSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })
export const resetForm = (state, action) => INITIAL_STATE
// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  console.warn(action)
  return state.merge({ fetching: false, error: null, sentSuccess:action.payload,isModalVisible:true})
}

// Something went wrong somewhere.
export const failure = (state, action) => {
  console.warn(action.payload)
  return state.merge({ fetching: false, error:action.payload})
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTACT_REQUEST]: request,
  [Types.PARTNERSHIP_REQUEST]: request,
  [Types.REPORT_REQUEST]: request,
  [Types.CONTACT_SUCCESS]: success,
  [Types.CONTACT_FAILURE]: failure,
  [Types.HANDLE_INPUT]: handleInput,
  [Types.RESET_FORM]: resetForm
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import {Strings} from '../Themes'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  contactRequest: ['subject','message','user_id'],
  reportRequest: ['user_id','why','advertisement_id'],
  contactSuccess: ['payload'],
  contactFailure: null,
  handleInput : ['prop','value']
})

export const ContactTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  message :'',
  subject :'',
  data: null,
  fetching: null,
  payload: null,
  error: "",
  why:"",
  sentSuccess:""
})

/* ------------- Selectors ------------- */

export const ContactSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */
//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })
// request the data from an api
export const request = (state, { data }) =>
  state.merge({ fetching: true, data, payload: null })

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null, sentSuccess:Strings.ar.success.sentSuccessfuly})
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: true,error:Strings.ar.error.sendingError })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CONTACT_REQUEST]: request,
  [Types.REPORT_REQUEST]: request,
  [Types.CONTACT_SUCCESS]: success,
  [Types.CONTACT_FAILURE]: failure,
  [Types.HANDLE_INPUT]: handleInput
})

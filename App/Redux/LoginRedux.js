import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  handleInput : ['prop','value'],
  loginRequest: ['username', 'password'],
  loginSuccess: ['authToken'],
  loginFailure: ['error']
})

export const LoginTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  username:'user',
  password :'user',
  fetching:false,
  error:null,
  authToken:null
});

/* ------------- Reducers ------------- */

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })
// we've successfully logged in
export const success = (state, data) => {
  const { authToken } = data
  return state.merge({ fetching: false, error: null, authToken })
}
// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error, authToken: null })
//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.HANDLE_INPUT]: handleInput

})

/* ------------- Selectors ------------- */

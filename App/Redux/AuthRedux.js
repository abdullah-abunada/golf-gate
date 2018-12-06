import { createReducer, createActions } from 'reduxsauce'
import {AsyncStorage} from 'react-native'
import Immutable from 'seamless-immutable'
import Navigator from '../Navigation/Navigator'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  handleInput : ['prop','value'],
  setUser: ['user'],
  loginRequest: ['email', 'password'],
  registerRequest: ['name','mobile','address','email', 'password'],
  loginSuccess: ['authToken'],
  loginFailure: ['error'],
  logout: ['token'],
  logoutSuccess: [],
  logoutFailure: ['error'],

})

export const AuthTypes = Types
export default Creators

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getUser: state => state.user
}


/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email:'wassim@wassim.com',
  password :'123456',
  mobile:'0000000',
  address:'riyadh, KSA',
  name:'mohamed',
  fetching:false,
  error:"null",
  user:{
    user_id: 19,
    name: "wassim",
    email: "ew_hennoune@esi.dz",
    mobile: "0697961213",
    image:  'https://assets.entrepreneur.com/content/3x2/2000/20150406145944-dos-donts-taking-perfect-linkedin-profile-picture-selfie-mobile-camera-2.jpeg?width=700&crop=2:1',
    address: "takbou, médéa",
    active: 0,
    token: "a1e5a4476077e1210d8f14c5eb298d8604ef19841543495800"
  }
});

/* ------------- Reducers ------------- */

//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })
//setUser
export const setUser = (state,{user}) => state.merge({ user })

// we're attempting to login
export const request = (state) => state.merge({ fetching: true })

// we've successfully logged in
export const success =  (state, data) => {
  AsyncStorage.setItem('user',JSON.stringify(data.authToken)).then(()=>Navigator.navigate("HomeScreen"))
  return   state.merge({ fetching: false, error: null, user:data.authToken })
}

export const logoutSuccess =  (state) => {
  AsyncStorage.removeItem('user').then(()=>Navigator.navigate("LoginScreen"))
  return   state.merge({ fetching: false, error: null, user:null })
}

// we've had a problem logging in
export const failure = (state, { error }) => state.merge({ fetching: false, error})



/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: request,
  [Types.REGISTER_REQUEST]: request,
  [Types.LOGIN_SUCCESS]: success,
  [Types.LOGIN_FAILURE]: failure,
  [Types.HANDLE_INPUT]: handleInput,
  [Types.SET_USER]: setUser,
  [Types.LOGOUT]: request,
  [Types.LOGOUT_SUCCESS]: logoutSuccess,
  [Types.LOGOUT_FAILURE]: failure,
})

/* ------------- Selectors ------------- */

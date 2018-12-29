import { createReducer, createActions } from 'reduxsauce'
import {AsyncStorage} from 'react-native'
import Immutable from 'seamless-immutable'
import Navigator from '../Navigation/Navigator'
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  handleInput : ['prop','value'],
  setUser: ['user'],
  loginRequest: ['email', 'password'],
  registerRequest: ['name','mobile','address','email', 'password','image'],
  loginSuccess: ['authToken'],
  loginFailure: ['error'],
  logout: [],
  resetForm: [],
  logoutSuccess: [],
  logoutFailure: ['error'],
  checkMail:['email'],
  checkCode:['code'],
  newPassword:['email','password','confirm_password'],
  forgetSuccess:['step']
})

export const AuthTypes = Types
export default Creators

/* ------------- Selectors ------------- */

export const AuthSelectors = {
  getUser: state => state.user
}


/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  email:'',
  password :'',
  mobile:'',
  address:'',
  verify_password:'',
  name:'',
  code:'',
  step:1,
  isModalVisible:false,
  image:null,
  fetching:false,
  error:'',
  user:{
    user_id: null,
    name: null,
    email:null,
    mobile: null,
    image:  null,
    address: null,
    active: null,
    token:null
  }
});

/* ------------- Reducers ------------- */

//handle input changes
export const handleInput = (state,{prop,value}) => state.merge({ [prop]:value })
export const resetForm = (state, action) => INITIAL_STATE
//setUser
export const setUser = (state,{user}) => state.merge({ user })

// we're attempting to login
export const request = (state) => state.merge({ fetching: true,error:'' })

// we've successfully logged in
export const success =  (state, data) => {
  console.warn(data.authToken)
  AsyncStorage.setItem('user',JSON.stringify(data.authToken)).then(()=>Navigator.navigate("HomeScreen"))
  return   state.merge({ fetching: false, error: null, user:data.authToken })
}

export const forgetSuccess =  (state, action) => {
  console.warn(action.step)
  if(action.step===0)   return state.merge({ fetching: false, error:'',isModalVisible:true })
  return   state.merge({ fetching: false, error:'',step:action.step })
}

export const logoutSuccess =  (state) => {
  AsyncStorage.removeItem('user').then(()=>Navigator.navigate("LoginScreen"))
  return   state.merge({ fetching: false, error: null, user:{
    user_id: null,
    name: null,
    email:null,
    mobile: null,
    image:  null,
    address: null,
    active: null,
    token:null
  } })
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
  [Types.RESET_FORM]: resetForm,
  [Types.CHECK_MAIL]: request,
  [Types.CHECK_CODE]: request,
  [Types.NEW_PASSWORD]: request,
  [Types.FORGET_SUCCESS]:forgetSuccess


})

/* ------------- Selectors ------------- */

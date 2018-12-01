import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoriesRequest: [],
  categoriesSuccess: ['payload'],
  categoriesFailure: null
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  payload: [{
    id: 4,
    name: "مباردات شركات ومؤسسات",
    created_at: "2018-11-17 06:21:54"
  },{
    id: 5,
    name: "مباردات شركات ومؤسسات",
    created_at: "2018-11-17 06:21:54"
  },{
    id: 6,
    name: "مباردات شركات ومؤسسات",
    created_at: "2018-11-17 06:21:54"
  }
  ],
  fetching: null,
  error: null
})

/* ------------- Selectors ------------- */

export const CategoriesSelectors = {
  getData: state => state.data
}

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({ fetching: true, error : null})

// successful api lookup
export const success = (state, action) => {
  const { payload } = action
  return state.merge({ fetching: false, error: null,  payload })
}

// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: 'error', payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORIES_REQUEST]: request,
  [Types.CATEGORIES_SUCCESS]: success,
  [Types.CATEGORIES_FAILURE]: failure
})

import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoriesRequest: [],
  subCategoriesRequest: ['cat_id'],
  citiesRequest: [],
  categoriesSuccess: ['payload'],
  subCategoriesSuccess: ['payload'],
  citiesSuccess:['payload'],
  categoriesFailure: null
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  categories: null,
  subCategories:null,
  cities:null,
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
export const catSuccess = (state, action) => {
  const { categories } = action.payload
  return state.merge({ fetching: false, error: null,categories})
}

export const subCatSuccess = (state, action) => {
 const { sub_categories } = action.payload
  return state.merge({ fetching: false, error: null,subCategories:sub_categories})
}

export const citiesSuccess = (state, action) => {
  const { cities } = action.payload
  return state.merge({ fetching: false, error: null,cities:cities})
}
// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: 'error', payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORIES_REQUEST]: request,
  [Types.SUB_CATEGORIES_REQUEST]: request,
  [Types.CITIES_REQUEST]: request,
  [Types.CATEGORIES_SUCCESS]: catSuccess,
  [Types.SUB_CATEGORIES_SUCCESS]: subCatSuccess,
  [Types.CITIES_SUCCESS]: citiesSuccess,
  [Types.CATEGORIES_FAILURE]: failure
})

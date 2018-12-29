import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  categoriesRequest: [],
  subCategoriesRequest: ['cat_id'],
  priceRequest: ['sub_cat_id'],
  citiesRequest: [],
  categoriesSuccess: ['payload'],
  subCategoriesSuccess: ['payload'],
  citiesSuccess:['payload'],
  priceSuccess:['payload'],
  categoriesFailure: null
})

export const CategoriesTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  homeCategories:  [
    {
      id: 4,
      name: "مباردات شركات ومؤسسات",
       created_at : "2018-11-17 06:21:54"
    },
    {
       id :  1 ,
       name : "أيجار",
       created_at : "2018-10-24 09:13:34"
    },
    {
       id :  2 ,
       name : "بيع",
       created_at : "2018-10-24 09:13:34"
    },
    {
        id :  5 ,
        name : "مقيم عقارات",
       created_at : "2018-11-17 06:21:19"
    },
    {
        id :  3 ,
        name : "عرض وسطاء عقارات",
       created_at : "2018-11-17 06:20:42"
    },
    {
        id :  4 ,
        name : "عروض شركات و مؤسسات",
       created_at : "2018-11-17 06:20:42"
    },
    {
        id :  2 ,
        name : " عرض مباشر من المالك",
       created_at : "2018-10-25 09:47:37"
    }
  ],
  categories:null,
  subCategories:null,
  price:null,
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
  console.warn(categories)
  return state.merge({ fetching: false, error: null,categories})
}

export const subCatSuccess = (state, action) => {
 const { sub_categories } = action.payload
  return state.merge({ fetching: false, error: null,subCategories:sub_categories})
}
export const priceSuccess = (state, action) => {
  const { price } = action.payload
   return state.merge({price,fetching: false})
 }


export const citiesSuccess = (state, action) => {
  const { cities } = action.payload
  console.warn(cities)
  return state.merge({ fetching: false, error: null,cities})
}
// Something went wrong somewhere.
export const failure = state =>
  state.merge({ fetching: false, error: 'error', payload: null })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CATEGORIES_REQUEST]: request,
  [Types.PRICE_REQUEST]: request,
  [Types.SUB_CATEGORIES_REQUEST]: request,
  [Types.CITIES_REQUEST]: request,
  [Types.CATEGORIES_SUCCESS]: catSuccess,
  [Types.SUB_CATEGORIES_SUCCESS]: subCatSuccess,
  [Types.CITIES_SUCCESS]: citiesSuccess,
  [Types.PRICE_SUCCESS]: priceSuccess,
  [Types.CATEGORIES_FAILURE]: failure
})

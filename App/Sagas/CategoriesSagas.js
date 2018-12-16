import { call, put } from 'redux-saga/effects'
import CategoriesActions from '../Redux/CategoriesRedux'
// import { CategoriesSelectors } from '../Redux/CategoriesRedux'

export function * getCategories (api,{}) {

  const response = yield call(api.getCategories)
  if (response.ok) {
          response.data.categories.push({id:3,name:'اخرى'})
      yield put(CategoriesActions.categoriesSuccess(response.data))
    }
    else yield put(CategoriesActions.categoriesFailure())
  }


export function * getCities (api,{}) {
  const response = yield call(api.getCities)
  if (response.ok) {
   response.data.cities.push({id:0,city:'غير محدد',created_at:'undefined'})
   yield put(CategoriesActions.citiesSuccess(response.data))
  } else {
    yield put(CategoriesActions.categoriesFailure())
  }
}


export function *  getSubCategories(api, {cat_id}) {


  const response = yield call(api.getSubCategories,cat_id)
  if (response.ok) {
    yield put(CategoriesActions.subCategoriesSuccess(response.data))
  } else {
    yield put(CategoriesActions.categoriesFailure())
  }

}

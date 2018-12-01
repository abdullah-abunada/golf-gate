import { call, put } from 'redux-saga/effects'
import CategoriesActions from '../Redux/CategoriesRedux'
// import { CategoriesSelectors } from '../Redux/CategoriesRedux'

export function * getCategories (api) {
  // get current data from Store
  // const currentData = yield select(CategoriesSelectors.getData)
  // make the call to the api

  const response = yield call(api.getcategories,null)
  console.log('calleeeeeeeeeeedd from saga')
  if (response.ok) {
    console.log(response.data)

    yield put(CategoriesActions.categoriesSuccess(response.data))
  } else {
    yield put(CategoriesActions.categoriesFailure())
  }
}

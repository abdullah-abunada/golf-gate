import { call, put } from 'redux-saga/effects'
import CategoriesActions from '../Redux/CategoriesRedux'
// import { CategoriesSelectors } from '../Redux/CategoriesRedux'

export function * getCategories (api,{}) {

  const response = yield call(api.getCategories)
  if (response.ok) {
    const directCat = yield call(api.getDirecteCategories)
    if(directCat.ok){
      //merge sub categories with categories
      const { sub_categories } = directCat.data
          sub_categories.map((item) => {
          item.id =  item.sub_category_id
          item.name = item.sub_category
          item.isSub = true
          response.data.categories.push(item)
      })
      yield put(CategoriesActions.categoriesSuccess(response.data))
    }
    else yield put(CategoriesActions.categoriesFailure()) 
  } else {
    yield put(CategoriesActions.categoriesFailure())
  }
}

export function * getCities (api,{}) {
  const response = yield call(api.getCities)
  if (response.ok) {
   response.data.cities.push({id:0,name:'غير محدد'})
   console.warn(response.data.cities)
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

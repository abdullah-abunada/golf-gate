import { combineReducers } from 'redux'
import createStore from './createStore'
import rootSaga from '../Sagas/'


/* ------------- Assemble The Reducers ------------- */
export const reducers = combineReducers({
  auth: require('./AuthRedux').reducer,
  categories : require('./CategoriesRedux').reducer
  
})

export default () => {
  
  let { store, sagasManager, sagaMiddleware } = createStore(reducers, rootSaga)

  return store
}

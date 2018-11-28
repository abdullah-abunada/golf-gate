import { takeEvery, all } from 'redux-saga/effects'
import FixtureAPI from '../Services/FixtureApi'

/* ------------- Types ------------- */
import { LoginTypes } from '../Redux/LoginRedux'

// ignite-jhipster-saga-redux-import-needle

/* ------------- Sagas ------------- */
import { login} from './LoginSagas'



/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = FixtureAPI

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeEvery(LoginTypes.LOGIN_REQUEST, login, FixtureAPI)
  ])
}

// a library to wrap and simplify api calls
import apisauce from 'apisauce'


// our "constructor"
const create = () => {

  const baseURL='http://bawabetelkhaleg.com/'

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache'
    },
    // 10 second timeout...
    timeout: 10000
  })

  
  const setAuthToken = (token) => api.setHeader('Authorization',token)
  const removeAuthToken = () => api.setHeader('Authorization', '')
  const login = (authObj) => api.post('api/user/login', authObj)
  const register = (authObj) => api.post('api/user/register', authObj)
  const logout =()=> api.get('api/logout')

  const contactUs = (obj) => api.post('api/contact_us', obj)

  const getCategories =()=> api.get('api/categories')
  const getSubCategories =(cat_id)=> api.get('api/subcategories/category_id='+cat_id)
  const getCities =()=> api.get('api/cities')

  const getad =()=> api.get('api/categories')

  const addAd = (obj) => api.post('api/advertisement/add', obj)

  return {
    // a list of the API functions from step 2
    login,register,setAuthToken,removeAuthToken,logout,
    getCategories,getSubCategories,getCities,
    getad,addAd,
    contactUs
  }
}

// let's return back our create method as the default.
export default {
  create
}

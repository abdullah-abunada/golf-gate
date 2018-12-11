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
  const report = (obj) => api.post('api/report', obj)

  const getCategories =()=> api.get('api/categories')
  const getDirecteCategories =()=> api.get('api/direct_subcategories')
  const getSubCategories =(cat_id)=> api.get('api/subcategories/category_id='+cat_id)
  const getCities =()=> api.get('api/cities')
  
  //const getad =(params)=> api.get('api/get/advertisement/for/sub_category='+2+'&city_id='+0+'&page='+1)
 
  const getad =(params)=> api.get('api/get/advertisement/for/sub_category='+params.sub_category+'&city_id='+params.city_id+'&page='+params.page)
  const getMyAds =(params)=> api.get('api/get/advertisement/for/user/user_id='+2+'&&page=1')
  const adminAdsRequest =()=> api.get('api/get/admin_ads')
  const addAd = (obj) => api.post('api/advertisement/add', obj)
  
  return {
    // a list of the API functions from step 2
    login,register,setAuthToken,removeAuthToken,logout,
    getCategories,getSubCategories,getCities,getDirecteCategories,
    getad,addAd,adminAdsRequest,getMyAds,
    contactUs
  }
}

// let's return back our create method as the default.
export default {
  create
}

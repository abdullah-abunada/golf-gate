export default {
    // Functions return fixtures
  
    // entity fixtures
  
    login: (authObj) => {       
        if (authObj.username === 'user' && authObj.password === 'user') {
          return {
            ok: true,
            data: require('../Fixtures/login.json')
          }
        } else {
          return {
            ok: false,
            status: 400,
            data: 'Invalid credentials'
          }
        }


      
    }
  }
  
var initdata = {
  isModaldata : {
    bool : false,
    url : ''
  },
  loading : false,
  
  isLogin:false,
  token:null,
  livecasino_images: null,
  casino_images: null,
  virtual_images: null,
  poker_images: null,
  cockfight_images: null,
}
export const login = (state = initdata, action) => {
  switch (action.type) {
    case "LOGIN_WITH_JWT":{
      return { ...state, token:action.token, isLogin:true }
    }
    case "LOGOUT_WITH_JWT":{
      return { ...state, token:null, isLogin:false }
    }
    case "SETLOGINPAGE" :{
      return { ...state, setloginpage : action.payload}
    }
    case "IPLOCATION" :{
      return { ...state, iplocation : action.payload}
    }

    case "PAYDEPOSIT":{
      return {...state, isModaldata : action.data}
    }
    case "FORGOTPASSWORD" :{
      return {...state, forgotpasswordemail : action.data}
    }
    case "HOMEPAGELOADIN" :{
      return {...state, loading : action.data}
    }
    default: {
      return state
    }
  }
}

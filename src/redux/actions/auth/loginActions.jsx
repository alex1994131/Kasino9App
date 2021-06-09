import io from 'socket.io-client';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, Root} from "../../../constants";
import { AXIOS_REQUEST,sessioninfor,sessionset,fakesession } from "./index";



export const session_checking = (token) =>{
  return async(dispatch) =>{
    console.log('***********  session_checking ***********');
    let userInfo = await AXIOS_REQUEST("users/get_user_auth",{token},dispatch);
    if (token&&userInfo.status) {
      dispatch({ type : "PROFILE_USER", data:userInfo.data })
      console.log(userInfo,"----------------")

      Root.socket.emit("setsession", {token});

      Root.socket.on("destory",(dd)=>{
        console.log("---- login expred----");
        dispatch({type:"LOGOUT_WITH_JWT"});
        Root.socket.disconnect();
      });

      Root.socket.on("expiredestory",(data)=>{
        if (data.data.email === userInfo.data.email) {
          console.log("----expred----");
          Actions.push('/');
        } 
      });

      Root.socket.on("balance",(barray)=>{
        if (barray.data) {
          console.log(barray.data )
          dispatch({ type:"GETBALANCE",  data:barray.data });
        }
      });
    } else {
      Root.socket.disconnect();
      dispatch({type:"LOGOUT_WITH_JWT"});
    }
  }
}

export const session_setting = () =>{
  return async dispatch =>{
    let token  = await sessioninfor();
    if (token) {
      dispatch({ type : "LOGIN_WITH_JWT", token });
      dispatch(session_checking(token));
    }
  }
}

export const loginWithJWT = user => {
  return async(dispatch) => {
    let rdata = await AXIOS_REQUEST("users/login",{username: user.email,password: user.password}, dispatch);
    if(rdata.status){
      let token = rdata.data;
      await sessionset(token);
      dispatch({ type : "LOGIN_WITH_JWT", token });
      dispatch(session_checking(token));
        Actions.push('/');
      // }
    }else{
      alert(rdata.error);
    }
  }
}

export const logoutWithJWT = () => {
  return async dispatch => {
    await AXIOS_REQUEST("users/logout",{},dispatch);
    await fakesession();
    dispatch({type : "LOGOUT_WITH_JWT"});
    Actions.push('/');
    // if(Root.socket){
    //   Root.socket.disconnect();
    // }
  }
}

export const setloginpage = (data)=>{
  return dispatch=>{
    dispatch({
      type : "SETLOGINPAGE",
      payload : data
    })
  }
}

export const load_fp_data = () => {
  return async(dispatch) => {
   var rdata =await AXIOS_REQUEST("firstpage/load_data", {}, dispatch);
      if (rdata.status === true) {
        return dispatch({
          type:"FIRSTPAGEDATA",
          data:rdata.data
        })
      }else{
      }
  }
}

export const firstpage_gamelist = () =>{
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("firstpage/firstpage_gamelist",{}, dispatch);
    if(rdata.status){
      dispatch({type : "FIRSTPAGEGAMELIST",data : rdata.data});
    }
  }  
}


export const socket_connect = () =>{
  return (dispatch)=>{
    Root.socket = io(Root.admindomain);
    return true;
  }
}

export const first_slider_load = () =>{
  return async dispatch =>{
    let rdata = await AXIOS_REQUEST("firstpage/firstpage_slider",{},dispatch);
    if(rdata.status){
      dispatch({type : "FIRSTPAGESLIDER",data : rdata.data});
    }
  }  
}

export const playsaccount = (gamedata) =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST("players/gameaccount",{game : gamedata, width:LAYOUT.window.width},dispatch);
    if(rdata.status){
      var token = rdata.data.token;
      var url = rdata.data.url;
      dispatch({
        type : "GAME_PLAYER",
        gamedata : gamedata,
        gameurl : url,
        Ratio : 16/11,
        state : true,
        token : token,
        mode : "real"
      })
      Actions.GamePlayScreen();
    }else{
      if(rdata.bool === 1)
      {
        alert(rdata.data);
        Actions.push("DepositPage");
      }else{
        alert(rdata.data);
      }
    }
  }
}

export const playsaccountguest = (gamedata) =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("players/guestgameaccount",{game : gamedata,width:LAYOUT.window.width},dispatch);
    if(rdata.status){
      var url = rdata.data;
      dispatch({
        type : "GAME_PLAYER",
        gamedata : gamedata,
        gameurl : url,
        Ratio : 16/11,
        state : true,
      })
      Actions.GamePlayScreen();
    }else{
    }
  }
}

export const registeraction = user =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST('users/register',{user}, dispatch)
    if(rdata.status){
      alert("success");
      Actions.push("/")
    }else{
      alert(rdata.data)
    }
  }
}



export const emailverify_receive = data =>{
  return async(dispatch) =>{
    var rdata = await AXIOS_REQUEST('users/emailverify_receive',{data}, dispatch)
    if(rdata.status){
      toast.success("success");
      window.location.assign("/emailverify/:verify");
      // dispatch({type : "PROFILE_USER", data : rdata.detail});
    }else{
      toast.warn(rdata.data);
      window.location.assign("/")
    }
  }
}

export const forgotpassword_send = data =>{
  return async(dispatch)=>{
    var rdata = await AXIOS_REQUEST('users/forgotpassword_send',{email : data.email}, dispatch)
    if(rdata.status){
      alert("Please check your eamil");
      Actions.push("/");
    }else{
      alert("success");
    }
  } 
}

export const forgotpassword_receive = data =>{
  return async dispatch=>{
    var rdata = await AXIOS_REQUEST('users/forgotpassword_receive',{data : data}, dispatch)
    if(rdata.status){
      toast.success("success");
      dispatch({
        type : "FORGOTPASSWORD",
        data : rdata.data
      })
    }else{
      toast.error("server error");
      // window.location.assign("/")
    }
  } 
}

export const resend_email = data =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("users/resend_email",{email : data}, dispatch);
    if(rdata.status){
      alert("success");
      Actions.push("/")
      // history.push("/")
    }else{

    }
  }
}

export const forgotpassword_set = data =>{
  return async dispatch =>{
    var rdata = await AXIOS_REQUEST("users/forgotpassword_set",{data : data}, dispatch);
    if(rdata.status){
      toast.success("success");
      window.location.assign("/");
    }else{
      toast.error("server error")
    }
  }
}
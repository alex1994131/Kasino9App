import { AXIOS_REQUEST } from "../auth/index"

export const ProfileSave = reqData =>{
    return async (dispatch) =>{
        var response = await AXIOS_REQUEST("profile/profilesave",reqData, dispatch);
        if(response.status){
            alert("successfully changed.");
            dispatch({type:'PROFILE_USER', data:response.data})
        }else{
        }
    }
}


export const GetUserInfor = user => {
    return async(dispatch) => {
        var response = await AXIOS_REQUEST("users/get_userinfor", { user }, dispatch);
        if (response.status) {
            return dispatch({ type: "PROFILE_USER", data: response.data })
        } else {
        }
    }
}

export const SaveUserInfor = reqData => {
    return async(dispatch) => {
        var response = await AXIOS_REQUEST("profileinfo/adminuserSave", reqData, dispatch);
        if (response.status) {
            return dispatch({ type: "PROFILE_USER", data: response.data })
        } else {
        }
    }
}

export const getDocuments = () =>{
    return async (dispatch) =>{
        var response = await AXIOS_REQUEST("profile/get_document",{}, dispatch);
        if(response.status){
            dispatch({ type: "DOCUMENT_DATA", data: response.data });
        }else{
        }
    }
}

export const documentUpload = reqData=>{
    return async (dispatch) =>{
        var response = await AXIOS_REQUEST("profile/set_document", reqData, dispatch);
        if(response.status){
            dispatch({ type: "DOCUMENT_DATA", data: response.data });
        }else{
        }
    }
}

export const ReportsEmailLoad = (reqData) => {
    return  async(dispatch) => {
        var rdata = await AXIOS_REQUEST("reports/reports_email_load",reqData, dispatch);
        if(rdata.status){
            dispatch({ type: "REPORT_CASINO_DATA", data: rdata.data })
        }else{
        }
    }
}

export const changepassword =(user) =>{
    return async(dispatch) =>{
      var rdata = await AXIOS_REQUEST("users/adminchangepassword",{user}, dispatch);
      if(rdata.status){
        alert("successfully changed");
      }else{
      }
    }
}


export const Againregister = (user) => {
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("users/againusersave", { user: user }, dispatch);
        if (rdata.status) {

        } else {
        }

    }
}


export const set_depositlimit = (data) =>{
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("profile/get_depositlimit",{data : data}, dispatch);
        if(rdata.status){
            dispatch({type : "DEPOSIT_LIMIT",payload : rdata.data})
        }else{
        }
    }
}

export const get_depositlimit = (data) =>{
    return async(dispatch) => {
        var rdata = await AXIOS_REQUEST("profile/get_depositlimit",{data : data}, dispatch);
        if(rdata.status){
            dispatch({type : "DEPOSIT_LIMIT",payload : rdata.data})
        }else{
        }
    }
}

export const set_notification = (data) =>{
    return async(dispatch) =>{
        var rdata = await AXIOS_REQUEST("profile/set_notification",{data : data}, dispatch);
        if(rdata.status){
            alert("successfully changed");
            return dispatch({ type : "NOTIFICATION_DATA", data : rdata.data })
        }else{
        }
    }
}

export const get_notification = (data) =>{
    return async(dispatch ,getState)=>{
        var rdata = await AXIOS_REQUEST("profile/get_notification",{data : data}, dispatch);
        if(rdata.status){
            return dispatch({type : "NOTIFICATION_DATA", data : rdata.data})
        }else{
        }
    }
}
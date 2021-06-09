import {AXIOS_REQUEST,set_page} from "../auth/index"
import { Actions } from 'react-native-router-flux';

export const PaymentMenuload = (params) => {
    return  async (dispatch,getState) => {
        var data = getState().profile.userInfo.email;
        params['email'] = data;
        var rdata = await AXIOS_REQUEST("paymentGateWay/menuloads",params, dispatch)
        if(rdata.status){
            dispatch({ type: "PAYMENTMENU_DATA", data: rdata.data })
        }else{
            var bool = rdata.data.bool;
            switch(bool){
            case 1 :
                alert("Already withdrawl");
                dispatch({ type: "PAYMENTMENU_DATA",})
                break;
            case 2 :
                alert("You must verify Email for your withdrawl");
                Actions.push("emailverifysend",data);
                // history.push({ pathname:"/emailverifysend",state : {data : data}});
                break;
            case 3 : 
                alert("fail")
                dispatch({ type: "PAYMENTMENU_DATA",})
                break;
            case 4 : 
                alert("You must verify kyc for your withdrawl");
                Actions.push("ProfileInfoScreen",{data : 1});
                // history.push({ pathname:"/myprofile/profile-info",state : {data : "2"}});    
                break;
            default : 
                alert("fail");
                dispatch({ type: "PAYMENTMENU_DATA",})
            break;
            }
        }
    }
}

export const paymentMethodLoad = (params) => {
    return  async (dispatch,getState) => {
        var data = getState().profile.userInfo.email;
        params['email'] = data;
        var rdata = await AXIOS_REQUEST("paymentGateWay/paymentMethodLoad",params,dispatch)
        if(rdata.status){
            dispatch({ type: "PAYMENTMETHOD_DATA", data: rdata.data })
        }else{
            // alert("fail")
        }
    }
}

export const YaarPayWithdraw = row => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/YaarPayWithdraw",row, dispatch)
          if(rdata.status){
              toast.success(rdata.data);   
          }else{
              alert(rdata.data);   
          }
    }
}

export const netcentsResults = order_no => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/netcentsResults",{order_no}, dispatch)
          if(rdata.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: rdata.data })
          }else{
              alert(rdata.data);   
          }
    }
}

export const QpayResults = order_no => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/QpayResults",{order_no},dispatch)
          if(rdata.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: rdata.data })
          }else{
              alert(rdata.data);   
          }
    }
}

export const YaarPayResults = order_no => {
    return  async(dispatch) => {
      var rdata = await AXIOS_REQUEST("paymentGateWay/YaarResults",{order_no})
          if(rdata.status){
              dispatch({ type: "PAYMENT_RESULTS_DATA", data: rdata.data })
          }else{
              alert(rdata.data);   
          }
    }
}

export const netcentCheckOut = (row)=>{
    return async dispatch=>{
        var rdata =  await AXIOS_REQUEST("paymentGateWay/netcentCheckOut",{data : row},dispatch)        
        if(rdata.status){
            window.location.href = rdata.data;
        }else{
            alert(rdata.data);   
        }
    }
}

export const QpayCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            alert('email undefined');   
        }else{
            var rdata = await AXIOS_REQUEST("paymentGateWay/QpayCheckOut",{params},dispatch)
                if(rdata.status){
                    dispatch({ type: "PAYMENTGATEWAY_QPAY_CHEKOUT_DATA", data: rdata });
                }else{
                    alert(rdata.data);   
                }
        }
    }
}

export const YaarPayCheckOut = params => {
    return  async(dispatch) => {
        if(!params.email){
            alert('email undefined');   
        }else{
            var rdata = await AXIOS_REQUEST("paymentGateWay/YaarPayCheckOut",{params},dispatch)
                if(rdata.status){
                    dispatch({ type: "PAYMENTGATEWAY_YAARPAY_CHEKOUT_DATA", data: rdata });
                }else{
                    alert(rdata.data);   
                }
        }
    }
}


export const transactionHistoryLoad = (params) => {
    return  async(dispatch) => {
        var rdata = await AXIOS_REQUEST("paymentGateWay/deposittransactionHistoryLoad",{params},dispatch)
        if(rdata.status){
            dispatch({ type: "TRANSACTION_HISTORY_DATA", data: rdata.data })
        }else{
            // alert(rdata.data);   
        }
    }
}


export const pagenationchange = (params)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().paymentGateWay.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages']
      dispatch({
        type:"TRANSACTION_HISTORY__GET_DATA",
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
  }
  

export const WithdrawHistoryLoad = (data) => {
    return  async(dispatch) => {
        var rdata = await AXIOS_REQUEST("paymentGateWay/WithdrawHistoryLoad",data,dispatch)
        if(rdata.status){
            dispatch({ type: "WITHDRAW_HISTORY_DATA", data: rdata.data })
        }else{
            // alert(rdata.data);   
        }
    }
}

export const Withdrawpagenationchange = (params)=>{
    return (dispatch,getState)=>{
      var row = {
        data : getState().paymentGateWay.allData
      }
      var rows =  set_page(params,row)
      var fdata = rows['fdata'];
      var totalPages = rows['totalPages']
      dispatch({
        type:"WITHDRAW_HISTORY__GET_DATA",
        data: fdata,
        totalPages:totalPages,
        params
      })
    }
  }


export const Cash_payout = (params) =>{
    return async (dispatch) =>{
        var start =   new Date();
        var end =  new Date(new Date().valueOf() + 86400000);
        var rdata = await AXIOS_REQUEST("paymentGateWay/cashpayout", {params, start, end}, dispatch);
        if(rdata.status){
            alert("succesfully")
            dispatch({type: "WITHDRAW_HISTORY_DATA", data : rdata.data});
        }else{

        }
    }
}

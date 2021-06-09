import { AXIOS_REQUEST } from "../auth/index"
import { Actions } from 'react-native-router-flux';

export const Bonusmenuload = (type,email) =>{
    return async (dispatch) =>{
        var rdata = await AXIOS_REQUEST("promotions/bonus_menuloads",{type,email}, dispatch);
        if(rdata.status){
            dispatch({ type: "PROMOTIONS_BONUS_DATA", payload: rdata.data });
        }else{
            alert(rdata.data);   
        }
    }
}

export const Claim_request = (data) =>{
    return async ()=>{
        var rdata = await AXIOS_REQUEST("promotions/Claim_request",{data : data}, dispatch);
        if(rdata.status){
            alert('Success')
        }else{

        }
    }
}
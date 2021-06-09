import { Root, token, LAYOUT } from "../../../constants"
import axios from "axios";
import AsyncStorage from '@react-native-community/async-storage';
const BASEURL = Root.apiurl

export const sessioninfor = async ()=>{
	let data = await AsyncStorage.getItem(token);
    return data;
}

export const sessionset = async (string) =>{
	axios.defaults.headers.common['authorization'] = string;
	await AsyncStorage.setItem(token,string);
	return true;
}

export const fakesession = async () => {
	axios.defaults.headers.common['authorization'] = undefined;
	let data = await AsyncStorage.removeItem(token);
    return data;
}


// export const instance = axios.create({
//     baseURL: Root.apiurl,
//     timeout: 500000,
//     headers: {
// 		authorization: encodeURIComponent(await sessioninfor()),
// 		"Content-Type": "application/json",
// 		device : LAYOUT.window.width,
// 		"user-device" : "mobile"
//     },
// });


export const validateUsername = (fld) =>{
	var error = "";
	if (fld === "") {
		error = "You didn't enter a username.\n";
		toast.error(error);
		return false;
	} 
	else {
	}
	return true;
}

export const validateEmail = (fld) =>{
	var error = "";
	if (fld === "") {
		error = "You didn't enter a username.\n";
		toast.error(error);
		return false;
	} 
	else if(fld.indexOf("@") !== -1){
		var mails = fld.split("@");
		var f1 = mails[1].includes(mails[0]);
		var f2 = mails[0].includes(mails[1]);
		if(f1 || f2){
			toast.error("Please enter correct email.");
			return false
		}else{
			return true;
		}
	}else{
		return true;
	}
}

export const validateEmail1 = (fld) =>{
	var error = "";
	if (fld === "") {
		error = "You didn't enter a username.\n";
		toast.error(error);
		return false;
	} 
	else if(fld.indexOf("@") !== -1){
		var mails = fld.split("@");
		var f1 = mails[1].includes(mails[0]);
		var f2 = mails[0].includes(mails[1]);
		if(f1 || f2){
			toast.error("Please enter correct email.");
			return false
		}else{
			return true;
		}
	}else{
		return false;
	}
}


export const get_betsdata = () =>{
	try{
		var data  =	AsyncStorage.getItem("sattadata");
	   if(data){
		   return JSON.parse(data);
	   }else{
		   return {}
	   }
	}catch(e){
		return {}
	}
}

export const AXIOS_REQUEST = async (url,inputdata,dispatch,loading) =>{
	try{
		var Response =  await axios.create({
			baseURL: Root.apiurl,
			timeout: 500000,
			headers: {
				authorization: encodeURIComponent(await sessioninfor()),
				"Content-Type": "application/json",
				device : LAYOUT.window.width,
				"user-device" : "app"
			},
		}).post( url, inputdata );
		if(Response.data){
			if(Response.data.session){
				console.log("-------------session destroy ----------------")
				Root.socket.disconnect();
				dispatch({type : "LOGOUT_WITH_JWT"})
			}else{
				return Response.data
			}
		}else{
			return {status : false,error : "error"}
		}
	}catch(e){
		return {status : false,error : "error"}
	}
}

export const AXIOS_REQUEST_PAY = async(url, inputdata) => {
    var Response = await axios.post(BASEURL + url, inputdata)
    if (Response.data) {
        return Response.data
    } else {
        return { status: false, data: "error" }
    }
}
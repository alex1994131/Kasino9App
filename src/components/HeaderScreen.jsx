import React from 'react';
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Header, Button, Right, Left } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR, Root } from "../constants";

class HeaderScreen extends React.Component{
  render(){
    const { firstpage, isLogin, balance, userInfo } = this.props;
    return(
      <Header style={styles.container}>
        <Left>
          <TouchableOpacity onPress={()=>Actions.push('/')}>
            <Image source={{uri :firstpage.logoimg ? Root.imageurl + firstpage.logoimg : null}} style={styles.image}/>
          </TouchableOpacity>
        </Left>
        {
          isLogin?(
            <Right style={{alignItems:'center'}}>
              <Button 
                style={[styles.loginButton, {backgroundColor:COLOR.loginColor, width:LAYOUT.window.width*0.19}]} 
                onPress={()=>Actions.push('DepositScreen')}
              >
                <Text style={styles.text}> DEPOSIT </Text>
              </Button>
              <View style={styles.money}>
                <Text style={styles.moneyText}>{balance?.balance?parseInt(balance.balance):0}{" INR"}</Text>
              </View>
              <TouchableOpacity style={{alignItems:'center'}} onPress={()=>Actions.MyPageScreen()}>
                {userInfo&&userInfo.avatar?
                  <Image source={{uri:Root.imageurl + userInfo.avatar}} style={styles.avatar}></Image>:
                  <Image source={require('../assets/avatar.png')} style={styles.avatar}></Image>
                }
              </TouchableOpacity>
            </Right>
          ):(
            <Right>
              <TouchableOpacity style={styles.signUpButton} onPress={()=>Actions.SignUpScreen()}>
                <Text style={styles.text}> JOIN US </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginButton} transparent onPress={()=>Actions.SignInScreen()}>
                <Text style={styles.text}> SIGN IN </Text>
              </TouchableOpacity>
            </Right>
          )
        }
      </Header>
    )
  }
}

const load_data = (state) =>{
  return {
    isLogin : state.auth.login.isLogin,
    userInfo : state.profile.userInfo,
    balance : state.balance.balance,
    firstpage : state.auth.register,
	}
}

export default connect(load_data, {})(HeaderScreen);

const styles = StyleSheet.create({
  container : {
    backgroundColor:COLOR.headerColor,
    height:LAYOUT.window.height*0.083,
    padding:LAYOUT.window.width*0.01,
    alignItems:'center',
    justifyContent:'flex-start'
  },
  image:{
    width:LAYOUT.window.width*0.35, 
    height:'100%',
  },
  avatar:{
    width:LAYOUT.window.width*0.06,
    height:LAYOUT.window.width*0.06,
    marginRight:LAYOUT.window.width*0.01,
    borderRadius:LAYOUT.window.width*0.07
  },  
  loginButton:{
    width:LAYOUT.window.width * 0.23,
    height:LAYOUT.window.height * 0.045,
    backgroundColor:COLOR.redColor,
    borderRadius:LAYOUT.window.width*0.01,
    marginLeft:LAYOUT.window.width*0.02,
    alignItems:'center',
    justifyContent:'center',
  },
  signUpButton:{
    width:LAYOUT.window.width * 0.23,
    height:LAYOUT.window.height * 0.045,
    backgroundColor:COLOR.greenColor,
    borderRadius:LAYOUT.window.width*0.01,
    justifyContent:'center',
    alignItems:'center',
  },
  text:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03
  },
  money:{
    marginLeft:LAYOUT.window.width*0.01,
    marginRight:LAYOUT.window.width*0.01
  },
  moneyText:{
    color:COLOR.greyColor,
    fontSize:LAYOUT.window.width*0.035,
    fontWeight:'bold',
    padding:5
  }
})


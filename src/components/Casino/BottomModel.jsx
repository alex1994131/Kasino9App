import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR } from "../../constants";
import { Root } from "../../constants";
import { playsaccount,playsaccountguest } from "../../redux/actions/auth/loginActions"

class BottomModel extends React.Component {

    
  realPlay(){
    if(!this.props.isLogin){
      Actions.SignInScreen();
      this.setState({isVisible : false});
    }else{
      this.props.playsaccount(this.props.selectedItem);
      this.setState({isVisible : false});
    }
  }

  PracticerealPlay(){
    this.props.playsaccountguest(this.props.selectedItem)
  }

    render(){
      // let limits = this.props.selectedItem.WITHOUT;
      let limits = null;
        if(this.props.isVisible){
            return (
                <View style={BottomModelStyle.modal}>
                    <View style={BottomModelStyle.bottom}>
                        <View style={BottomModelStyle.close}>
                            <TouchableOpacity onPress={()=>this.props.setIsVisible()}>
                              <FontAwesome name="close" style={BottomModelStyle.closeIcon} size={LAYOUT.window.width*0.04} color={COLOR.orangeColor} />
                            </TouchableOpacity>
                        </View>
                        <View  style={BottomModelStyle.open}>
                          {/* {
                            this.props.type==='LiveCasino'?
                            <Text style={BottomModelStyle.amountText}>
                              INR {this.props.selectedItem.WITHOUT.min && this.props.selectedItem.WITHOUT.min > 50  ?this.props.selectedItem.WITHOUT.min : Minbet } -  {this.props.selectedItem.WITHOUT.max && this.props.selectedItem.WITHOUT.max > Minbet  ?this.props.selectedItem.WITHOUT.max : Maxbet }

                              </Text>
                            :null
                          } */}
                            <Image 
                                source={{uri : this.props.selectedItem.image.indexOf('http') > -1 ? this.props.selectedItem.image : Root.imageurl + this.props.selectedItem.image}} 
                                style={BottomModelStyle.selectedImage}
                            />
                            <View style={BottomModelStyle.selectedItem}>
                                <Text style={BottomModelStyle.selectedName}>{this.props.selectedItem?this.props.selectedItem.NAME:null}</Text>
                            </View>
                            <View style={BottomModelStyle.selectedTypes}/>
                            {
                               this.props.isLogin ? (
                                  <>
                                    {/* {
                                      this.props.type ==='LiveCasino' && limits && limits.limits && limits.limits.length > 0 ? 
                                          limits.limits.map((item,key)=>(
                                            <View style={BottomModelStyle.selectedTypes} key={key}>
                                              <TouchableOpacity style={BottomModelStyle.LoginButton} onPress={()=>this.realPlay(item)}>
                                                  <Text style={BottomModelStyle.LoginButtonText}> 
                                                    INR {item.limitMin && item.limitMin > 50  ?item.limitMin : Minbet } -  {item.limitMax && item.limitMax > Minbet  ?item.limitMax : Maxbet }
                                                  </Text>
                                              </TouchableOpacity>
                                            </View> 
                                          ))
                                        :  */}
                                          <View style={BottomModelStyle.selectedTypes}>
                                              <TouchableOpacity style={BottomModelStyle.LoginButton} onPress={()=>this.realPlay()}>
                                                  <Text style={BottomModelStyle.LoginButtonText}> 
                                                  PLAY FOR REAL
                                                  </Text>
                                              </TouchableOpacity>
                                            </View>
                                    {/* } */}
                                  </>
                                ) : (
                                  <>
                                    <View style={BottomModelStyle.selectedTypes}>
                                      <TouchableOpacity style={BottomModelStyle.LoginButton} onPress={()=>Actions.push('SignInScreen')}>
                                        <Text style={BottomModelStyle.LoginButtonText}> Sign In for real play </Text>
                                      </TouchableOpacity>
                                    </View>
                                  </>
                                )
                            }
                             {
                                this.props.type!=='LiveCasino'?
                                  <View style={BottomModelStyle.selectedTypes}>
                                      <TouchableOpacity style={BottomModelStyle.playButton} onPress={()=>this.PracticerealPlay()}>
                                          <Text style={BottomModelStyle.playBottonText}> Practice </Text>
                                      </TouchableOpacity>
                                  </View>:null
                              }
                            {/* <View style={BottomModelStyle.selectedTypes}>
                              <TouchableOpacity style={BottomModelStyle.playButton} onPress={()=>Actions.push('SignUpScreen')}>
                                  <Text style={BottomModelStyle.playBottonText}> Sign Up </Text>
                              </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                </View>
            );
        }else{
            return(
                <View/>
            )
        }
    }
}
const load_data = (state) =>{
  return {
    isLogin : state.auth.login.isLogin,
  }
}

export default connect(load_data,{playsaccount, playsaccountguest})( BottomModel );



const BottomModelStyle = StyleSheet.create({
  modal:{
    width:'100%',
    height:'100%',
    backgroundColor:COLOR.baseBackgroundOBColor,
    position:'absolute'
  },
  bottom:{
    borderTopLeftRadius:LAYOUT.window.height*0.04,
    borderTopRightRadius:LAYOUT.window.height*0.04,
    marginTop:LAYOUT.window.height*0.35,
    height:LAYOUT.window.height*0.65,
    width:'100%',
    backgroundColor:COLOR.headerColor
  },
  close:{
    borderTopRightRadius:LAYOUT.window.height*0.04,
    borderTopLeftRadius:LAYOUT.window.height*0.04,
    paddingRight:LAYOUT.window.height*0.03,
    height:LAYOUT.window.height*0.065,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  selectedImage:{
    width:LAYOUT.window.width * 0.85,
    height:LAYOUT.window.height * 0.38,
    borderRadius:LAYOUT.window.width*0.03,
    justifyContent:'center',
    alignItems:'center'
  },
  amountText:{
    position:'absolute',
    zIndex:1,
    left:LAYOUT.window.width*0.1,
    top:LAYOUT.window.height*0.01,
    backgroundColor:COLOR.baseBackgroundOW1Color,
    paddingHorizontal:LAYOUT.window.width*0.01,
    borderRadius:LAYOUT.window.width*0.05,
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.025,
    fontWeight:'500',
    textAlign: "center",
},
  selectedName:{
    fontSize:LAYOUT.window.width*0.03,
    color:COLOR.whiteColor,
    fontWeight:'bold',
  },
  selectedItem:{
    marginTop:LAYOUT.window.height * 0.34,
    height:LAYOUT.window.height * 0.04,
    position:'absolute',
    alignItems:'center',
    padding:LAYOUT.window.width*0.01,
    width:LAYOUT.window.width * 0.85,
    borderBottomLeftRadius:LAYOUT.window.width*0.03,
    borderBottomRightRadius:LAYOUT.window.width*0.03,
    backgroundColor:COLOR.baseBackgroundOWColor
  },
  selectedTypes:{
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      padding:LAYOUT.window.width*0.01
  },
  LoginButton:{
    backgroundColor:COLOR.greenColor,
    borderRadius:LAYOUT.window.width*0.02,
    padding:LAYOUT.window.width*0.013,
    width:LAYOUT.window.width*0.7,
    margin:LAYOUT.window.width*0.01,
    alignItems:'center',
    justifyContent:'center',
  },
  LoginButtonText:{
    fontSize:LAYOUT.window.width*0.03,
    fontWeight:'bold',
    color:COLOR.whiteColor
  },
  playButton:{
    backgroundColor:COLOR.redColor,
    borderRadius:LAYOUT.window.width*0.02,
    padding:LAYOUT.window.width*0.013,
    width:LAYOUT.window.width*0.7,
    margin:LAYOUT.window.width*0.01,
    alignItems:'center',
    justifyContent:'center',
  },
  playBottonText:{
    color:COLOR.whiteColor,
    fontSize:LAYOUT.window.width*0.03,
    fontWeight:'bold',
  },
  open:{
    backgroundColor:COLOR.backgroundColor, 
    width:LAYOUT.window.width, 
    height:LAYOUT.window.height, 
    alignItems:'center'
  },
  closeIcon:{
    fontWeight:"bold"
  }
})
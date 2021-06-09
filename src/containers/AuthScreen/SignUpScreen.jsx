import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Container, Header, Form, Item, Input, Label, Button, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import PhoneInput from 'react-native-phone-input';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import { loginWithJWT,registeraction, } from "../../redux/actions/auth/loginActions"
import {validateUsername} from "../../redux/actions/auth/index"
import { LAYOUT, COLOR, Root } from "../../constants";
import {playerid,defaultSupermaster} from "../../constants/Root"

class SignInScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            phonenumber : null,
            username : null,
            password : null,
            email : null,
            confirmpasswrod : null,
            firstname : null,
            lastname : null,
            permission : playerid,
            status : "allow",
            isdelete : false,
            created : defaultSupermaster
        }
    }
    componentDidMount(){
        this.setState({phonenumber : '+' + this.phone.getCountryCode()});
    }
    signin(){
        Actions.SignInScreen();
    }
    signup(){
        if(!this.state.username || !this.state.email || !this.state.lastname || !this.state.firstname || !this.state.password || !this.state.confirmpasswrod){
            alert('Input Correctly!');
            return false;
        }
        else if(this.state.password != this.state.confirmpasswrod ){
            alert('No Match Passrword!');
            return false;
        }
        // else if(!this.phone.isValidNumber(this.state.phonenumber)){
        //     alert('Invalid PhoneNumber!');
        //     return false;
        // }
        else{
            var usernamecheck= validateUsername(this.state.username)
            if(usernamecheck){
                this.props.registeraction(this.state)
            }
        }
    }
    goBack(){
        Actions.push("/");
    }
    render(){
        const {logoimg} = this.props.firstpage
        return(
            <Container>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>this.goBack()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Sign Up</Text>
                    </View>
                </Header>
                <Content style={{backgroundColor:COLOR.baseBackgroundColor}}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={{uri : logoimg?Root.imageurl + logoimg:null}} style={styles.image}></Image>
                        </View>
                        <Form style={styles.form}>  
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Username</Label>
                                <Input  autoCapitalize="none" style={styles.input} onChange={(e)=>this.setState({username : e.nativeEvent.text})} />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Email</Label>
                                <Input  autoCapitalize="none" style={styles.input} onChange={(e)=>this.setState({email : e.nativeEvent.text})} />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Password</Label>
                                <Input  autoCapitalize="none" style={styles.input} secureTextEntry={true} onChange={(e)=>this.setState({password : e.nativeEvent.text})} />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Confirm Password</Label>
                                <Input  autoCapitalize="none" style={styles.input} secureTextEntry={true} onChange={(e)=>this.setState({confirmpasswrod : e.nativeEvent.text})} />
                            </Item>
                            <Form style={styles.totalname}>
                                <Item floatingLabel style={styles.item}>
                                    <Label style={styles.label}>First Name</Label>
                                    <Input  autoCapitalize="none" style={styles.input} onChange={(e)=>this.setState({firstname : e.nativeEvent.text})} />
                                </Item>
                                <Item floatingLabel style={styles.item}>
                                    <Label style={styles.label}>last Name</Label>
                                    <Input  autoCapitalize="none" style={styles.input} onChange={(e)=>this.setState({lastname : e.nativeEvent.text})} />
                                </Item>
                            </Form>
                            <View style={styles.phone}>
                                <PhoneInput initialCountry={'in'} value={this.state.phonenumber} style={styles.phoneInput}  ref={ref => {this.phone = ref; }}
                                flagStyle={{width:50, height:35}}
                                textStyle={{fontSize:16, color:COLOR.whiteColor}}
                                textProps={{placeholder:"Input Phone Number...", keyboardType:'phone-pad'}}
                                // onPressFlag={()=>{console.log(this.state.phonenumber)}}
                                onChangePhoneNumber={(e)=>this.setState({phonenumber:e})}
                                ></PhoneInput>
                            </View>
                        </Form>
                        <View style={styles.signin_signup}>
                            <Button style={styles.loginButton} onPress={()=>this.signup()}>
                                <Text style={styles.signinText}> Sign Up </Text>
                            </Button>
                        </View>
                        <View style={styles.signin_signup}>
                            <Text style={styles.signupText}> Already have an account? </Text>
                            <TouchableOpacity onPress={()=>this.signin()}>
                                <Text style={styles.signupText1}> Sign In </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}
const load_data = (state) =>{
    return {
        firstpage:state.auth.register
    }
}
export default connect(load_data,{loginWithJWT,registeraction})(SignInScreen);

const styles = StyleSheet.create({
    container : {
        padding:LAYOUT.window.width*0.1,
        alignItems:'center',
        justifyContent:'center'
    },
    header:{
        backgroundColor:COLOR.headerColor,
        justifyContent:'flex-start'
    },
    back:{
        padding:LAYOUT.window.width*0.02,
        flexDirection:'row',
        alignItems:'center'
    }, 
    headerBody:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    headerBodyText:{
        fontSize:LAYOUT.window.width*0.04,
        color:COLOR.whiteColor,
        paddingLeft:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
    logo:{
        alignItems:'center',
    },  
    image:{
        width:LAYOUT.window.width*0.4,
        height:LAYOUT.window.height*0.1,
        resizeMode:'contain'
    },
    form:{
        alignItems:'center',
        justifyContent:'center',
    },
    item:{
        padding:LAYOUT.window.width*0.015,
        alignItems:'center',
        justifyContent:'center',
    },
    phone:{
        padding:LAYOUT.window.width*0.03,
        alignItems:'center',
        flexDirection:'row'
    },
    phoneInput:{
        fontSize:LAYOUT.window.width*0.04,
        color:COLOR.whiteColor,
    },
    input:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.03
    },
    label:{
        color:COLOR.whiteColor
    },
    totalname:{
        flexDirection:'row',
        width:'50%',
        alignItems:'center'
    },  
    signin_signup:{
        padding:LAYOUT.window.width*0.02,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    loginButton:{
        backgroundColor:COLOR.greenColor,
        width:LAYOUT.window.width*0.7,
        alignItems:'center',
        justifyContent:'center',
        height:LAYOUT.window.height*0.05
    },
    signinText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
    signupText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.025
    },
    signupText1:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.03,
        textDecorationLine:'underline',
        fontWeight:'bold'
    }
  })
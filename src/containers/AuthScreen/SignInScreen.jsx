import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Container, Header, Input, Form, Item, Label, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import { loginWithJWT } from "../../redux/actions/auth/loginActions"
import { LAYOUT, COLOR, Root } from "../../constants";

class SignInScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            email:'',
            password:''
        }
    }

    signin(){
        if(!this.state.email || !this.state.password){
            alert("Input Correctly!");
            return false;
        }else{
            this.props.loginWithJWT(this.state);
        }
    }
    signup(){
        Actions.SignUpScreen();
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
                        <Text style={styles.headerBodyText}>Sign In</Text>
                    </View>
                </Header>
                <Content style={{backgroundColor:COLOR.baseBackgroundColor}}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={{uri : logoimg?Root.imageurl + logoimg:null}} style={styles.image}></Image>
                        </View>
                        <Form style={styles.form}>  
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Email / Username</Label>
                                <Input style={styles.input} value={this.state.email} autoCapitalize="none" onChange={(e)=>this.setState({email:e.nativeEvent.text})} />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Password</Label>
                                <Input style={styles.input} value={this.state.password} autoCapitalize="none" secureTextEntry={true} onChange={(e)=>this.setState({password:e.nativeEvent.text})} />
                            </Item>
                        </Form>
                        <View style={styles.signin_signup}>
                            <TouchableOpacity style={styles.signinButton} onPress={()=>this.signin()}>
                                <Text style={styles.signinText}> Sign In </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.signin_signup}>
                            <TouchableOpacity style={styles.signupButton} onPress={()=>this.signup()}>
                                <Text style={styles.signupText}> Sign Up </Text>
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

export default connect(load_data,{loginWithJWT})(SignInScreen);

const styles = StyleSheet.create({
    container : {
        paddingTop:LAYOUT.window.height*0.2,
        padding:LAYOUT.window.width*0.1,
        alignItems:'center',
        justifyContent:'flex-start',
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
        marginBottom:2
    },
    item:{
        padding:LAYOUT.window.width*0.015,
        alignItems:'center',
        justifyContent:'center',
    },
    input:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.04,
        height:LAYOUT.window.height*0.08,
        width:'100%',
    },
    label:{
        color:COLOR.whiteColor
    },
    signin_signup:{
        marginTop:LAYOUT.window.width*0.04,
        marginLeft:LAYOUT.window.width*0.04,
        alignItems:'center',
        justifyContent:'center',
    },
    signinButton:{
        width:LAYOUT.window.width*0.73,
        height:LAYOUT.window.height*0.05,
        backgroundColor:COLOR.greenColor,
        justifyContent:'center',
        alignItems:'center',
    },
    signupButton:{
        width:LAYOUT.window.width*0.73,
        height:LAYOUT.window.height*0.05,
        backgroundColor:COLOR.redColor,
        justifyContent:'center',
        alignItems:'center',
    },
    signinText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
    signupText:{
        color:COLOR.whiteColor,
        fontSize:LAYOUT.window.width*0.04,
        fontWeight:'bold'
    },
})
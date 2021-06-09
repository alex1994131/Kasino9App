import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Container, Header, Input, Form, Item, Label, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AntDesign } from '@expo/vector-icons';
import { connect } from "react-redux";
import { resend_email } from "../../redux/actions/auth/loginActions"
import { LAYOUT, COLOR, Root } from "../../constants";

class EmailverifySendScreen extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            email : "example@gmail.com"
        }
    }

    handleResend = (e) =>{
        this.props.resend_email(this.state.email)
    }

    componentDidMount(){
        if(this.props.data){
            this.setState({email : this.props.data})
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
                        <Text style={styles.headerBodyText}>RESEND EMAIl</Text>
                    </View>
                </Header>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={{uri : logoimg?Root.imageurl + logoimg:null}} style={styles.image}></Image>
                        </View>
                        <Form style={[styles.form,{marginTop:LAYOUT.window.height*0.03}]}>  
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Email</Label>
                                <Input  autoCapitali  ze="none" disabled={true} style={styles.input} value={this.state.email} onChange={(e)=>this.setState({email:e.nativeEvent.text})} />
                            </Item>
                        </Form>
                        <View style={[styles.signin_signup,{marginTop:LAYOUT.window.height*0.05}]}>
                            <TouchableOpacity style={styles.signinButton} onPress={()=>this.handleResend()}>
                                <Text style={styles.signinText}> Send </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{textAlign:'center', fontSize:LAYOUT.window.width*0.03, marginTop:LAYOUT.window.height*0.03, color:COLOR.whiteColor}}>
                            Enter your registered e-mail address below and the instructions for retrieving the password will be sent to your e-mail.
                        </Text>
                    </View>
                </ScrollView>
            </Container>
        )
    }
}

const load_data = (state) =>{
    return {
        firstpage:state.auth.register
    }
}

export default connect(load_data,{resend_email})(EmailverifySendScreen);

const styles = StyleSheet.create({
    container : {
        backgroundColor:COLOR.baseBackgroundColor,
        height:LAYOUT.window.height,
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
        height:LAYOUT.window.height*0.08
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
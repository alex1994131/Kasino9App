import React from 'react';
import { connect } from "react-redux";
import normalize from 'react-native-normalize';
import { StyleSheet, Text, View, Image, TouchableOpacity  } from 'react-native';
import { Container, Header, Input, Form, Item, Label, Button, Content } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { LAYOUT, COLOR, Root, profileStyles, baseStyles } from "../../../constants";
import { changepassword } from "../../../redux/actions/profile"

class ChangePassScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            currentpassword : '',
            password : '',
            confirmpassword : '',
        }
    }

    changepassword(){
        const{
            currentpassword,
            confirmpassword,
            password,
        }=this.state;
        if(password !== confirmpassword){
            alert("Please input the correct password and confirm the password.");
        }else{
            this.props.changepassword({password,currentpassword});
            this.setState({})
        }
    }
    
    render(){
        const{
            currentpassword,
            confirmpassword,
            password,
        }=this.state;
        const{
            firstpage
        }=this.props;
        return(
            <Container style={styles.baseBack}>
                <Header style={styles.header}>
                    <View style={styles.back}>
                        <TouchableOpacity onPress={()=>Actions.pop()}>
                            <AntDesign name="back" size={LAYOUT.window.width*0.06} color={COLOR.greenColor} />
                        </TouchableOpacity>
                        <Text style={styles.headerBodyText}>Change Password</Text>
                    </View>
                </Header>
                <Content>
                    <View style={{paddingHorizontal:20}}>
                        <View style={styles.logo}>
                            <Image source={{uri : firstpage.logoimg? Root.imageurl + firstpage.logoimg:null}} style={styles.image}></Image>
                        </View>
                        <Form style={styles.form}>  
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Current Password</Label>
                                <Input 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    value={currentpassword}
                                    onChangeText={(e)=>this.setState({currentpassword:e})} 
                                />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>New Password</Label>
                                <Input 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={(e)=>this.setState({password:e})} 
                                />
                            </Item>
                            <Item floatingLabel style={styles.item}>
                                <Label style={styles.label}>Confirm Password</Label>
                                <Input 
                                    style={styles.input} 
                                    secureTextEntry={true}
                                    value={confirmpassword}
                                    onChangeText={(e)=>this.setState({confirmpassword:e})} 
                                />
                            </Item>
                        </Form>
                        <View style={styles.ButtonWrapper}>
                            <Button style={styles.Button} onPress={()=>this.changepassword()}>
                                <Text style={styles.ButtonText}> SAVE PASSWORD </Text>
                            </Button>
                        </View>
                    </View>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    firstpage : state.auth.register,
})

const mapDispatchToProps = {
    changepassword
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassScreen)



const styles = StyleSheet.create({
    ...profileStyles,
    ...baseStyles,
    logo:{
        alignItems:'center',
        marginTop:normalize(30)
    },  
    image:{
        width:normalize(200),
        height:normalize(70),
        resizeMode:'contain',
    },
    ButtonWrapper:{
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:normalize(20)
    },
})